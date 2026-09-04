import { test, expect, type Page } from "@playwright/test";

/**
 * The filter panel is a client component inside a Suspense boundary, so it
 * appears after hydration rather than in the server rendered markup. On narrow
 * viewports it also sits behind a disclosure. This waits for whichever applies.
 */
async function openFilters(page: Page) {
  const drawerTrigger = page.getByRole("button", { name: /Filter products/i });
  const firstCheckbox = page.getByRole("checkbox").first();

  await expect(drawerTrigger.or(firstCheckbox).first()).toBeVisible();

  if (await drawerTrigger.isVisible()) {
    await drawerTrigger.click();
    await expect(page.locator("#product-filter-drawer")).toBeVisible();
  }
}

/**
 * Content discovery, filtering, and the content integrity rules that matter most
 * commercially: no fabricated case studies, no unverified certifications, and no
 * published capacity figures.
 */

test.describe("product discovery", () => {
  test("lists every product family on the hub", async ({ page }) => {
    await page.goto("/products");
    await expect(page.getByText(/Showing all 13 product families/i)).toBeVisible();
  });

  test("filters by industry and reflects the choice in the URL", async ({ page }) => {
    await page.goto("/products");

    await openFilters(page);
    await page.getByRole("checkbox", { name: "Healthcare" }).check();

    await expect(page).toHaveURL(/industry=healthcare/);
    await expect(page.getByText(/Showing \d+ of 13 product families/i)).toBeVisible();
  });

  test("resets filters", async ({ page }) => {
    await page.goto("/products?industry=healthcare");

    await openFilters(page);
    await page.getByRole("button", { name: "Reset filters" }).click();
    await expect(page).toHaveURL(/\/products$/);
    await expect(page.getByText(/Showing all 13 product families/i)).toBeVisible();
  });

  test("shows an empty state when no family matches", async ({ page }) => {
    /*
     * Filter groups combine with AND. No streetwear product family offers
     * sublimation, so this combination has nothing to show.
     */
    await page.goto("/products?industry=streetwear-brands&decoration=sublimation");

    await expect(
      page.getByText(/No product families match those filters/i),
    ).toBeVisible();
  });

  test("filters are keyboard operable", async ({ page, isMobile }) => {
    test.skip(Boolean(isMobile), "Checked on desktop where filters are always visible");

    await page.goto("/products");
    const checkbox = page.getByRole("checkbox", { name: "Hospitality" });
    await checkbox.focus();
    await page.keyboard.press("Space");
    await expect(checkbox).toBeChecked();
    await expect(page).toHaveURL(/industry=hospitality/);
  });
});

test.describe("product detail", () => {
  test("renders the full template", async ({ page }) => {
    await page.goto("/products/streetwear");

    await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 1, name: "Streetwear" })).toBeVisible();

    for (const heading of [
      /What sits inside this family/i,
      /Typical weights and construction/i,
      /How this category is branded/i,
      /What this category is usually made from/i,
      /Minimum quantity and sampling/i,
    ]) {
      await expect(page.getByRole("heading", { name: heading })).toBeVisible();
    }
  });

  test("states how the category is produced", async ({ page }) => {
    await page.goto("/products/streetwear");
    await expect(page.getByText(/Manufactured in house/i).first()).toBeVisible();
  });

  test("qualifies the minimum quantity rather than publishing a fixed number", async ({ page }) => {
    await page.goto("/products/everyday-apparel");
    await expect(page.getByText(/MOQ depends on material availability/i)).toBeVisible();
  });

  test("carries no retail commerce elements", async ({ page }) => {
    await page.goto("/products/everyday-apparel");
    await expect(page.getByRole("button", { name: /add to cart/i })).toHaveCount(0);
    await expect(page.getByText(/in stock/i)).toHaveCount(0);
  });

  test("links through to a capability page", async ({ page }) => {
    await page.goto("/products/streetwear");
    await page.getByRole("link", { name: "Screen printing" }).first().click();
    await expect(page).toHaveURL(/\/capabilities\/screen-printing$/);
    await expect(page.getByRole("heading", { name: /What this cannot do/i })).toBeVisible();
  });
});

test.describe("capabilities", () => {
  test("lists all thirty capabilities", async ({ page }) => {
    await page.goto("/capabilities");
    await expect(page.getByText(/of these 30 capabilities are marked as pending/i)).toBeVisible();
  });

  test("states limitations on a capability page", async ({ page }) => {
    await page.goto("/capabilities/sublimation");
    await expect(page.getByRole("heading", { name: /What this cannot do/i })).toBeVisible();
    await expect(page.getByText(/White cannot be printed/i)).toBeVisible();
  });

  test("marks an unverified capability as confirmed on review", async ({ page }) => {
    await page.goto("/capabilities/dyeing");
    await expect(page.getByText(/Scope confirmed on technical review/i)).toBeVisible();
  });
});

test.describe("materials", () => {
  test("filters by group", async ({ page }) => {
    await page.goto("/materials");
    await page.getByRole("link", { name: "Woven fabrics" }).first().click();
    await expect(page).toHaveURL(/group=woven-fabrics/);
    await expect(page.getByText(/Showing \d+ of \d+ materials/i)).toBeVisible();
  });

  test("qualifies material values rather than stating them as universal facts", async ({ page }) => {
    await page.goto("/materials/cotton");
    await expect(
      page.getByText(/Values on this page depend on the specific fabric quality/i),
    ).toBeVisible();
  });
});

test.describe("content integrity", () => {
  test("publishes no fabricated case studies", async ({ page }) => {
    await page.goto("/case-studies");
    await expect(
      page.getByRole("heading", { level: 1, name: /What a manufacturing project looks like/i }),
    ).toBeVisible();
    await expect(page.getByText(/without written permission from the customer/i)).toBeVisible();
  });

  test("publishes no unverified certifications", async ({ page }) => {
    await page.goto("/certifications");
    await expect(page.getByText(/No certificates are published yet/i)).toBeVisible();
  });

  test("withholds capacity and performance figures", async ({ page }) => {
    await page.goto("/responsibility");
    await expect(
      page.getByRole("heading", { name: /Figures a competitor would probably publish/i }),
    ).toBeVisible();
    await expect(page.getByText(/Number of employees/i)).toBeVisible();
  });

  test("publishes no invented sustainability metrics", async ({ page }) => {
    await page.goto("/sustainability");
    await expect(
      page.getByText(/Why there are no percentages on this page/i),
    ).toBeVisible();
  });

  test("marks legal pages as drafts pending review", async ({ page }) => {
    for (const path of ["/privacy", "/terms", "/cookie-policy"]) {
      await page.goto(path);
      await expect(page.getByText(/Draft pending legal review/i)).toBeVisible();
    }
  });
});

test.describe("WhatsApp contact", () => {
  test("shows a floating action carrying the current page", async ({ page }) => {
    await page.goto("/products/streetwear");

    const action = page.getByRole("link", { name: /WhatsApp us/i });
    await expect(action).toBeVisible({ timeout: 10_000 });

    const href = await action.getAttribute("href");
    expect(href).toContain("wa.me/923362605238");
    expect(decodeURIComponent(href ?? "")).toContain("Products: Streetwear");
    expect(decodeURIComponent(href ?? "")).toContain("/products/streetwear");
  });

  test("opens in a new tab with safe rel attributes", async ({ page }) => {
    await page.goto("/");
    const action = page.getByRole("link", { name: /WhatsApp us/i });
    await expect(action).toBeVisible({ timeout: 10_000 });
    await expect(action).toHaveAttribute("target", "_blank");
    await expect(action).toHaveAttribute("rel", /noopener/);
  });

  test("names the product family on a product page CTA", async ({ page }) => {
    await page.goto("/products/home-textiles");
    const cta = page.getByRole("link", { name: /Ask on WhatsApp/i }).first();
    const href = await cta.getAttribute("href");
    expect(decodeURIComponent(href ?? "")).toContain("About: Home textiles");
  });
});

test.describe("main conversion journey", () => {
  test("homepage to product to quote request", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: /^Explore Products$/i }).click();
    await expect(page).toHaveURL(/\/products$/);

    await page.getByRole("heading", { name: "Workwear and uniforms" }).click();
    await expect(page).toHaveURL(/\/products\/workwear-and-uniforms$/);

    await page.getByRole("link", { name: "Request a Quote" }).first().click();
    await expect(page).toHaveURL(/\/request-a-quote/);
    await expect(page.getByRole("heading", { name: /Step 1 of 7/i })).toBeVisible();
  });
});
