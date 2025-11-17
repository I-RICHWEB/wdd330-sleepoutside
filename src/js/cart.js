import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

/* ******************************************
 ** Calling the loadHeaderFooter function to
 ** dynamically load the header and footer.
 ** *************************************** */
loadHeaderFooter();

// Initial render + attach handlers + run superscription
const cart = new ShoppingCart();
cart.init();
cart.attachRemoveHandler();
