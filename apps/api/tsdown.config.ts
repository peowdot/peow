import { defineConfig } from "tsdown";

export default defineConfig({
  deps: {
    alwaysBundle: [/^@repo\//u],
  },
  entry: "src/main.ts",
  format: "esm",
});
