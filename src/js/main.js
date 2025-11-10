// main.js
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const listElement = document.querySelector("#home-products"); // Adjust selector to match your HTML

const productList = new ProductList("tents", dataSource, listElement);
productList.init();

/* ******************************************
 ** The following lines of codes is use to
 ** display a superscription on the cart icon.
 ** It displays the number of items in the cart.
 ** *************************************** */
const storageItem = localStorage.length; // Getting the lenght of localStorage.
if (storageItem > 0) {
  // Checking if there is anything in the localStorage
  const parentE = document.querySelector(".cart-link");
  const sup = document.createElement("sup");
  sup.setAttribute("class", "cart-sup");
  sup.textContent = storageItem;
  parentE.prepend(sup); // Appending the superscription element to the link element that holds the cart icon.
}
