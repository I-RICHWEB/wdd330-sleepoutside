// main.js
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData("tents");
const listElement = document.querySelector("#home-products"); // Adjust selector to match your HTML

const productList = new ProductList("tents", dataSource, listElement);
productList.init();

/* ******************************************
 ** Calling the loadHeaderFooter function to
 ** dynamically load the header and footer.
 ** *************************************** */
loadHeaderFooter();
superScript();

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
