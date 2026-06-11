import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const config = defineConfig({
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackRouter({ autoCodeSplitting: true, target: "react" }),
    viteReact(),
  ],
  resolve: { tsconfigPaths: true },
  server: {
    host: "127.0.0.1",
    port: Number(process.env.PORT) || 3000,
    proxy: {
      "/api/rpc": {
        changeOrigin: true,
        target: "https://local.api.poew.id",
        ws: true,
      },
    },
  },
});

export default config;
