import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, "./src/assets/"),
      hooks: path.resolve(__dirname, "./src/hooks/"),
      types: path.resolve(__dirname, "./src/types/"),
      components: path.resolve(__dirname, "./src/components/"),
      utils: path.resolve(__dirname, "./src/utils/"),
    },
  },
});
