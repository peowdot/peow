import { defineConfig } from "drizzle-kit";

import { env } from "#env";

export default defineConfig({
  casing: "snake_case",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  dialect: "postgresql",
  out: "./drizzle",
  schema: "./src/schema/index.ts",
  schemaFilter: ["public", "auth"],
  strict: true,
  verbose: true,
});
