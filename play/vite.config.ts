import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import DefineOptions from "unplugin-vue-define-options/vite";
import { visualizer } from "rollup-plugin-visualizer";
import vueDevtools from "vite-plugin-vue-devtools";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), DefineOptions(), visualizer({ open: true }), vueDevtools()],
});
