import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  resolve: {
    alias: {
      "@": "/src", // Ensure this correctly points to the src directory
    },
  },
  plugins: [react()],
});
