import { test, expect, type Page } from "@playwright/test";

/**
 * Conversion flows.
 *
 * Submissions are intercepted with `page.route`, so the suite exercises the real
 * client behaviour without sending anything to the live endpoints or to email.
 */

/*
 * Fields are addressed by id rather than by label text. Several labels share a
 * prefix (Company and Company stage, Country and Destination country), and an
 * id is both unambiguous and stable.
 */
async function fillBuyerStep(page: Page) {
  await page.locator("#field-fullName").fill("Jordan Ellis");
  await page.locator("#field-email").fill("jordan@examplebrand.com");
  await page.locator("#field-phone").fill("+1 212 555 0147");
  await page.locator("#field-company").fill("Example Brand");
  await page.locator("#field-country").fill("United States");
  await page.locator("#field-buyerType").selectOption("brand-owner");
  await page.locator("#field-companyStage").selectOption("launched-under-1-year");
}

async function fillProductStep(page: Page) {
  await page.locator("#field-productFamily").selectOption("streetwear");
  await page.locator("#field-productType").fill("Heavyweight hoodie");
  await page.locator("#field-styleCount").fill("2");
  await page.locator("#field-estimatedQuantity").fill("300");
  await page.locator("#field-colorwayCount").fill("2");
  await page.locator("#field-sizeRange").fill("S to XXL");
  await page.locator("#field-targetMarket").fill("United States");
  await page
    .locator("#field-productDescription")
    .fill(
      "A 400 gsm boxy hoodie with a double lined hood, heavy ribbing and a screen printed chest graphic.",
    );
}

async function fillCommercialStep(page: Page) {
  await page.locator("#field-requiredDeliveryDate").fill("2026-12-01");
  await page.locator("#field-shippingTerm").selectOption("fob");
  await page.locator("#field-destinationCity").fill("New York");
  await page.locator("#field-destinationCountry").fill("United States");
  await page.getByRole("radio", { name: /I need a sample approved first/i }).check();
  await page.getByRole("radio", { name: /^New development$/ }).check();
}

/** Ticks both required consent boxes on the review step. */
async function giveConsent(page: Page) {
  await page.locator("#field-privacyConsent").check();
  await page.locator("#field-designReviewConsent").check();
}

test.describe("RFQ form", () => {
  test("shows an error summary rather than advancing when a step is incomplete", async ({ page }) => {
    await page.goto("/request-a-quote");

    await expect(page.getByRole("heading", { name: /Step 1 of 7/i })).toBeVisible();
    await page.getByRole("button", { name: "Continue" }).click();

    const summary = page.locator("[data-error-summary]");
    await expect(summary).toBeVisible();
    await expect(summary).toContainText(/problem/i);
    await expect(page.getByRole("heading", { name: /Step 1 of 7/i })).toBeVisible();
  });

  test("validates the email field specifically", async ({ page }) => {
    await page.goto("/request-a-quote");

    await fillBuyerStep(page);
    await page.locator("#field-email").fill("not-an-email");
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(page.locator("[data-error-summary]")).toContainText(/email/i);
  });

  test("advances through the steps and allows going back", async ({ page }) => {
    await page.goto("/request-a-quote");

    await fillBuyerStep(page);
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page.getByRole("heading", { name: /Step 2 of 7/i })).toBeVisible();

    await fillProductStep(page);
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page.getByRole("heading", { name: /Step 3 of 7/i })).toBeVisible();

    await page.getByRole("button", { name: "Back" }).click();
    await expect(page.getByRole("heading", { name: /Step 2 of 7/i })).toBeVisible();
    /* Entries survive going back. */
    await expect(page.locator("#field-productType")).toHaveValue("Heavyweight hoodie");
  });

  test("preselects a product family from the query string", async ({ page }) => {
    await page.goto("/request-a-quote?product=denim-and-woven-products");

    await fillBuyerStep(page);
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(page.locator("#field-productFamily")).toHaveValue("denim-and-woven-products");
  });

  test("submits successfully and shows a reference", async ({ page }) => {
    await page.route("**/api/rfq", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          ok: true,
          reference: "RFQ-2609-7K4QD",
          duplicate: false,
          attachmentsStored: 0,
        }),
      });
    });

    await page.goto("/request-a-quote");

    await fillBuyerStep(page);
    await page.getByRole("button", { name: "Continue" }).click();
    await fillProductStep(page);
    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByRole("button", { name: "Continue" }).click(); // materials, all optional
    await page.getByRole("button", { name: "Continue" }).click(); // customisation, optional
    await fillCommercialStep(page);
    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByRole("button", { name: "Continue" }).click(); // attachments, optional

    await expect(page.getByRole("heading", { name: /Step 7 of 7/i })).toBeVisible();

    await giveConsent(page);

    await page.getByRole("button", { name: "Submit quote request" }).click();

    await expect(
      page.getByRole("heading", { name: /Your quote request has been received/i }),
    ).toBeVisible();
    await expect(page.getByText("RFQ-2609-7K4QD")).toBeVisible();
  });

  test("keeps every entry when the server rejects the submission", async ({ page }) => {
    await page.route("**/api/rfq", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ ok: false, error: "Something went wrong on our side." }),
      });
    });

    await page.goto("/request-a-quote");

    await fillBuyerStep(page);
    await page.getByRole("button", { name: "Continue" }).click();
    await fillProductStep(page);
    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByRole("button", { name: "Continue" }).click();
    await fillCommercialStep(page);
    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByRole("button", { name: "Continue" }).click();

    await giveConsent(page);
    await page.getByRole("button", { name: "Submit quote request" }).click();

    await expect(page.getByRole("alert").filter({ hasText: /Submission failed/i })).toBeVisible();

    /* The buyer can go back and everything they typed is still there. */
    await page.getByRole("button", { name: "Buyer", exact: true }).click();
    await expect(page.locator("#field-fullName")).toHaveValue("Jordan Ellis");
    await expect(page.locator("#field-company")).toHaveValue("Example Brand");
  });

  test("requires both consent boxes before submitting", async ({ page }) => {
    await page.goto("/request-a-quote");

    await fillBuyerStep(page);
    await page.getByRole("button", { name: "Continue" }).click();
    await fillProductStep(page);
    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByRole("button", { name: "Continue" }).click();
    await fillCommercialStep(page);
    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByRole("button", { name: "Continue" }).click();

    await page.getByRole("button", { name: "Submit quote request" }).click();
    await expect(page.locator("[data-error-summary]")).toBeVisible();
  });

  test("restores a saved draft after a reload", async ({ page }) => {
    await page.goto("/request-a-quote");
    await page.locator("#field-fullName").fill("Jordan Ellis");
    await page.locator("#field-company").fill("Example Brand");

    await page.reload();

    await expect(page.locator("#field-fullName")).toHaveValue("Jordan Ellis");
    await expect(page.getByText(/previous entries have been restored/i)).toBeVisible();
  });
});

test.describe("contact form", () => {
  test("validates before sending", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.locator("[data-error-summary]")).toBeVisible();
  });

  test("sends successfully and shows a reference", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true, reference: "MSG-2609-BX3TW", duplicate: false }),
      });
    });

    await page.goto("/contact");

    await page.locator("#field-name").fill("Priya Raman");
    await page.locator("#field-email").fill("priya@example.org");
    await page.locator("#field-company").fill("Example Organisation");
    await page.locator("#field-country").fill("United Kingdom");
    await page.locator("#field-subject").selectOption("new-project");
    await page
      .locator("#field-message")
      .fill("We are looking to produce 500 corporate polo shirts for a summer rollout.");
    await page.locator("#field-privacyConsent").check();

    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByRole("heading", { name: /Your message has been sent/i })).toBeVisible();
    await expect(page.getByText("MSG-2609-BX3TW")).toBeVisible();
  });

  test("keeps entries when the server fails", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ ok: false, error: "Could not send." }),
      });
    });

    await page.goto("/contact");
    await page.locator("#field-name").fill("Priya Raman");
    await page.locator("#field-email").fill("priya@example.org");
    await page.locator("#field-company").fill("Example Organisation");
    await page.locator("#field-country").fill("United Kingdom");
    await page
      .locator("#field-message")
      .fill("We are looking to produce 500 corporate polo shirts for a summer rollout.");
    await page.locator("#field-privacyConsent").check();

    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByRole("alert").filter({ hasText: /Message not sent/i })).toBeVisible();
    await expect(page.locator("#field-name")).toHaveValue("Priya Raman");
  });
});

test.describe("sample request form", () => {
  test("validates before submitting", async ({ page }) => {
    await page.goto("/request-a-sample");
    await page.getByRole("button", { name: "Submit sample request" }).click();
    await expect(page.locator("[data-error-summary]")).toBeVisible();
  });

  test("preselects a product family from the query string", async ({ page }) => {
    await page.goto("/request-a-sample?product=home-textiles");
    await expect(page.locator("#field-productFamily")).toHaveValue("home-textiles");
  });
});
