<<<<<<< HEAD
// main.js
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

const dataSource = new ProductData('tents');
const listElement = document.querySelector('.product-list'); // Adjust selector to match your HTML

const productList = new ProductList('tents', dataSource, listElement);
productList.init();
=======
// Importing all necessary modules for the supscription
const cartLink = document.querySelector(".cart");

const storageCount = localStorage.length;
const supElement = document.createElement("sup");
supElement.setAttribute("class", "cart-sup");

supElement.innerHTML = storageCount;

if (storageCount > 0) {
  cartLink.appendChild(supElement);
}
>>>>>>> 29eb385b7f0cc6c9a0859fdb1697e05c0cffbb4b
