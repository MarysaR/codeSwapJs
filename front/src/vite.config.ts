import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  resolve: {
    alias: {
      "@logic": path.resolve(__dirname, "../logic/src"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
  },
  plugins: [vue()],
});
