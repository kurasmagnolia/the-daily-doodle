import { defineConfig } from "vite";
import { resolve } from "path";
export default defineConfig({
  base: "/the-daily-doodle/", // Replace <REPOSITORY_NAME> with your GitHub repo name
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, "index.html"),
        generator: resolve(__dirname, "./src/comic-generator.html"),
        favorites: resolve(__dirname, "./src/favorites.html"),
      },
    },
  },
});
