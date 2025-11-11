import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  // 👇 Add this line for GitHub Pages (MUST match your repo name)
  base: "/wdd330-sleepoutside/",

  // Root folder where your main HTML files live
  root: "src/",

  build: {
    outDir: "../dist",

    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
      },
    },
  },
});
