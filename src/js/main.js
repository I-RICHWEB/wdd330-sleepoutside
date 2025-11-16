// main.js
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

// Load header and footer FIRST (this will also call superScript internally)
loadHeaderFooter();

const dataSource = new ProductData("tents");
const listElement = document.querySelector("#home-products"); 

const productList = new ProductList("tents", dataSource, listElement);
productList.init();

// ❌ DO NOT call superScript() manually here anymore
