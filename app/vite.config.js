import { defineConfig } from "vite";
export default defineConfig({
  // GitHub Pages expects an index.html in the root directory
  // so just run npm build before pushing to GitHub and this will rebuild our assets to the root
  build: {
    outDir: "..",
    rollupOptions: {
      input: {
        main: "index.html",
        page1: "./src/comic-generator.html",
        page2: "./src/favorites.html",
      },
    },
  },
  // needed for github pages just put the repo name here
  base: "/the-daily-doodle/",
});
