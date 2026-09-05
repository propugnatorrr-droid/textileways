import { test, expect } from "@playwright/test";

/**
 * Visual foundation checks for the 2026 redesign.
 *
 * These assert the design decisions that are easy to regress silently: the white
 * ground, the sans display family, the large media radii, and the absence of the
 * two homepage sections that were removed from the composition.
 */

test.describe("visual foundation", () => {
  test("body renders on a pure white ground", async ({ page }) => {
    await page.goto("/");

    const background = await page.evaluate(
      () => window.getComputedStyle(document.body).backgroundColor,
    );
    expect(background).toBe("rgb(255, 255, 255)");
  });

  test("the header is white", async ({ page }) => {
    await page.goto("/");

    const background = await page
      .locator("header")
      .evaluate((element) => window.getComputedStyle(element).backgroundColor);
    expect(background).toBe("rgb(255, 255, 255)");
  });

  test("the hero heading uses the sans family, not a serif", async ({ page }) => {
    await page.goto("/");

    const family = await page
      .getByRole("heading", { level: 1 })
      .evaluate((element) => window.getComputedStyle(element).fontFamily);

    expect(family.toLowerCase()).toContain("manrope");
    expect(family.toLowerCase()).not.toContain("instrument");
    expect(family.toLowerCase()).not.toContain("georgia");
  });

  test("the hero heading is heavy and tightly tracked", async ({ page }) => {
    await page.goto("/");

    const { weight, tracking, size } = await page
      .getByRole("heading", { level: 1 })
      .evaluate((element) => {
        const style = window.getComputedStyle(element);
        return {
          weight: Number(style.fontWeight),
          tracking: parseFloat(style.letterSpacing),
          size: parseFloat(style.fontSize),
        };
      });

    expect(weight).toBeGreaterThanOrEqual(600);
    /* Negative tracking is what gives the display type its modern density. */
    expect(tracking).toBeLessThan(0);
    expect(size).toBeGreaterThan(36);
  });

  test("the hero media has a large radius on desktop", async ({ page, isMobile }) => {
    test.skip(Boolean(isMobile), "Desktop radius is the assertion");

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    const radius = await page
      .locator('main [data-media-frame="true"]')
      .first()
      .evaluate((element) => parseFloat(window.getComputedStyle(element).borderTopLeftRadius));

    expect(radius).toBeGreaterThanOrEqual(28);
  });

  test("primary buttons are rounded but not pills", async ({ page }) => {
    await page.goto("/");

    const { radius, height } = await page
      .getByRole("link", { name: /Start a Manufacturing Project/i })
      .evaluate((element) => {
        const style = window.getComputedStyle(element);
        return {
          radius: parseFloat(style.borderTopLeftRadius),
          height: element.getBoundingClientRect().height,
        };
      });

    expect(radius).toBeGreaterThanOrEqual(10);
    expect(radius).toBeLessThanOrEqual(20);
    /* A pill would have a radius at or above half the height. */
    expect(radius).toBeLessThan(height / 2);
    expect(height).toBeGreaterThanOrEqual(44);
  });

  test("no section paints a beige ground", async ({ page }) => {
    await page.goto("/");

    const warmSurfaces = await page.evaluate(() => {
      const offenders: string[] = [];
      for (const element of Array.from(document.querySelectorAll("section, header, footer, div"))) {
        const background = window.getComputedStyle(element).backgroundColor;
        const match = background.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (!match) continue;
        const [r, g, b] = [Number(match[1]), Number(match[2]), Number(match[3])];
        /* Beige reads as a warm cast: red clearly above blue on a light surface. */
        if (r > 240 && b < r - 12 && g < r) offenders.push(background);
      }
      return offenders;
    });

    expect(warmSurfaces).toEqual([]);
  });
});

test.describe("homepage composition", () => {
  test("renders the sections in the intended order", async ({ page }) => {
    await page.goto("/");

    const headings = await page.locator("main h2").allTextContents();
    const joined = headings.join(" | ");

    expect(joined).toContain("Start at 50");
    expect(joined).toContain("Thirteen product families");
    expect(joined).toContain("Startup flexibility");
    expect(joined).toContain("Everything a product needs");
    expect(joined).toContain("Where your product would be made");
    expect(joined).toContain("Eight stages from inquiry to delivery");
    expect(joined).toContain("Eight checkpoints");
    expect(joined).toContain("Built around USA and European buyers");
    expect(joined).toContain("Bring us the idea");
  });

  test("no longer renders the two removed sections", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: /No case studies, because none are evidenced/i }),
    ).toHaveCount(0);
    await expect(
      page.getByRole("heading", { name: /Claims we can evidence, and nothing else/i }),
    ).toHaveCount(0);
  });

  test("keeps a single h1", async ({ page }) => {
    await page.goto("/");
    expect(await page.locator("h1").count()).toBe(1);
  });

  test("keeps the RFQ reachable from the header", async ({ page, isMobile }) => {
    await page.goto("/");

    if (isMobile) {
      await page.getByRole("button", { name: /Open menu/i }).click();
      await page.getByRole("link", { name: "Request a Quote" }).first().click();
    } else {
      await page.locator("header").getByRole("link", { name: "Request a Quote" }).click();
    }

    await expect(page).toHaveURL(/\/request-a-quote/);
  });
});

test.describe("footer", () => {
  test("is present and carries the legal navigation", async ({ page }) => {
    await page.goto("/");

    const footer = page.locator("footer");
    await expect(footer).toBeVisible();

    for (const label of ["Privacy", "Terms", "Cookie policy"]) {
      await expect(footer.getByRole("link", { name: label, exact: true })).toBeVisible();
    }

    await expect(footer.getByText(/One manufacturing partner from first sample/i)).toBeVisible();
  });

  test("uses a dark contained panel rather than a beige block", async ({ page }) => {
    await page.goto("/");

    const panelBackground = await page
      .locator("footer > div")
      .first()
      .evaluate((element) => window.getComputedStyle(element).backgroundColor);

    const match = panelBackground.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    expect(match).not.toBeNull();
    const [r, g, b] = [Number(match?.[1]), Number(match?.[2]), Number(match?.[3])];
    expect(r + g + b).toBeLessThan(150);
  });
});

test.describe("reduced motion", () => {
  test("reveals content immediately and disables transitions", async ({ browser, baseURL }) => {
    /*
     * An explicit context rather than test.use, because the reducedMotion option
     * is a context option here. Setting it through test.use is silently ignored,
     * which makes the assertion pass or fail for the wrong reason.
     */
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();

    try {
      await page.goto(baseURL ?? "/");
      await page.waitForLoadState("networkidle");

      const matches = await page.evaluate(
        () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      );
      expect(matches).toBe(true);

      const reveal = page.locator(".tw-reveal").first();
      await expect(reveal).toBeVisible();

      const { opacity, duration } = await reveal.evaluate((element) => {
        const style = window.getComputedStyle(element);
        return { opacity: Number(style.opacity), duration: style.transitionDuration };
      });

      expect(opacity).toBe(1);
      /* The reduced motion block collapses every transition to a hair over zero. */
      expect(parseFloat(duration)).toBeLessThan(0.01);
    } finally {
      await context.close();
    }
  });
});
