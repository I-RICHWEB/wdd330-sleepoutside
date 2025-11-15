// main.js
<<<<<<< Updated upstream
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

const dataSource = new ProductData('tents');
const listElement = document.querySelector('.product-list'); // Adjust selector to match your HTML
=======
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

// Load header and footer FIRST (this will also call superScript internally)
loadHeaderFooter();

const dataSource = new ProductData("tents");
const listElement = document.querySelector("#home-products"); 
>>>>>>> Stashed changes

const productList = new ProductList('tents', dataSource, listElement);
productList.init();

<<<<<<< Updated upstream
=======
// ❌ DO NOT call superScript() manually here anymore
>>>>>>> Stashed changes
