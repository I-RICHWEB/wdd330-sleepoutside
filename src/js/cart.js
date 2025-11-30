// import { loadHeaderFooter } from "./utils.mjs";
// import ShoppingCart from "./ShoppingCart.mjs";

/* ******************************************
 ** Calling the loadHeaderFooter function to
 ** dynamically load the header and footer.
 ** *************************************** */
// loadHeaderFooter();

// Initial render + attach handlers + run superscription
// const cart = new ShoppingCart();
// cart.init();
// cart.attachRemoveHandler();

import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

/* ******************************************
 ** Dynamically load header and footer
 *******************************************/
loadHeaderFooter();

/* ******************************************
 ** Initialize ShoppingCart
 *******************************************/
const cart = new ShoppingCart();
cart.init();
cart.attachRemoveHandler();

/* ******************************************
 ** Listen for products added from ProductDetails
 *******************************************/
document.addEventListener("cartUpdated", () => {
  cart.init(); // re-render cart contents
});
