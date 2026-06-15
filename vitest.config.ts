import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      reportOnFailure: true,
      reporter: ["text", "json-summary", "json"],
    },
    projects: ["packages/*"],
  },
});
