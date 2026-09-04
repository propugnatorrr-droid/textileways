/**
 * Minimal schema definition helpers.
 *
 * These mirror the signatures of `defineType`, `defineField` and `defineArrayMember`
 * from the `sanity` package. They exist so the schema files in this directory can
 * be written in the exact shape Sanity Studio expects without adding the full
 * Studio dependency to a website that does not embed one.
 *
 * To wire these schemas into a real Studio:
 *
 *   1. `npm install sanity @sanity/vision`
 *   2. Change the import at the top of each schema file from
 *      `from "../lib/define"` to `from "sanity"`
 *   3. Register `schemaTypes` from `sanity/schemas/index.ts` in `sanity.config.ts`
 *
 * Nothing else has to change: the field definitions are already in Sanity's
 * format. This is documented in docs/DEPLOYMENT.md.
 */

export interface FieldDefinition {
  /**
   * Studio specific options such as `rows`, `layout` and `filterField` vary by
   * field type, so unknown keys are permitted rather than enumerated. Sanity
   * itself validates them at Studio start up.
   */
  [key: string]: unknown;
  name: string;
  title?: string;
  type: string;
  description?: string;
  options?: Record<string, unknown>;
  validation?: unknown;
  of?: unknown[];
  fields?: FieldDefinition[];
  to?: { type: string }[];
  initialValue?: unknown;
  readOnly?: boolean;
  hidden?: unknown;
  group?: string;
  fieldset?: string;
  rows?: number;
}

export interface TypeDefinition {
  [key: string]: unknown;
  name: string;
  title?: string;
  type: string;
  description?: string;
  fields?: FieldDefinition[];
  of?: unknown[];
  options?: Record<string, unknown>;
  groups?: { name: string; title: string; default?: boolean }[];
  preview?: Record<string, unknown>;
  orderings?: unknown[];
  validation?: unknown;
  initialValue?: unknown;
}

export function defineType(definition: TypeDefinition): TypeDefinition {
  return definition;
}

export function defineField(definition: FieldDefinition): FieldDefinition {
  return definition;
}

export function defineArrayMember<T extends Record<string, unknown>>(definition: T): T {
  return definition;
}

/**
 * Placeholder for Sanity's validation builder.
 *
 * In a real Studio, `validation: (Rule) => Rule.required()` receives the Studio's
 * rule object. Here the callback is stored unevaluated, which is exactly what
 * Sanity does with it, so the schemas transfer without edits.
 */
export type ValidationRule = {
  required: () => ValidationRule;
  min: (value: number) => ValidationRule;
  max: (value: number) => ValidationRule;
  email: () => ValidationRule;
  uri: (options?: Record<string, unknown>) => ValidationRule;
  warning: (message?: string) => ValidationRule;
  error: (message?: string) => ValidationRule;
  custom: (fn: (value: unknown) => true | string) => ValidationRule;
};
