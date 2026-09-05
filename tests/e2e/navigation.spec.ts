import { test, expect } from "@playwright/test";

/**
 * Navigation, layout and accessibility basics.
 *
 * These run against a production build, so what is asserted is what ships.
 */

test.describe("homepage", () => {
  test("loads with the expected hero and a single h1", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Textileways/);
    await expect(
      page.getByRole("heading", { level: 1, name: /Made for your first launch/i }),
    ).toBeVisible();

    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);
  });

  test("shows both primary hero actions", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("link", { name: /Start a Manufacturing Project/i }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /^Explore Products$/i })).toBeVisible();
  });

  test("renders every homepage section", async ({ page }) => {
    await page.goto("/");
    for (const heading of [
      /Start at 50\. Scale beyond 100,000\./i,
      /Thirteen product families/i,
      /Startup flexibility/i,
      /Eight stages from inquiry to delivery/i,
      /Everything a product needs, in one place/i,
      /Where your product would be made/i,
      /Eight checkpoints/i,
      /Built around USA and European buyers/i,
      /Bring us the idea/i,
    ]) {
      await expect(page.getByRole("heading", { name: heading })).toBeVisible();
    }
  });

  test("has no console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });
});

test.describe("desktop navigation", () => {
  test.skip(({ isMobile }) => Boolean(isMobile), "Desktop navigation only");
  test.use({ viewport: { width: 1440, height: 900 } });

  test("opens a mega menu and navigates to a product family", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Products" }).click();
    const panel = page.getByRole("link", { name: "Streetwear", exact: true }).first();
    await expect(panel).toBeVisible();

    await panel.click();
    await expect(page).toHaveURL(/\/products\/streetwear$/);
    await expect(page.getByRole("heading", { level: 1, name: "Streetwear" })).toBeVisible();
  });

  test("closes the mega menu with the Escape key", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Capabilities" });

    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("closes the mega menu when clicking outside it", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Products" });

    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    /* Click well below the sticky header and the open mega menu panel. */
    await page.locator("footer").getByRole("heading", { name: "Company" }).click();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("exposes the quote action in the header", async ({ page }) => {
    await page.goto("/");
    await page
      .locator("header")
      .getByRole("link", { name: "Request a Quote" })
      .click();
    await expect(page).toHaveURL(/\/request-a-quote$/);
  });
});

test.describe("mobile navigation", () => {
  test.skip(({ isMobile }) => !isMobile, "Mobile navigation only");

  test("opens the panel, expands a section and navigates", async ({ page }) => {
    await page.goto("/");

    const trigger = page.getByRole("button", { name: /Open menu/i });
    await trigger.click();
    await expect(page.locator("#mobile-navigation")).toBeVisible();

    await page.getByRole("button", { name: "Products" }).click();
    await page.getByRole("link", { name: "Everyday apparel", exact: true }).first().click();

    await expect(page).toHaveURL(/\/products\/everyday-apparel$/);
    await expect(page.locator("#mobile-navigation")).toHaveCount(0);
  });

  test("closes the panel with the Escape key", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Open menu/i }).click();
    await expect(page.locator("#mobile-navigation")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.locator("#mobile-navigation")).toHaveCount(0);
  });

  test("has no horizontal overflow", async ({ page }) => {
    await page.goto("/");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });
});

test.describe("responsive layout", () => {
  const widths = [320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920];

  for (const width of widths) {
    test(`has no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, `overflow at ${width}px`).toBeLessThanOrEqual(1);
    });
  }
});

test.describe("keyboard access", () => {
  test("reaches the skip link first and it moves focus to main", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");

    const skipLink = page.getByRole("link", { name: /Skip to main content/i });
    await expect(skipLink).toBeFocused();

    await page.keyboard.press("Enter");
    await expect(page.locator("#main-content")).toBeVisible();
  });

  test("shows a visible focus outline on interactive elements", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /^Explore Products$/i }).focus();

    const outline = await page
      .getByRole("link", { name: /^Explore Products$/i })
      .evaluate((element) => window.getComputedStyle(element).outlineStyle);

    expect(outline).not.toBe("none");
  });
});

test.describe("404", () => {
  test("renders the not found page with a route that does not exist", async ({ page }) => {
    const response = await page.goto("/this-route-does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { level: 1, name: /This page does not exist/i }),
    ).toBeVisible();
  });

  test("returns 404 for an unknown product slug", async ({ page }) => {
    const response = await page.goto("/products/not-a-real-product");
    expect(response?.status()).toBe(404);
  });
});

test.describe("SEO essentials", () => {
  test("serves robots.txt and the sitemap", async ({ request }) => {
    const robots = await request.get("/robots.txt");
    expect(robots.ok()).toBeTruthy();

    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.ok()).toBeTruthy();
    const body = await sitemap.text();
    expect(body).toContain("/products/streetwear");
    expect(body).toContain("/capabilities/screen-printing");
  });

  test("sets a canonical link and Open Graph tags on a product page", async ({ page }) => {
    await page.goto("/products/streetwear");

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      /\/products\/streetwear$/,
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveCount(1);
  });

  test("emits valid structured data", async ({ page }) => {
    await page.goto("/products/streetwear");

    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(blocks.length).toBeGreaterThan(0);

    const parsed = blocks.flatMap((block) => {
      const value = JSON.parse(block);
      return Array.isArray(value) ? value : [value];
    });

    const types = parsed.map((entry) => entry["@type"]);
    expect(types).toContain("Organization");
    expect(types).toContain("WebSite");
    expect(types).toContain("BreadcrumbList");
    expect(types).toContain("Product");

    /* Product schema must not carry price, availability or review data. */
    const product = parsed.find((entry) => entry["@type"] === "Product");
    expect(product.offers).toBeUndefined();
    expect(product.aggregateRating).toBeUndefined();
    expect(product.review).toBeUndefined();
  });

  test("marks legal pages noindex", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );
  });
});
