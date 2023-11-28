import { defineConfig } from "vite";
import { resolve } from "path";
import DefineOptions from "unplugin-vue-define-options/vite";
import { visualizer } from "rollup-plugin-visualizer";
import vueDevtools from "vite-plugin-vue-devtools";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), DefineOptions(), visualizer({ open: true }), vueDevtools()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "src"),
      },
    ],
  },
});
