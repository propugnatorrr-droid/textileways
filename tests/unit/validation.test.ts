import { describe, expect, it } from "vitest";
import {
  sanitizeText,
  sanitizeMultiline,
  emailField,
  phoneField,
  optionalUrlField,
  completedTooQuickly,
  MIN_COMPLETION_MS,
} from "@/lib/validation/shared";
import { rfqFormSchema, rfqStepSchemas } from "@/lib/validation/rfq";
import { contactFormSchema, sampleRequestFormSchema } from "@/lib/validation/contact";

describe("text sanitisation", () => {
  it("collapses whitespace and trims", () => {
    expect(sanitizeText("  Textile   ways  ")).toBe("Textile ways");
  });

  it("removes control characters", () => {
    expect(sanitizeText("Hello\u0000World")).toBe("HelloWorld");
    expect(sanitizeText("Bell\u0007test")).toBe("Belltest");
  });

  it("preserves paragraph breaks in multiline text but collapses runs", () => {
    expect(sanitizeMultiline("Line one\n\n\n\nLine two")).toBe("Line one\n\nLine two");
  });

  it("normalises Windows line endings", () => {
    expect(sanitizeMultiline("a\r\nb")).toBe("a\nb");
  });
});

describe("email validation", () => {
  it("accepts and lowercases a valid address", () => {
    expect(emailField.parse("  Buyer@Example.COM ")).toBe("buyer@example.com");
  });

  it("rejects an address without a domain", () => {
    expect(emailField.safeParse("buyer@").success).toBe(false);
  });

  it("rejects an empty value", () => {
    expect(emailField.safeParse("").success).toBe(false);
  });
});

describe("phone validation", () => {
  it("accepts international formats", () => {
    expect(phoneField.safeParse("+92 336 260 5238").success).toBe(true);
    expect(phoneField.safeParse("(212) 555-0147").success).toBe(true);
  });

  it("rejects letters", () => {
    expect(phoneField.safeParse("call me maybe").success).toBe(false);
  });

  it("rejects a number that is too short to be real", () => {
    expect(phoneField.safeParse("12345").success).toBe(false);
  });
});

describe("website field", () => {
  it("adds a scheme when one is missing", () => {
    expect(optionalUrlField.parse("example.com")).toBe("https://example.com");
  });

  it("leaves an existing scheme alone", () => {
    expect(optionalUrlField.parse("http://example.com")).toBe("http://example.com");
  });

  it("allows an empty value, since the field is optional", () => {
    expect(optionalUrlField.parse("")).toBe("");
  });
});

describe("minimum completion time", () => {
  it("rejects a submission completed instantly", () => {
    const now = 1_000_000;
    expect(completedTooQuickly(now - 200, now)).toBe(true);
  });

  it("accepts a submission that took a plausible amount of time", () => {
    const now = 1_000_000;
    expect(completedTooQuickly(now - (MIN_COMPLETION_MS + 500), now)).toBe(false);
  });

  it("rejects a tampered timestamp from the future", () => {
    const now = 1_000_000;
    expect(completedTooQuickly(now + 60_000, now)).toBe(true);
  });
});

/* -------------------------------------------------------------------------- */

const validRfq = {
  fullName: "Jordan Ellis",
  email: "jordan@examplebrand.com",
  phone: "+1 212 555 0147",
  whatsapp: "",
  company: "Example Brand",
  website: "examplebrand.com",
  country: "United States",
  buyerType: "brand-owner" as const,
  companyStage: "launched-under-1-year" as const,
  productFamily: "streetwear",
  productType: "Heavyweight hoodie",
  styleCount: 2,
  estimatedQuantity: 300,
  colorwayCount: 2,
  sizeRange: "S to XXL",
  targetMarket: "United States",
  productDescription:
    "A 400 gsm boxy hoodie with a double lined hood, heavy ribbing and a screen printed chest graphic.",
  knownMaterial: "",
  composition: "",
  weight: "",
  stretchRequirement: "",
  performanceRequirement: "",
  colorRequirement: "",
  needsMaterialRecommendation: true,
  decoration: ["screen-printing" as const],
  decorationNotes: "",
  requiredDeliveryDate: "2026-12-01",
  destinationCity: "New York",
  destinationCountry: "United States",
  shippingTerm: "fob" as const,
  targetPrice: "",
  sampleRequired: "yes" as const,
  supplierStatus: "new-development" as const,
  additionalNotes: "",
  attachments: [],
  privacyConsent: true as const,
  designReviewConsent: true as const,
  marketingConsent: false,
};

describe("RFQ schema", () => {
  it("accepts a complete, realistic submission", () => {
    const result = rfqFormSchema.safeParse(validRfq);
    expect(result.success).toBe(true);
  });

  it("requires privacy consent to be explicitly true", () => {
    const result = rfqFormSchema.safeParse({ ...validRfq, privacyConsent: false });
    expect(result.success).toBe(false);
  });

  it("requires design review consent to be explicitly true", () => {
    const result = rfqFormSchema.safeParse({ ...validRfq, designReviewConsent: false });
    expect(result.success).toBe(false);
  });

  it("allows marketing consent to be declined without failing validation", () => {
    const result = rfqFormSchema.safeParse({ ...validRfq, marketingConsent: false });
    expect(result.success).toBe(true);
  });

  it("rejects a product description that is too short to quote from", () => {
    const result = rfqFormSchema.safeParse({ ...validRfq, productDescription: "hoodie" });
    expect(result.success).toBe(false);
  });

  it("rejects a quantity of zero", () => {
    const result = rfqFormSchema.safeParse({ ...validRfq, estimatedQuantity: 0 });
    expect(result.success).toBe(false);
  });

  it("accepts a fifty piece validation order", () => {
    const result = rfqFormSchema.safeParse({ ...validRfq, estimatedQuantity: 50 });
    expect(result.success).toBe(true);
  });

  it("accepts an enterprise quantity", () => {
    const result = rfqFormSchema.safeParse({ ...validRfq, estimatedQuantity: 250_000 });
    expect(result.success).toBe(true);
  });

  it("rejects an unknown product family", () => {
    const result = rfqFormSchema.safeParse({ ...validRfq, productFamily: "spaceships" });
    expect(result.success).toBe(false);
  });

  it("allows a product family that is deliberately not listed", () => {
    const result = rfqFormSchema.safeParse({ ...validRfq, productFamily: "not-listed" });
    expect(result.success).toBe(true);
  });

  it("validates the buyer step independently of later steps", () => {
    const buyerStep = rfqStepSchemas[0];
    const result = buyerStep.safeParse({
      fullName: validRfq.fullName,
      email: validRfq.email,
      phone: validRfq.phone,
      whatsapp: "",
      company: validRfq.company,
      website: "",
      country: validRfq.country,
      buyerType: validRfq.buyerType,
      companyStage: validRfq.companyStage,
    });
    expect(result.success).toBe(true);
  });

  it("has one schema per declared step", () => {
    expect(rfqStepSchemas).toHaveLength(7);
  });
});

describe("contact schema", () => {
  const validContact = {
    name: "Priya Raman",
    email: "priya@example.org",
    company: "Example Organisation",
    country: "United Kingdom",
    subject: "new-project" as const,
    message: "We are looking to produce 500 corporate polo shirts for a summer rollout.",
    privacyConsent: true as const,
    marketingConsent: false,
  };

  it("accepts a valid message", () => {
    expect(contactFormSchema.safeParse(validContact).success).toBe(true);
  });

  it("rejects a message that is too short to act on", () => {
    expect(contactFormSchema.safeParse({ ...validContact, message: "hi" }).success).toBe(false);
  });

  it("requires privacy consent", () => {
    expect(
      contactFormSchema.safeParse({ ...validContact, privacyConsent: false }).success,
    ).toBe(false);
  });
});

describe("sample request schema", () => {
  const validSample = {
    fullName: "Sam Okafor",
    email: "sam@example.com",
    phone: "",
    company: "Example Label",
    country: "Germany",
    productFamily: "everyday-apparel",
    sampleType: "fabric-swatches" as const,
    hasTechPack: "no" as const,
    materialPreference: "",
    sizeRequired: "M",
    colorRequired: "Ecru",
    decorationRequired: "",
    destinationCity: "Berlin",
    destinationCountry: "Germany",
    requiredDate: "2026-11-15",
    notes: "",
    attachments: [],
    privacyConsent: true as const,
    designReviewConsent: true as const,
    marketingConsent: true,
  };

  it("accepts a valid request", () => {
    expect(sampleRequestFormSchema.safeParse(validSample).success).toBe(true);
  });

  it("rejects an invalid required date", () => {
    expect(
      sampleRequestFormSchema.safeParse({ ...validSample, requiredDate: "not a date" }).success,
    ).toBe(false);
  });

  it("requires both consents", () => {
    expect(
      sampleRequestFormSchema.safeParse({ ...validSample, designReviewConsent: false }).success,
    ).toBe(false);
  });
});
