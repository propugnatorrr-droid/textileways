# Textileways Website Master Build Specification

## 1. Mission

Design and build a production grade B2B manufacturing website for Textileways, a Pakistan based textile and apparel manufacturer serving primarily USA and European buyers.

Textileways supports:

1. Small validation orders starting from approximately 50 pieces
2. Growing brands ordering hundreds or thousands of pieces
3. Enterprise programs exceeding 100,000 pieces
4. Custom product development
5. Private label production
6. OEM and ODM services
7. Apparel, uniforms, home textiles, accessories, and specialist textile products
8. International production and export support

The website must position Textileways as:

> Startup flexibility. Enterprise manufacturing discipline.

Primary commercial message:

> Start at 50. Scale beyond 100,000.

Primary brand statement:

> One manufacturing partner. Every textile possibility.

Do not build a generic factory template, retail fashion store, dropshipping website, or simple brochure site.

Build a premium manufacturing platform focused on credibility, product discovery, technical expertise, qualified inquiries, and long term scalability.

---

# 2. Operating Instructions

## 2.1 Work autonomously

Complete the project without repeatedly asking for ordinary implementation decisions.

Only request clarification if one of these is genuinely required:

1. A secret or API key
2. An unavailable brand asset
3. A business fact that cannot legally or ethically be assumed
4. Access to an external platform
5. A decision with a significant irreversible business consequence

For everything else, make a sensible professional decision and document it.

## 2.2 Before coding

Perform these steps:

1. Inspect the complete repository.
2. Identify the package manager.
3. Identify existing code, configuration, and conventions.
4. Check whether a Next.js project already exists.
5. Preserve useful existing work.
6. Create `docs/IMPLEMENTATION.md`.
7. Create `docs/CONTENT_REQUIREMENTS.md`.
8. Create `docs/LAUNCH_CHECKLIST.md`.
9. Create a concise implementation checklist.
10. Start implementation immediately after planning.

Do not generate a huge repetitive plan. Keep planning concise and actionable.

## 2.3 During implementation

After completing each major phase:

1. Run linting.
2. Run type checking.
3. Run relevant tests.
4. Run a production build.
5. Fix all errors caused by the implementation.
6. Update the implementation checklist.
7. Continue to the next phase.

Do not stop after creating a homepage or a visual prototype.

## 2.4 Completion rule

The task is complete only when:

1. All required routes exist.
2. All major pages are designed and implemented.
3. Responsive layouts work.
4. Navigation works.
5. Forms work.
6. Validation works.
7. SEO metadata works.
8. Structured data is present.
9. Accessibility checks pass.
10. The production build passes.
11. No obvious placeholder text remains.
12. Unverified company facts are clearly centralized and marked for verification.
13. Documentation explains configuration and deployment.

## 2.5 Communication efficiency

Keep progress reports concise.

Do not spend tokens narrating routine coding decisions. Use short status summaries and spend the majority of effort on implementation.

---

# 3. Non Negotiable Design Rules

## 3.1 Visual direction

Use tactile editorial minimalism.

The visual language must combine:

1. Premium editorial typography
2. Industrial precision
3. Textile material detail
4. Warm light backgrounds
5. Authentic manufacturing imagery
6. Structured technical information
7. Restrained motion
8. Generous spacing
9. Clear conversion paths

## 3.2 Prohibited design patterns

Do not use:

1. Dark theme as the main theme
2. Glow effects
3. Neon gradients
4. Glowing dots
5. Decorative floating dots
6. Pill shaped buttons
7. Pill shaped tags
8. Excessively rounded cards
9. Glassmorphism
10. Neumorphism
11. Generic startup gradients
12. Animated globes
13. Floating particle effects
14. Marquee overload
15. Fake dashboards
16. Fake statistics
17. Stock crypto style graphics
18. Excessive shadows
19. Autoplay audio
20. Cursor replacement
21. Horizontal scrolling on mobile
22. Em dashes or en dashes in public website copy

Use commas, periods, colons, parentheses, or separate sentences instead.

## 3.3 Shape system

Use:

1. Mostly square containers
2. Border radius between 0 and 8 pixels
3. Button radius between 2 and 6 pixels
4. Thin neutral borders
5. Full bleed photography
6. Structured editorial grids
7. Clear section boundaries
8. Rectangular inputs and controls

Cards should exist only when they improve hierarchy.

## 3.4 Color system

Create semantic CSS variables.

Suggested starting palette:

```css
--color-cotton: #f5f1e8;
--color-paper: #fcfaf5;
--color-ink: #17201d;
--color-forest: #29473c;
--color-clay: #a65f43;
--color-stone: #cbc5ba;
--color-mist: #e7e4dd;
--color-blue: #607786;
--color-white: #ffffff;
--color-error: #a33a32;
--color-success: #35634a;
```

Requirements:

1. Main background should be paper or cotton.
2. Main text should be ink.
3. Forest should be the main brand accent.
4. Clay may be used sparingly.
5. Maintain WCAG AA color contrast.
6. Do not use pure black unless technically necessary.
7. Do not use large dark sections repeatedly.

## 3.5 Typography

Use:

1. A premium editorial serif for major display headings
2. A precise sans serif for body text, interfaces, and technical content

Prefer open source or properly licensed fonts.

Suggested pairing:

1. Instrument Serif for display
2. Inter or Manrope for body and UI

Use `next/font`.

Typography should be fluid using `clamp()`.

Suggested scale:

```text
Display XL: clamp(3.2rem, 8vw, 7.5rem)
Display L: clamp(2.8rem, 6vw, 5.8rem)
Heading 1: clamp(2.4rem, 5vw, 4.6rem)
Heading 2: clamp(2rem, 4vw, 3.5rem)
Heading 3: clamp(1.4rem, 2.2vw, 2.1rem)
Body L: clamp(1.1rem, 1.3vw, 1.35rem)
Body: 1rem
Small: 0.875rem
Label: 0.75rem to 0.8125rem
```

Maintain readable line lengths:

1. Body copy maximum width around 65 to 75 characters
2. Large heading maximum width around 12 to 16 words
3. Technical tables may use the full content width

## 3.6 Spacing

Use a consistent spacing scale based primarily on 4 and 8 pixels.

Suggested section spacing:

1. Mobile: 72 to 96 pixels
2. Tablet: 96 to 128 pixels
3. Desktop: 120 to 176 pixels

Suggested content width:

```text
Maximum page width: 1440px
Primary content width: 1280px
Reading width: 760px
Horizontal mobile padding: 20px
Horizontal tablet padding: 32px
Horizontal desktop padding: 48px to 72px
```

## 3.7 Motion

Motion must be subtle and respect `prefers-reduced-motion`.

Allowed:

1. Small image reveals
2. Underline transitions
3. Controlled menu transitions
4. Process line animation
5. Gentle number appearance
6. Small image scale on hover
7. Page transition only if it does not delay navigation

Do not animate every element.

Use CSS where possible. Add a motion library only if it materially improves the result.

---

# 4. Technical Architecture

## 4.1 Core stack

Use the current stable versions of:

1. Next.js with App Router
2. TypeScript with strict mode
3. React
4. Tailwind CSS
5. Sanity as the preferred headless CMS
6. Zod for validation
7. React Hook Form for complex forms
8. Resend or Postmark for transactional email
9. Vercel Blob or another secure storage adapter for RFQ attachments
10. Cloudflare Turnstile for spam protection
11. Vercel for deployment
12. Vitest for unit tests
13. Playwright for critical browser flows

If the repository already uses equivalent high quality tools, preserve them where reasonable.

## 4.2 Architecture principles

1. Use Server Components by default.
2. Use Client Components only where interactivity requires them.
3. Keep page files concise.
4. Place reusable UI in `components`.
5. Place business logic in `lib`.
6. Place schemas and types in dedicated directories.
7. Centralize site configuration.
8. Centralize unverified business facts.
9. Avoid hardcoding repeated content.
10. Avoid unnecessary dependencies.
11. Avoid global state unless genuinely required.
12. Use static generation where suitable.
13. Use incremental revalidation for CMS content.
14. Use route handlers for server operations.
15. Keep secrets server side.
16. Validate all external data.
17. Sanitize user generated input.
18. Never expose service credentials to the browser.

## 4.3 Suggested project structure

Adapt if the repository already has a good structure.

```text
app/
  (marketing)/
    page.tsx
    about/
    why-textileways/
    factory/
    quality/
    certifications/
    sustainability/
    responsibility/
    traceability/
    markets/
    industries/
    products/
    capabilities/
    materials/
    manufacturing-process/
    case-studies/
    insights/
    faq/
    contact/
    request-a-quote/
    request-a-sample/
  api/
    rfq/
    sample-request/
    contact/
    revalidate/
  sitemap.ts
  robots.ts
  manifest.ts
  layout.tsx
  not-found.tsx
  error.tsx
  global-error.tsx
  globals.css

components/
  layout/
  navigation/
  sections/
  product/
  capabilities/
  forms/
  content/
  seo/
  ui/

content/
  fallback/
  configuration/

lib/
  cms/
  email/
  storage/
  analytics/
  validation/
  security/
  seo/
  utilities/

sanity/
  schemas/
  queries/
  structure/

public/
  images/
  icons/
  documents/

tests/
  unit/
  e2e/

docs/
  IMPLEMENTATION.md
  CONTENT_REQUIREMENTS.md
  LAUNCH_CHECKLIST.md
  DEPLOYMENT.md
```

## 4.4 Environment variables

Provide `.env.example` with descriptive comments.

Expected variables may include:

```text
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
SANITY_API_READ_TOKEN
SANITY_REVALIDATE_SECRET
RESEND_API_KEY
RFQ_FROM_EMAIL
RFQ_TO_EMAIL
NEXT_PUBLIC_TURNSTILE_SITE_KEY
TURNSTILE_SECRET_KEY
BLOB_READ_WRITE_TOKEN
NEXT_PUBLIC_GA_ID
NEXT_PUBLIC_CLARITY_ID
HUBSPOT_ACCESS_TOKEN
```

The website must still build when optional analytics and CRM variables are missing.

---

# 5. Content Integrity Rules

## 5.1 Do not invent evidence

Never invent:

1. Certifications
2. Certificate numbers
3. Customers
4. Customer logos
5. Production capacities
6. Number of employees
7. Number of countries served
8. Delivery guarantees
9. On time delivery percentages
10. Defect rates
11. Sustainability results
12. Awards
13. Factory addresses
14. Partnerships
15. Testimonials
16. Laboratory capabilities
17. Compliance guarantees

## 5.2 Centralize facts

Create a typed file such as:

```text
content/configuration/company-facts.ts
```

Store factual claims with verification status.

Example:

```ts
type VerificationStatus = "verified" | "pending" | "do-not-publish";
```

Only show verified claims publicly in production.

Use confirmed facts from the brief:

1. Pakistan based
2. More than 20 years of manufacturing experience
3. MOQ can begin at approximately 50 pieces
4. Capacity can exceed 100,000 pieces
5. USA and EU are primary target markets

Make it easy for the owner to edit these facts.

## 5.3 Product truth labels

Support these capability labels:

1. Manufactured in house
2. Manufactured through an audited partner facility
3. Developed and sourced by Textileways
4. Available following technical review

Do not imply that every product is produced under one roof unless confirmed.

## 5.4 Public copy rules

Public copy must be:

1. Professional
2. Specific
3. Calm
4. International
5. Clear to non technical buyers
6. Free from exaggerated superiority claims
7. Free from keyword stuffing
8. Free from fake urgency
9. Free from empty phrases such as world class and best quality unless evidence supports them
10. Written in clear international English

---

# 6. Main Navigation

Desktop navigation:

1. Products
2. Capabilities
3. Manufacturing
4. Responsibility
5. Company
6. Resources
7. Request a Quote

Use a structured mega menu for Products and Capabilities.

The header should include:

1. Textileways logo
2. Primary navigation
3. Search trigger if product search is implemented
4. Request a Quote action
5. Mobile menu trigger

Header behavior:

1. Transparent or paper colored over the hero where readable
2. Becomes solid on scroll
3. Sticky without being visually heavy
4. Accessible keyboard navigation
5. Escape closes menus
6. Focus is managed correctly
7. Mobile menu traps focus
8. No pill shaped navigation elements

---

# 7. Required Routes

Implement these routes.

## 7.1 Core routes

```text
/
/about
/why-textileways
/factory
/quality
/certifications
/sustainability
/responsibility
/traceability
/manufacturing-process
/faq
/contact
/request-a-quote
/request-a-sample
/privacy
/terms
/cookie-policy
```

## 7.2 Products

```text
/products
/products/[slug]
```

Seed the CMS or fallback content with these major product families:

1. Everyday apparel
2. Streetwear
3. Sportswear and activewear
4. Outdoor and performance
5. Workwear and uniforms
6. Underwear, sleepwear, and loungewear
7. Children and baby
8. Swim and resort
9. Denim and woven products
10. Modest and cultural apparel
11. Specialist sports products
12. Home textiles
13. Textile accessories

Include representative product types under each family.

## 7.3 Capabilities

```text
/capabilities
/capabilities/[slug]
```

Create entries for:

1. Product design
2. Tech pack development
3. Material sourcing
4. Yarn sourcing
5. Knitting
6. Weaving
7. Dyeing
8. Custom color development
9. Pattern making
10. Grading
11. Sample development
12. Cutting
13. Cut and sew manufacturing
14. Seamless manufacturing
15. Screen printing
16. DTG printing
17. DTF printing
18. Sublimation
19. Heat transfer
20. Embroidery
21. Applique
22. Patches and badges
23. Washing and garment finishing
24. Private labelling
25. Hangtags and barcodes
26. Custom packaging
27. Quality assurance
28. Laboratory testing coordination
29. Inspection
30. Logistics and export

Mark capabilities requiring verification as pending rather than presenting them as confirmed.

## 7.4 Materials

```text
/materials
/materials/[slug]
```

Material groups:

1. Natural fibers
2. Synthetic and performance fibers
3. Knitted fabrics
4. Woven fabrics
5. Recycled and lower impact materials

Each material page supports:

1. Composition
2. Typical GSM range
3. Hand feel
4. Stretch
5. Breathability
6. Typical applications
7. Printing compatibility
8. Embroidery compatibility
9. Wash considerations
10. MOQ considerations
11. Available certifications
12. Related products

Do not present values as universal facts when they depend on the specific fabric.

## 7.5 Industries

```text
/industries
/industries/[slug]
```

Seed:

1. Fashion brands
2. Streetwear brands
3. Sports clubs and teams
4. Corporate uniforms
5. Hospitality
6. Healthcare
7. Education
8. Construction and industrial
9. Retail and wholesale
10. Promotional products

## 7.6 Markets

```text
/markets
/markets/usa
/markets/europe
/markets/uk
```

The content should explain buyer support and market awareness without making blanket legal guarantees.

## 7.7 Content routes

```text
/case-studies
/case-studies/[slug]
/insights
/insights/[slug]
```

Prepare content models and polished fallback examples. Clearly mark fictional case study data as unpublished demo content. Do not publish fabricated customer stories as factual claims.

---

# 8. Homepage Specification

Build the homepage in this order.

## 8.1 Hero

Content:

Eyebrow:

> Textile and apparel manufacturing in Pakistan

Headline:

> One manufacturing partner. Every textile possibility.

Supporting copy:

> Custom apparel, uniforms, home textiles, and specialist products for brands across the USA and Europe. Start with 50 pieces and scale beyond 100,000.

Primary action:

> Request a Manufacturing Quote

Secondary action:

> Explore Products

Additional trust line:

> More than 20 years of manufacturing experience

Visual requirements:

1. Use authentic factory media when available.
2. Support an optimized image or muted video.
3. Do not autoplay video on constrained mobile connections.
4. Provide poster image and accessible fallback.
5. Do not overlay excessive text.
6. Maintain strong contrast.
7. Avoid a generic model photoshoot as the main hero.

## 8.2 Production scale section

Show a visual progression:

1. 50 pieces, product validation
2. 250 pieces, first collection
3. 1,000 pieces, growing demand
4. 10,000 pieces, wholesale growth
5. 100,000 plus pieces, enterprise programs

Do not use pill elements.

## 8.3 Product universe

Show the major product families using an editorial image grid.

Each item must link to its category page.

## 8.4 Positioning statement

Headline:

> Startup flexibility. Enterprise manufacturing discipline.

Explain that buyers should not need to replace their manufacturer every time they grow.

## 8.5 How it works

Eight stages:

1. Inquiry and technical review
2. Quotation
3. Material selection
4. Sample development
5. Sample approval
6. Production
7. Quality control
8. Packing and delivery

Use an accessible ordered process, not purely decorative graphics.

## 8.6 Capabilities

Feature:

1. Product development
2. Material sourcing
3. Sampling
4. Manufacturing
5. Decoration
6. Private labelling
7. Quality assurance
8. International logistics

## 8.7 Factory evidence

Build an editorial gallery ready for:

1. Factory exterior
2. Production floor
3. Cutting
4. Sewing
5. Printing
6. Embroidery
7. Inspection
8. Packing

If final media is unavailable, use clearly documented local temporary assets and list every replacement in `docs/CONTENT_REQUIREMENTS.md`.

## 8.8 Quality section

Show quality checkpoints:

1. Material inspection
2. Pre production review
3. Cutting inspection
4. Inline inspection
5. Measurement verification
6. Finishing inspection
7. Final random inspection
8. Packing audit

Label procedures as configurable if they are not verified company standards.

## 8.9 Markets section

Show:

1. USA
2. European Union
3. United Kingdom
4. Other international markets

Link to market pages.

## 8.10 Case studies

Display only published CMS case studies.

If none exist, replace this with an educational project process section. Never fabricate client results.

## 8.11 Responsibility section

Link to:

1. Sustainability
2. Social responsibility
3. Certifications
4. Traceability
5. Quality

## 8.12 Insights

Show the latest three useful articles.

## 8.13 Final call to action

Headline:

> From your first sample to your largest production run.

Supporting copy:

> Share your product details, target quantity, and delivery requirements. Our team will review the technical and commercial requirements.

Action:

> Start Your RFQ

---

# 9. Product Page Template

Every product category page must support:

1. Breadcrumbs
2. Category title
3. Clear introduction
4. Capability status
5. Image gallery
6. Product variations
7. Typical materials
8. Typical GSM or weight options
9. Construction options
10. Decoration methods
11. Labels and packaging
12. Indicative MOQ information
13. Sampling information
14. Quality considerations
15. Target market considerations
16. Related capabilities
17. Related materials
18. Related industries
19. Relevant FAQs
20. RFQ action

Do not publish universal lead times or prices unless verified.

Use language such as:

> MOQ depends on material availability, color count, construction, decoration, and packaging. Projects can begin from approximately 50 pieces following technical review.

Product pages are informational manufacturing pages, not retail product detail pages.

Do not include:

1. Consumer size selectors
2. Add to cart
3. Retail pricing
4. Consumer reviews
5. Fake stock levels

---

# 10. Capabilities Page Template

Each capability page must support:

1. Introduction
2. Process explanation
3. Suitable products
4. Material compatibility
5. Available techniques
6. Technical limitations
7. Quality checkpoints
8. Supporting media
9. Related products
10. Related materials
11. Related FAQs
12. Quote action

Use diagrams where they improve understanding.

---

# 11. Manufacturing Process Page

Create a detailed process from inquiry through delivery.

Stages:

1. Product brief
2. NDA if required
3. Technical review
4. Tech pack or specification development
5. Costing
6. Material selection
7. Prototype or sample
8. Fit and construction feedback
9. Revised sample where needed
10. Pre production approval
11. Material procurement
12. Cutting
13. Manufacturing
14. Decoration
15. Inline quality control
16. Finishing
17. Final inspection
18. Packing
19. Export documentation
20. Delivery
21. Reorder and scaling

For each stage include:

1. Buyer responsibility
2. Textileways responsibility
3. Required documents
4. Typical decision points
5. Possible delays
6. Approval requirements

Avoid promising fixed timelines for every product.

---

# 12. Quality Page

The quality page should include:

1. Quality philosophy
2. Product specification control
3. Material inspection
4. Sample approval
5. Inline quality control
6. Measurement tolerances
7. Appearance checks
8. Color consistency
9. Print and embroidery checks
10. Final random inspection
11. Packing verification
12. Third party inspection support
13. Testing coordination
14. Corrective action process
15. Documentation examples

Support AQL content as an educational explanation, but do not claim a specific company standard unless verified.

---

# 13. Certifications Page

Create a CMS driven certificate registry.

Certificate fields:

1. Name
2. Issuing organization
3. Certificate number
4. Facility
5. Scope
6. Issue date
7. Expiry date
8. Verification URL
9. Document
10. Status
11. Public visibility

Certificate statuses:

1. Active
2. Expiring soon
3. Expired
4. Pending verification
5. Hidden

Only display active, verified, public certificates.

Do not display certification logos without corresponding verified records.

---

# 14. Sustainability and Responsibility

Avoid vague green claims.

Support structured information for:

1. Material choices
2. Recycled materials
3. Organic material options
4. Waste handling
5. Packaging reduction
6. Water and energy initiatives
7. Worker wellbeing
8. Ethical sourcing
9. Traceability
10. Improvement targets

Every measurable claim should support:

1. Value
2. Unit
3. Reporting period
4. Scope
5. Method
6. Evidence
7. Verification status

If no verified metrics exist, publish the approach and available options without invented numbers.

---

# 15. RFQ System

The RFQ is the most important conversion feature.

Build a multi step form.

## Step 1: Buyer

Fields:

1. Full name
2. Work email
3. Phone
4. WhatsApp, optional
5. Company
6. Website, optional
7. Country
8. Buyer type
9. Company stage

## Step 2: Product

Fields:

1. Product family
2. Product type
3. Number of styles
4. Estimated quantity
5. Number of colorways
6. Size range
7. Target market
8. Product description

## Step 3: Materials

Fields:

1. Known material
2. Composition
3. GSM or weight
4. Stretch requirements
5. Performance requirements
6. Color requirements
7. Need material recommendation

## Step 4: Customization

Options:

1. Screen printing
2. DTG
3. DTF
4. Sublimation
5. Embroidery
6. Applique
7. Patches
8. Wash treatments
9. Custom labels
10. Hangtags
11. Barcodes
12. Custom packaging
13. Other

## Step 5: Commercial details

Fields:

1. Required delivery date
2. Destination city
3. Destination country
4. Preferred shipping term
5. Target price, optional
6. Sample required
7. Existing supplier or new development
8. Additional notes

## Step 6: Attachments

Support:

1. Tech packs
2. PDF files
3. Reference images
4. Measurement charts
5. Artwork
6. Packaging references

Security requirements:

1. Allowlist file types
2. Validate MIME type and extension
3. Limit individual file size
4. Limit total upload size
5. Generate safe file names
6. Do not expose storage credentials
7. Scan or prepare an adapter for malware scanning
8. Reject executable files
9. Use signed upload logic where appropriate

## Step 7: Consent and review

Include:

1. Information summary
2. Privacy consent
3. Confirmation that submitted designs may be reviewed for quotation
4. Marketing consent as a separate optional checkbox
5. Submit action

## Submission behavior

On successful submission:

1. Generate a human readable RFQ reference
2. Save structured submission data
3. Send internal notification
4. Send buyer confirmation
5. Attach or securely link uploaded files
6. Record consent
7. Record attribution data
8. Prevent duplicate submissions
9. Show a proper confirmation screen
10. Track a successful conversion event

On failure:

1. Preserve user input
2. Show a useful error
3. Log the server failure without exposing secrets
4. Avoid sending duplicate emails
5. Allow safe retry

## Spam protection

Use:

1. Cloudflare Turnstile
2. Honeypot field
3. Server side rate limiting
4. Zod validation
5. Minimum completion time detection where reasonable
6. Sanitization
7. Generic server error messages

---

# 16. Contact and Sample Forms

## Contact form

Fields:

1. Name
2. Work email
3. Company
4. Country
5. Subject
6. Message
7. Consent

## Sample request

Fields:

1. Buyer information
2. Product category
3. Sample type
4. Existing tech pack
5. Material preference
6. Size
7. Color
8. Decoration
9. Destination
10. Required date
11. Attachments
12. Consent

Reuse secure form infrastructure.

---

# 17. CMS Models

Create Sanity schemas for:

## 17.1 Global settings

Fields:

1. Company identity
2. Contact details
3. Social links
4. Offices
5. Navigation
6. Footer
7. Default SEO
8. Announcement
9. RFQ recipients
10. Verification status settings

## 17.2 Product category

Fields:

1. Name
2. Slug
3. Short description
4. Full introduction
5. Hero media
6. Gallery
7. Capability status
8. Product types
9. Materials
10. Construction options
11. Decoration options
12. MOQ guidance
13. Sampling guidance
14. Packaging
15. Quality notes
16. Market notes
17. FAQs
18. Related content
19. SEO
20. Publication status

## 17.3 Capability

Fields:

1. Name
2. Slug
3. Summary
4. Full content
5. Process stages
6. Suitable products
7. Materials
8. Techniques
9. Limitations
10. Quality checks
11. Media
12. FAQs
13. SEO
14. Verification status
15. Publication status

## 17.4 Material

Fields:

1. Name
2. Slug
3. Material group
4. Composition
5. GSM guidance
6. Hand feel
7. Stretch
8. Breathability
9. Applications
10. Decoration compatibility
11. Care considerations
12. MOQ considerations
13. Certification options
14. Related products
15. SEO
16. Verification status

## 17.5 Case study

Fields:

1. Title
2. Slug
3. Client name
4. Client visibility permission
5. Industry
6. Market
7. Challenge
8. Solution
9. Process
10. Products
11. Materials
12. Quantity
13. Results
14. Testimonial
15. Media
16. Evidence status
17. SEO
18. Publication status

Do not publish without evidence and permission.

## 17.6 Article

Fields:

1. Title
2. Slug
3. Summary
4. Body
5. Category
6. Author
7. Main image
8. Related products
9. Related capabilities
10. Related materials
11. FAQs
12. Published date
13. Updated date
14. SEO

## 17.7 Certificate

Use the certificate fields described earlier.

## 17.8 FAQ

Fields:

1. Question
2. Answer
3. Category
4. Related pages
5. Publication status

## 17.9 Team member

Fields:

1. Name
2. Role
3. Biography
4. Photograph
5. LinkedIn, optional
6. Public visibility

## 17.10 Market and industry

Use structured fields for relevant buyer guidance, services, products, FAQs, and SEO.

---

# 18. Search and Filtering

The Products and Materials hubs should support filtering without turning the design into an e-commerce interface.

Product filters may include:

1. Product family
2. Buyer industry
3. Material type
4. Decoration method
5. Intended market
6. Capability status

Requirements:

1. Filters must be keyboard accessible.
2. Filter state should be reflected in the URL where practical.
3. Mobile filters should use an accessible drawer.
4. Do not display filters as a large collection of pills.
5. Use checkboxes, select controls, or a structured filter list.
6. Include a clear reset function.
7. Show a useful empty state.

---

# 19. SEO

## 19.1 Technical SEO

Implement:

1. Unique metadata per route
2. Canonical URLs
3. Open Graph metadata
4. Twitter metadata
5. Dynamic sitemap
6. Robots configuration
7. Proper heading hierarchy
8. Clean URL structure
9. Breadcrumbs
10. Image alt text
11. Internal linking
12. Pagination metadata if needed
13. Proper status codes
14. Custom 404 page
15. Redirect strategy documentation

## 19.2 Structured data

Implement valid JSON LD where applicable:

1. Organization
2. ManufacturingBusiness or suitable LocalBusiness subtype
3. WebSite
4. BreadcrumbList
5. Product for manufactured product categories where appropriate
6. Service
7. Article
8. FAQPage only where visible FAQ content qualifies
9. VideoObject
10. ImageObject

Do not put false prices, ratings, reviews, or availability into Product schema.

## 19.3 Content SEO

Avoid programmatically generated thin pages.

Every indexable page should have:

1. Unique purpose
2. Useful original content
3. Relevant internal links
4. Clear title
5. Clear description
6. Relevant call to action
7. No keyword stuffing

---

# 20. Accessibility

Target WCAG 2.2 AA.

Requirements:

1. Semantic HTML
2. Keyboard accessible navigation
3. Visible focus states
4. Skip to content link
5. Correct labels
6. Helpful validation messages
7. Error summaries for long forms
8. Sufficient contrast
9. Meaningful alternative text
10. Decorative images ignored by assistive technology
11. Reduced motion support
12. Accessible dialogs and drawers
13. Accessible accordions
14. No keyboard traps except controlled modal focus traps
15. Logical tab order
16. Minimum practical touch target size
17. Captions or transcript support for meaningful video
18. Correct language attribute
19. Status messages announced where necessary
20. Forms usable without a mouse

Test major routes with automated accessibility checks.

---

# 21. Performance

Target strong real world performance.

Goals:

1. Mobile Lighthouse Performance of 90 or higher where realistic
2. Accessibility of 95 or higher
3. Best Practices of 95 or higher
4. SEO of 95 or higher
5. LCP under 2.5 seconds on representative mobile conditions
6. CLS under 0.1
7. INP under 200 milliseconds where measurable

Implementation requirements:

1. Use `next/image`.
2. Provide image dimensions.
3. Use responsive image sizes.
4. Compress media.
5. Lazy load below the fold media.
6. Prioritize only genuine LCP media.
7. Avoid large client bundles.
8. Avoid unnecessary JavaScript.
9. Use Server Components.
10. Subset fonts.
11. Preload only necessary assets.
12. Avoid autoplaying large videos on mobile.
13. Use poster images.
14. Prevent layout shifts.
15. Cache CMS content appropriately.

---

# 22. Security and Privacy

Implement:

1. Server side input validation
2. Rate limiting
3. Turnstile verification
4. Secure headers
5. Content Security Policy where practical
6. Referrer policy
7. Permissions policy
8. Safe file handling
9. Escaped and sanitized content
10. No secrets in client bundles
11. No verbose production errors
12. Dependency vulnerability review
13. Protected revalidation endpoint
14. Webhook signature verification
15. Minimal data collection
16. Retention guidance in documentation
17. Privacy and consent handling
18. Separate required consent from marketing consent

Do not store sensitive buyer information in analytics.

---

# 23. Analytics

Create an analytics abstraction rather than scattering tracking calls.

Track:

1. Quote CTA clicks
2. Product category views
3. Capability views
4. RFQ starts
5. RFQ step completions
6. RFQ submissions
7. Sample request submissions
8. Contact submissions
9. File upload failures
10. Download clicks
11. WhatsApp clicks
12. Email clicks
13. Phone clicks
14. Case study views
15. Market page views

Include useful context such as:

1. Page
2. Product family
3. Quantity range
4. Buyer market
5. CTA location

Never send personal information, message contents, email addresses, phone numbers, or file names to analytics.

Analytics must fail gracefully when IDs are missing.

---

# 24. Footer

Footer sections:

1. Brand statement
2. Products
3. Capabilities
4. Manufacturing
5. Responsibility
6. Company
7. Resources
8. Contact
9. Legal
10. Social links
11. Newsletter only if there is a real email marketing integration

Include:

1. Country
2. Business email
3. Phone if verified
4. Copyright
5. Privacy
6. Terms
7. Cookie settings

Do not create fake office locations.

---

# 25. Responsive Behavior

Test at minimum:

```text
360px
390px
430px
768px
1024px
1280px
1440px
1920px
```

Requirements:

1. No horizontal overflow.
2. Tables have responsive handling.
3. Mega menu becomes a mobile accordion.
4. Forms remain usable on small screens.
5. Upload controls remain accessible.
6. Typography scales naturally.
7. Images do not crop essential content.
8. CTA buttons do not become excessively tall.
9. Two column content becomes one column when needed.
10. Touch targets remain practical.

---

# 26. Error and Empty States

Build intentional states for:

1. 404
2. Global application error
3. Page level loading
4. CMS unavailable
5. No products found
6. No search results
7. Form submission failed
8. Upload failed
9. Invalid file
10. Expired certificate
11. Missing image
12. Empty case studies
13. Network timeout

Do not show raw stack traces or generic broken layouts.

---

# 27. Testing

## 27.1 Unit tests

Test important logic:

1. Zod schemas
2. RFQ reference generation
3. Metadata helpers
4. URL helpers
5. Analytics sanitization
6. File validation
7. Verification status filtering
8. Quantity range classification

## 27.2 End to end tests

Use Playwright for:

1. Homepage loads
2. Desktop navigation
3. Mobile navigation
4. Product category navigation
5. Product filtering
6. RFQ form validation
7. RFQ step navigation
8. Successful mocked RFQ submission
9. Failed RFQ submission
10. Contact form
11. Keyboard navigation
12. 404 route
13. Main CTA journey

## 27.3 Build checks

Required commands must pass:

1. Lint
2. Type check
3. Unit tests
4. End to end tests where environment permits
5. Production build

Do not disable TypeScript or ESLint errors to force a build.

---

# 28. Seed Content

Provide enough polished fallback content for the website to render without a connected CMS.

Fallback content must:

1. Be centralized
2. Be typed
3. Be replaceable by CMS data
4. Avoid fabricated credentials
5. Avoid fake customer stories
6. Avoid fake testimonials
7. Avoid fake statistics
8. Use confirmed positioning
9. Mark business details requiring verification

Seed at minimum:

1. 13 product families
2. 12 representative product detail entries
3. 12 major capabilities
4. 12 material entries
5. 10 industries
6. 3 market pages
7. 10 FAQs
8. 3 educational articles
9. Company, quality, factory, sustainability, and process content

Not every capability route must be long at first, but every seeded page must look intentional and useful.

---

# 29. Image System

Create a media abstraction supporting Sanity images and local fallbacks.

Requirements:

1. Responsive sizes
2. Art direction where needed
3. Focal point support
4. Alt text required for informative images
5. Caption support
6. Credit support
7. Aspect ratio control
8. Blur placeholder where appropriate
9. Graceful missing image treatment
10. No random remote stock image URLs embedded throughout the code

Prepare image slots for:

1. Factory
2. Processes
3. Products
4. Materials
5. Team
6. Quality
7. Packaging
8. Logistics
9. Sustainability

Document exact required photographs in `docs/CONTENT_REQUIREMENTS.md`.

---

# 30. Deployment

Target Vercel Pro.

Create `docs/DEPLOYMENT.md` covering:

1. Vercel project creation
2. Git integration
3. Environment variables
4. Sanity setup
5. Resend or Postmark setup
6. File storage setup
7. Turnstile setup
8. Custom domain
9. DNS records
10. Preserving cPanel email MX records
11. Preview deployments
12. Production deployment
13. Rollback
14. CMS revalidation
15. Monitoring

Important DNS rule:

The website can point to Vercel while email remains on cPanel. Do not advise replacing MX records unless the email provider is also being changed.

---

# 31. Content Requirements Document

In `docs/CONTENT_REQUIREMENTS.md`, create a concise table with:

1. Required item
2. Description
3. Format
4. Minimum resolution where relevant
5. Owner
6. Verification required
7. Status
8. Pages affected

Include:

1. Logo files
2. Brand registration details
3. Factory address
4. Contact details
5. Legal company name
6. Certificate PDFs
7. Factory photography
8. Factory video
9. Product photography
10. Material photography
11. Machine list
12. Capacity figures
13. Employee figures
14. Market history
15. Partner information
16. Customer permissions
17. Case study evidence
18. Social profiles
19. Privacy contact
20. Sales email recipients

---

# 32. Launch Checklist

The launch checklist must include:

## Content

1. Facts verified
2. Contact details verified
3. Certificates verified
4. Images replaced
5. Alt text reviewed
6. Legal pages approved
7. No demo case studies published
8. No fake testimonials
9. No unverified customer logos

## Technical

1. Build passing
2. Forms delivering
3. Uploads working
4. Spam protection working
5. Analytics working
6. Consent working
7. Sitemap working
8. Robots working
9. Canonicals correct
10. Redirects correct
11. 404 working
12. Error logging working
13. Domain configured
14. SSL working
15. Email DNS preserved

## Quality

1. Mobile tested
2. Keyboard tested
3. Accessibility reviewed
4. Performance reviewed
5. Browser testing complete
6. Social previews checked
7. Structured data validated
8. No broken links
9. No console errors
10. No horizontal overflow

---

# 33. Definition of Done

The final website must feel custom designed and commercially credible.

It must not feel like:

1. A partially completed starter
2. A theme with text changed
3. A single landing page
4. An online clothing store
5. A generic AI generated factory site
6. A concept that cannot receive real inquiries

The project is done when:

1. The complete route structure exists.
2. The homepage is fully built.
3. Product, capability, material, industry, market, article, and case study templates exist.
4. The advanced RFQ flow works.
5. Contact and sample forms work.
6. CMS schemas exist.
7. Fallback content exists.
8. SEO is complete.
9. Accessibility requirements are implemented.
10. Performance is optimized.
11. Security controls are present.
12. Tests cover critical flows.
13. Production build passes.
14. Deployment documentation exists.
15. Content and launch checklists exist.
16. No prohibited visual patterns appear.
17. No unverified claims are publicly presented as facts.

---

# 34. Final Execution Instruction

Start by inspecting the repository.

Then:

1. Create the concise implementation checklist.
2. Establish the design tokens and project architecture.
3. Build shared layout and navigation.
4. Build CMS schemas and fallback content.
5. Build the homepage.
6. Build hub pages and dynamic templates.
7. Build company, manufacturing, quality, and responsibility pages.
8. Build the RFQ and supporting forms.
9. Add SEO, structured data, analytics, security, and accessibility.
10. Add tests.
11. Run all verification commands.
12. Fix failures.
13. Complete the documentation.
14. Report only the final implementation summary, configuration still required, and any facts or assets awaiting verification.

Do not stop after planning.

Do not skip lower visibility work such as metadata, validation, mobile navigation, errors, empty states, accessibility, documentation, or tests.

Do not replace required implementation with comments or vague TODO markers.

When a business asset or fact is unavailable, build the complete supporting system, use a clearly identified safe fallback, and record the missing input in `docs/CONTENT_REQUIREMENTS.md`.
```