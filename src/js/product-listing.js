// product-listing.js (previously shown as main.js)
// Ensure this file path matches the <script> tag in your HTML

import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam, toSentenceCase } from "./utils.mjs";

/* ******************************************
 ** Calling the loadHeaderFooter function to
 ** dynamically load the header and footer.
 *******************************************/
loadHeaderFooter();

/* ******************************************
 ** The following lines of code are responsible
 ** for dynamically rendering the products to
 ** the product listing page.
 *******************************************/
const dataSource = new ProductData();
const listElement = document.querySelector("#home-products"); // Adjust selector to match your HTML
const category = getParam("category");
const productList = new ProductList(category, dataSource, listElement);
await productList.init(); // initialize and fetch data

document.getElementById("category").textContent = toSentenceCase(category);

/* ******************************************
 ** The following lines of code are responsible
 ** for alternating between list and grid view
 ** of products.
 *******************************************/
const gridBtn = document.getElementById("gridViewBtn");
const listBtn = document.getElementById("listViewBtn");
const productsContainer = document.getElementById("home-products");

// DEFAULT LAYOUT = grid
productsContainer.classList.add("product-grid");

gridBtn.addEventListener("click", () => {
  productsContainer.classList.add("product-grid");
  productsContainer.classList.remove("product-list");
  gridBtn.classList.add("active");
  listBtn.classList.remove("active");
});

listBtn.addEventListener("click", () => {
  productsContainer.classList.add("product-list");
  productsContainer.classList.remove("product-grid");
  listBtn.classList.add("active");
  gridBtn.classList.remove("active");
});

/* ******************************************
 ** Sort control wiring
 *******************************************/
const sortSelect = document.getElementById("sortSelect");
if (sortSelect) {
  sortSelect.addEventListener("change", (e) => {
    productList.setSort(e.target.value);
  });
}
