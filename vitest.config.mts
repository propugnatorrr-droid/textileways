import { defineConfig } from "vitest/config";

/**
 * Vitest configuration.
 *
 * Path aliases resolve natively from tsconfig.json, so no plugin is needed.
 * The suite runs in the node environment because everything under test is
 * framework independent logic: schemas, sanitisation, references, file rules and
 * content integrity.
 */
export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "node",
    include: ["tests/unit/**/*.test.ts", "tests/unit/**/*.test.tsx"],
    globals: false,
    reporters: ["default"],
  },
});
