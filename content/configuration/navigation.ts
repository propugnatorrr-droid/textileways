import { productFamilies } from "@/content/fallback/products";
import { capabilitiesByGroup } from "@/content/fallback/capabilities";
import { capabilityGroupLabels, materialGroupLabels } from "@/content/types";
import { industries } from "@/content/fallback/industries";
import { markets } from "@/content/fallback/markets";
import { materials } from "@/content/fallback/materials";
import { publicCertificates } from "@/content/fallback/certificates";
import { publishedCaseStudies } from "@/content/fallback/case-studies";

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavColumn {
  title: string;
  href?: string;
  links: NavLink[];
}

export interface NavFeatured {
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
}

export interface NavItem {
  label: string;
  href: string;
  /** When present the item opens a mega menu instead of navigating directly. */
  columns?: NavColumn[];
  /** Short line shown at the head of the mega menu panel. */
  intro?: string;
  /** A single highlighted card shown alongside the columns, for the widest menus. */
  featured?: NavFeatured;
}
const hasPublicCertificates = publicCertificates().length > 0;
const hasPublishedCaseStudies = publishedCaseStudies().length > 0;

/** Primary navigation. Order matches the brief. */
export const primaryNavigation: NavItem[] = [
  {
    label: "Products",
    href: "/products",
    intro:
      "Explore thirteen product families with practical guidance on construction, materials, decoration and order quantities.",
    featured: {
      title: "Not sure where to start?",
      description:
        "Most buyers start with a small validation order before scaling. Answer a few questions and see where your project fits.",
      href: "/quick-quote",
      ctaLabel: "Check project readiness",
    },
    columns: [
      {
        title: "Apparel",
        href: "/products",
        links: productFamilies
          .filter((family) =>
            [
              "everyday-apparel",
              "streetwear",
              "sportswear-and-activewear",
              "outdoor-and-performance",
              "denim-and-woven-products",
            ].includes(family.slug),
          )
          .map((family) => ({
            label: family.name,
            href: `/products/${family.slug}`,
            description: family.summary,
          })),
      },
      {
        title: "Specialist apparel",
        links: productFamilies
          .filter((family) =>
            [
              "workwear-and-uniforms",
              "underwear-sleepwear-loungewear",
              "children-and-baby",
              "swim-and-resort",
              "modest-and-cultural-apparel",
            ].includes(family.slug),
          )
          .map((family) => ({
            label: family.name,
            href: `/products/${family.slug}`,
            description: family.summary,
          })),
      },
      {
        title: "Beyond apparel",
        links: [
          ...productFamilies
            .filter((family) =>
              ["specialist-sports-products", "home-textiles", "textile-accessories"].includes(
                family.slug,
              ),
            )
            .map((family) => ({
              label: family.name,
              href: `/products/${family.slug}`,
              description: family.summary,
            })),
          { label: "All product families", href: "/products" },
          { label: "Industries served", href: "/industries" },
        ],
      },
    ],
  },
  {
    label: "Capabilities",
    href: "/capabilities",
    intro:
      "Product development, sourcing, sampling, manufacturing, decoration, finishing, quality control and export preparation.",
    featured: {
      title: "New to manufacturing overseas?",
      description:
        "See how a project actually moves from first brief through sampling to delivery, stage by stage.",
      href: "/manufacturing-process",
      ctaLabel: "See the process",
    },
    columns: [
      ...capabilitiesByGroup()
        .slice(0, 3)
        .map((bucket) => ({
          title: capabilityGroupLabels[bucket.group],
          links: bucket.items.slice(0, 6).map((item) => ({
            label: item.name,
            href: `/capabilities/${item.slug}`,
          })),
        })),
      {
        title: "Decoration and finishing",
        links: [
          { label: "Screen printing", href: "/capabilities/screen-printing" },
          { label: "DTG printing", href: "/capabilities/dtg-printing" },
          { label: "DTF printing", href: "/capabilities/dtf-printing" },
          { label: "Sublimation", href: "/capabilities/sublimation" },
          { label: "Embroidery", href: "/capabilities/embroidery" },
          { label: "All capabilities", href: "/capabilities" },
        ],
      },
    ],
  },
  {
    label: "Manufacturing",
    href: "/manufacturing-process",
    featured: {
      title: "Ready to talk specifics?",
      description:
        "Share your product, target quantity and market for a technical and commercial review.",
      href: "/request-a-quote",
      ctaLabel: "Request a Quote",
    },
    columns: [
      {
        title: "How production runs",
        links: [
          {
            label: "Manufacturing process",
            href: "/manufacturing-process",
            description: "Twenty-one stages from the first brief through sampling, production, delivery and reorder.",
          },
          {
            label: "Quality",
            href: "/quality",
            description: "Checkpoints from incoming material through to the packing audit.",
          },
          {
            label: "The factory",
            href: "/factory",
            description: "Sampling, cutting, sewing, decoration, inspection and packing.",
          },
        ],
      },
      {
        title: "Materials",
        href: "/materials",
        links: [
          { label: "All materials", href: "/materials" },
          ...Object.entries(materialGroupLabels)
            .slice(0, 4)
            .map(([group, label]) => ({
              label,
              href: `/materials?group=${group}`,
            })),
        ],
      },
      {
        title: "Markets",
        href: "/markets",
        links: [
          { label: "All markets", href: "/markets" },
          ...markets.map((market) => ({
            label: market.name,
            href: `/markets/${market.slug}`,
          })),
        ],
      },
    ],
  },
  {
    label: "Responsibility",
    href: "/responsibility",
    columns: [
      {
        title: "Responsibility",
        links: [
          {
            label: "Our position",
            href: "/responsibility",
            description: "Responsible sourcing, buyer due diligence and evidence-led claims.",
          },
          {
            label: "Sustainability",
            href: "/sustainability",
            description: "Material, packaging, waste and shipping choices available by order.",
          },
          {
            label: "Traceability",
            href: "/traceability",
            description: "Where materials and production come from.",
          },
                   ...(hasPublicCertificates
            ? [
                {
                  label: "Certifications",
                  href: "/certifications",
                  description: "Current, verifiable certification records.",
                },
              ]
            : []),
        ],
      },
    ],
  },
  {
    label: "Company",
    href: "/about",
    columns: [
      {
        title: "Company",
        links: [
          { label: "About TextileWays", href: "/about" },
          { label: "Why TextileWays", href: "/why-textileways" },
          { label: "The factory", href: "/factory" },
          { label: "Contact", href: "/contact" },
        ],
      },
      {
        title: "Buyers",
        links: [
          { label: "Industries", href: "/industries" },
          ...industries.slice(0, 5).map((industry) => ({
            label: industry.name,
            href: `/industries/${industry.slug}`,
          })),
        ],
      },
    ],
  },
  {
    label: "Resources",
    href: "/insights",
    columns: [
      {
        title: "Resources",
        links: [
          {
            label: "Insights",
            href: "/insights",
            description: "How manufacturing decisions actually work.",
          },
                   ...(hasPublishedCaseStudies
            ? [
                {
                  label: "Case studies",
                  href: "/case-studies",
                  description: "Documented manufacturing projects and outcomes.",
                },
              ]
            : []),
          {
            label: "Frequently asked questions",
            href: "/faq",
            description: "Clear answers about quantities, sampling, pricing, lead time and shipping.",
          },
          {
            label: "Free project readiness check",
            href: "/quick-quote",
            description: "See where your project fits and send a quick estimate request.",
          },
          {
            label: "Request a sample",
            href: "/request-a-sample",
            description: "Start with a physical sample rather than a specification.",
          },
        ],
      },
    ],
  },
];

/** Footer link groups. */
export const footerNavigation: NavColumn[] = [
  {
    title: "Products",
    links: productFamilies.slice(0, 7).map((family) => ({
      label: family.name,
      href: `/products/${family.slug}`,
    })),
  },
  {
    title: "Capabilities",
    links: [
      { label: "All capabilities", href: "/capabilities" },
      { label: "Sample development", href: "/capabilities/sample-development" },
      { label: "Cut and sew manufacturing", href: "/capabilities/cut-and-sew-manufacturing" },
      { label: "Screen printing", href: "/capabilities/screen-printing" },
      { label: "Embroidery", href: "/capabilities/embroidery" },
      { label: "Private labelling", href: "/capabilities/private-labelling" },
      { label: "Logistics and export", href: "/capabilities/logistics-and-export" },
    ],
  },
  {
    title: "Manufacturing",
    links: [
      { label: "Manufacturing process", href: "/manufacturing-process" },
      { label: "Quality", href: "/quality" },
      { label: "The factory", href: "/factory" },
      { label: "Materials", href: "/materials" },
      { label: "Markets", href: "/markets" },
    ],
  },
  {
    title: "Responsibility",
    links: [
      { label: "Our position", href: "/responsibility" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Traceability", href: "/traceability" },
      ...(hasPublicCertificates
        ? [{ label: "Certifications", href: "/certifications" }]
        : []),
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Why TextileWays", href: "/why-textileways" },
      { label: "Industries", href: "/industries" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Insights", href: "/insights" },
      ...(hasPublishedCaseStudies
        ? [{ label: "Case studies", href: "/case-studies" }]
        : []),
      { label: "Frequently asked questions", href: "/faq" },
      { label: "Free project readiness check", href: "/quick-quote" },
      { label: "Request a quote", href: "/request-a-quote" },
      { label: "Request a sample", href: "/request-a-sample" },
    ],
  },
];

export const legalNavigation: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookie policy", href: "/cookie-policy" },
];

/** Every static route, used by the sitemap and by route coverage tests. */
export const staticRoutes: string[] = [
  "/",
  "/about",
  "/why-textileways",
  "/factory",
  "/quality",
  "/certifications",
  "/sustainability",
  "/responsibility",
  "/traceability",
  "/manufacturing-process",
  "/markets",
  "/industries",
  "/products",
  "/capabilities",
  "/materials",
  "/case-studies",
  "/insights",
  "/faq",
  "/contact",
  "/quick-quote",
  "/request-a-quote",
  "/request-a-sample",
  "/privacy",
  "/terms",
  "/cookie-policy",
];

/** Convenience export used by tests to assert every material group is navigable. */
export const materialGroups = Object.keys(materialGroupLabels);

/** Convenience export used by the materials hub. */
export const materialCount = materials.length;
