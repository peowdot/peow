import { defineConfig } from "drizzle-kit";

export default defineConfig({
  casing: "snake_case",
  dbCredentials: {
    // oxlint-disable-next-line typescript/no-non-null-assertion
    url: process.env.DATABASE_URL!,
  },
  dialect: "postgresql",
  out: "./drizzle",
  schema: "./src/schema/index.ts",
  schemaFilter: ["public", "auth"],
  strict: true,
  verbose: true,
});
