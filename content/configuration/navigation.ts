import { productFamilies } from "@/content/fallback/products";
import { capabilitiesByGroup } from "@/content/fallback/capabilities";
import { capabilityGroupLabels, materialGroupLabels } from "@/content/types";
import { industries } from "@/content/fallback/industries";
import { markets } from "@/content/fallback/markets";
import { materials } from "@/content/fallback/materials";

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

export interface NavItem {
  label: string;
  href: string;
  /** When present the item opens a mega menu instead of navigating directly. */
  columns?: NavColumn[];
  /** Short line shown at the head of the mega menu panel. */
  intro?: string;
}

/** Primary navigation. Order matches the brief. */
export const primaryNavigation: NavItem[] = [
  {
    label: "Products",
    href: "/products",
    intro:
      "Thirteen product families, each with construction options, indicative weights and truthful capability status.",
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
      "Thirty capabilities across development, materials, manufacturing, decoration, finishing and assurance.",
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
    columns: [
      {
        title: "How production runs",
        links: [
          {
            label: "Manufacturing process",
            href: "/manufacturing-process",
            description: "Twenty one stages from brief to reorder, with responsibilities on both sides.",
          },
          {
            label: "Quality",
            href: "/quality",
            description: "Checkpoints from incoming material through to the packing audit.",
          },
          {
            label: "The factory",
            href: "/factory",
            description: "The working environment your product would be made in.",
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
            description: "What we publish, what we withhold and why.",
          },
          {
            label: "Sustainability",
            href: "/sustainability",
            description: "Approach described without invented metrics.",
          },
          {
            label: "Traceability",
            href: "/traceability",
            description: "Where materials and production come from.",
          },
          {
            label: "Certifications",
            href: "/certifications",
            description: "A verifiable certificate registry rather than a wall of logos.",
          },
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
          { label: "About Textileways", href: "/about" },
          { label: "Why Textileways", href: "/why-textileways" },
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
          {
            label: "Case studies",
            href: "/case-studies",
            description: "How a project runs, from the buyer's side.",
          },
          {
            label: "Frequently asked questions",
            href: "/faq",
            description: "Answers without commercial promises.",
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
      { label: "Certifications", href: "/certifications" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Why Textileways", href: "/why-textileways" },
      { label: "Industries", href: "/industries" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Insights", href: "/insights" },
      { label: "Case studies", href: "/case-studies" },
      { label: "Frequently asked questions", href: "/faq" },
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
