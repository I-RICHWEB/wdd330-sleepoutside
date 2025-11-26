import { loadHeaderFooter, cartTotal } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
// import { getFormData } from "./CheckoutProcess.mjs";
// import ShoppingCart from "./ShoppingCart.mjs";

/* ******************************************
 ** Calling the loadHeaderFooter function to
 ** dynamically load the header and footer.
 ** *************************************** */
loadHeaderFooter();

/* ******************************************
 ** This is the checkout process codes.
 ** *************************************** */
const checkoutprocess = new CheckoutProcess();

/* ******************************************
 ** A call for the subtotal method of the
 ** CheckoutProcess class as page load.
 ** *************************************** */
const orderSubtotal = checkoutprocess.subTotal();
document.getElementById("subtotal").innerHTML =
  `<strong>Subtotal:</strong> $${orderSubtotal}`;

/* ******************************************
 ** Adding eventListener to add the order summary
 ** when the user typy in their zip code.
 ** *************************************** */
document.getElementById("zip").addEventListener("change", (e) => {
  if (!e.target.value == "") {
    orderSum();
  } else {
    document.getElementById("tax").textContent = "Tax:";
    document.getElementById("shipping").textContent = "Shipping Estimate:";
    document.getElementById("order-total").textContent = "Order Total:";
  }
});

/* ******************************************
 ** This function will calculate and display
 ** the order summary when it is called.
 ** *************************************** */
function orderSum() {
  // sales tax
  const tax = checkoutprocess.setTax();
  document.getElementById("tax").innerHTML = `<strong>Tax:</strong> $${tax}`;

  // shipping fees.
  const shipping = checkoutprocess.shipFee();
  document.getElementById("shipping").innerHTML =
    `<strong>Shipping:</strong> $${shipping}`;

  // Order Total.
  const orderTotal = checkoutprocess.orderTotal();
  document.getElementById("order-total").innerHTML =
    `<strong>Order Total:</strong> $${orderTotal}`;
}

const formElement = document.getElementById("checkout-form");
formElement.addEventListener("submit", async function (event) {
  event.preventDefault();

  const pro = await checkoutprocess.checkout(event.target);
  console.log(`All is well ${pro}`);
});
