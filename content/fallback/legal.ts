/**
 * Legal page content.
 *
 * These are working drafts written to reflect what this website and these forms
 * actually do. They are not legal advice, and every page says so and is marked
 * for review by a qualified adviser in docs/LAUNCH_CHECKLIST.md before launch.
 *
 * Placeholders that require a business decision are written as an explicit
 * instruction rather than as invented text, so nobody publishes a policy naming
 * a company registration or a data protection contact that does not exist.
 */

export interface LegalSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export const legalReviewNotice =
  "This page is a working draft prepared to describe how this website and its forms actually operate. It has not been reviewed by a qualified legal adviser and it is not legal advice. It must be reviewed and approved before launch.";

export const privacyPolicy: { updated: string; sections: LegalSection[] } = {
  updated: "2026-09-04",
  sections: [
    {
      heading: "Who this policy covers",
      paragraphs: [
        "This policy describes how Textileways handles personal information submitted through this website. The registered legal entity name and company registration details are recorded as outstanding in the project content requirements and must be inserted here before publication.",
        "If you contact us by email or telephone rather than through this website, the same principles apply to the information you provide.",
      ],
    },
    {
      heading: "What we collect",
      paragraphs: [
        "We collect only what the forms on this site ask for. Nothing is inferred, purchased or enriched from third party sources.",
      ],
      list: [
        "Contact details you enter: name, work email, telephone, WhatsApp number if you supply one, company name and website",
        "Country and destination details needed to quote and ship",
        "Product information you describe, including quantities, materials, decoration and delivery requirements",
        "Files you attach, such as tech packs, measurement charts, artwork and reference images",
        "Your consent choices, recorded with the submission",
        "Basic technical information present in any web request, including your IP address, which is used for rate limiting and spam prevention",
      ],
    },
    {
      heading: "Why we use it",
      paragraphs: [
        "Information submitted through this site is used to respond to your inquiry, prepare a quotation, develop samples and produce an order. It is not used for any unrelated purpose.",
        "Marketing email is sent only where you have separately and optionally ticked the marketing consent box. That consent is recorded independently of the consent required to respond to your inquiry, and declining it does not affect your inquiry in any way.",
      ],
    },
    {
      heading: "Files you submit",
      paragraphs: [
        "Design files, tech packs and artwork are treated as your confidential business information. They are accessed internally, and shared with the partners working on your project, only to the extent needed to quote and produce your order.",
        "A non disclosure agreement can be signed before you share original designs, and we recommend it for original product development. Ask for one at the inquiry stage rather than after you have sent files.",
      ],
    },
    {
      heading: "Who we share it with",
      paragraphs: [
        "We use a small number of service providers to operate this website and respond to inquiries. Each processes information only on our instructions.",
      ],
      list: [
        "A hosting provider that serves this website",
        "A transactional email provider that delivers inquiry notifications and your confirmation email",
        "A file storage provider that holds attachments you submit",
        "A spam prevention service that verifies form submissions",
        "An analytics provider, only where you have accepted analytics cookies",
        "The specific providers in use must be confirmed and named here before launch",
      ],
    },
    {
      heading: "What we never send to analytics",
      paragraphs: [
        "Analytics on this site is deliberately limited. Nothing you type into a form reaches an analytics provider.",
      ],
      list: [
        "Names, email addresses, telephone numbers and company contact details",
        "The contents of any message, product description or note",
        "File names and file contents",
        "Any value that could identify you personally",
      ],
    },
    {
      heading: "How long we keep it",
      paragraphs: [
        "Inquiry correspondence and quotations are retained for as long as needed to serve the customer relationship and to meet legal and accounting obligations.",
        "The specific retention periods applied by the business must be confirmed and stated here before launch. Guidance on setting them is in the project deployment documentation.",
      ],
    },
    {
      heading: "Your rights",
      paragraphs: [
        "Depending on where you are located, you may have rights to access, correct, delete, restrict or object to the processing of your personal information, and to receive a copy of it in a portable format. Where processing is based on consent, you may withdraw that consent at any time.",
        "A named contact and email address for exercising these rights must be inserted here before publication. Until it is, requests can be sent through the contact form on this site.",
      ],
    },
    {
      heading: "Cookies",
      paragraphs: [
        "This site sets no analytics cookies unless you accept them. The consent banner appears only when an analytics provider is configured, and declining is a single click of equal prominence to accepting.",
        "Your consent choice is stored in your own browser so you are not asked repeatedly. You can change it at any time using the cookie settings link in the footer.",
      ],
    },
    {
      heading: "Security",
      paragraphs: [
        "This site is served over HTTPS with a content security policy and other protective headers. Form submissions are validated on the server, rate limited, and checked for automated submission. Uploaded files are restricted by type and size, and executable file types are refused.",
        "No system is perfectly secure. If you believe you have found a security problem with this website, please report it through the contact form so it can be addressed.",
      ],
    },
    {
      heading: "Changes to this policy",
      paragraphs: [
        "If this policy changes materially, the updated version will be published here with a revised date at the top of the page.",
      ],
    },
  ],
};

export const termsOfUse: { updated: string; sections: LegalSection[] } = {
  updated: "2026-09-04",
  sections: [
    {
      heading: "About these terms",
      paragraphs: [
        "These terms govern your use of this website. They do not govern any manufacturing order, which is subject to the separate written terms agreed for that order.",
        "The registered legal entity name and company registration details are recorded as outstanding in the project content requirements and must be inserted here before publication.",
      ],
    },
    {
      heading: "Information on this site is not an offer",
      paragraphs: [
        "Product descriptions, capability descriptions, material properties and process explanations on this site are provided for general guidance. They are not an offer to supply, and they are not a specification for any particular order.",
        "A binding arrangement arises only from a written quotation issued for your specific requirement and accepted in writing, together with the terms attached to it.",
      ],
    },
    {
      heading: "Indicative values and ranges",
      paragraphs: [
        "Fabric weights, minimum order quantities, material properties and process capabilities are published as typical ranges and general behaviour. They vary with the specific yarn, fabric construction, finishing and production route selected for your order.",
        "Values you intend to rely on commercially are confirmed against an approved physical sample and, where required, by laboratory testing. Nothing on this website should be treated as a guaranteed specification.",
      ],
    },
    {
      heading: "No lead time or price guarantee",
      paragraphs: [
        "This website publishes no prices and no universal lead times, because neither is true across every specification. Any price or schedule is given in a written quotation for a specific requirement and carries its own validity period.",
      ],
    },
    {
      heading: "Compliance responsibility",
      paragraphs: [
        "Where this site describes labelling, regulatory or compliance considerations, it does so to help you ask the right questions. It is not legal or regulatory advice.",
        "Responsibility for confirming what your product and your destination market legally require remains with you as the brand owner or importer. We apply exactly what you confirm, and we tell you when something in a specification appears inconsistent with what you have told us.",
      ],
    },
    {
      heading: "Intellectual property",
      paragraphs: [
        "The content, design and code of this website belong to Textileways or its licensors. You may view and print pages for your own business use in evaluating us as a supplier.",
        "Designs, artwork and specifications you submit remain yours. By submitting them you confirm you have the right to do so, and you permit us to use them for the limited purpose of quoting, sampling and producing your order.",
      ],
    },
    {
      heading: "Acceptable use",
      paragraphs: [
        "Do not use this website or its forms to submit unlawful content, to attempt to gain unauthorised access, to interfere with its operation, or to send automated or bulk submissions.",
        "Submissions are rate limited and checked for automated submission. Access may be restricted where use appears abusive.",
      ],
    },
    {
      heading: "External links",
      paragraphs: [
        "Where this site links to an external website, that site is outside our control and we are not responsible for its content or its practices.",
      ],
    },
    {
      heading: "Governing law",
      paragraphs: [
        "The governing law and jurisdiction for these terms must be confirmed by the business and its legal adviser, and inserted here before publication.",
      ],
    },
  ],
};

export const cookiePolicy: { updated: string; sections: LegalSection[] } = {
  updated: "2026-09-04",
  sections: [
    {
      heading: "Our approach",
      paragraphs: [
        "This site is built to work without tracking. No analytics cookie is set unless you accept one, and the consent banner appears only when an analytics provider has actually been configured.",
        "Declining is a single click of equal prominence to accepting, and declining does not limit any part of the site.",
      ],
    },
    {
      heading: "What is stored without consent",
      paragraphs: [
        "Two things are stored in your browser regardless of your analytics choice, because the site could not function sensibly otherwise. Neither is sent to us or to any third party.",
      ],
      list: [
        "Your cookie consent choice, so you are not asked on every page. Stored in your browser's local storage.",
        "A draft of the quote request form as you fill it in, so a reload or a mistaken navigation does not lose your work. Stored in your browser's session storage and cleared when you submit the form or close the tab.",
      ],
    },
    {
      heading: "What is stored only with consent",
      paragraphs: [
        "If you accept analytics, the configured analytics provider sets its own cookies to measure which pages are useful to buyers.",
      ],
      list: [
        "Page views and navigation between pages",
        "Which calls to action are used, and from which section of the site",
        "Whether a form was started, how far it progressed and whether it was submitted",
        "No personal information, no message content, no email addresses, no telephone numbers and no file names",
      ],
    },
    {
      heading: "Spam prevention",
      paragraphs: [
        "The forms on this site use a spam prevention service. Where it is enabled, it may set a token in your browser as part of verifying that a submission comes from a person rather than an automated client. This is necessary for the forms to work and is not used for advertising or tracking.",
      ],
    },
    {
      heading: "Changing your choice",
      paragraphs: [
        "Use the cookie settings link in the footer of any page to change your analytics choice at any time. You can also clear site data in your browser, which removes everything this site has stored.",
      ],
    },
  ],
};
