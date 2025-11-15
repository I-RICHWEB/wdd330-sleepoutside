import { getParam, superScript } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./productDetails.mjs";

const dataSource = new ProductData("tents");

const productId = getParam("product");

const productDetails = new ProductDetails(productId, dataSource);
productDetails.init();

/* ******************************************
 ** Calling the superscription of the cart
 ** items function.
 ** *************************************** */
superScript();

// new new new

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
