import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "public", // This is important for Vercel
  },
});
