import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");

const productId = getParam("product");

const productDetails = new ProductDetails(productId, dataSource);
productDetails.init();

// function addProductToCart(product) {
// To fix cart only allowing a single tent item to be store
// because the "key" is always the same and not uniques as it require
// a unique key at all times. I am going to set the products id as the key.
// setLocalStorage(`${product.Id}`, product);
// }
// add to cart button event handler
// async function addToCartHandler(e) {
// const product = await dataSource.findProductById(e.target.dataset.id);
// addProductToCart(product);
// }

// add listener to Add to Cart button
// document
// .getElementById("addToCart")
// .addEventListener("click", addToCartHandler);
