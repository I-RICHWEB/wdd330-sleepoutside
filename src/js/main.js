// main.js
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const listElement = document.querySelector("#home-products"); // Adjust selector to match your HTML

const productList = new ProductList("tents", dataSource, listElement);
productList.init();
