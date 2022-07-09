import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [vue()],
  server: {
    hmr: {
      // removes the protocol and replaces it with the port we're connecting to
      host: process.env.GITPOD_WORKSPACE_URL?.replace("https://", "3000-"),
      protocol: "wss",
      clientPort: 443,
    },
  },
});
