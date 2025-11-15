// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
  alert("Product added to cart!");
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get URL parameter
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// render a list with a template
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  if (clear) {
    parentElement.innerHTML = "";
  }

  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

/* ******************************************
 ** The following lines of codes is use to
 ** display a superscription on the cart icon.
 ** It displays the number of items in the cart.
 ** *************************************** */
export function superScript() {
  const storageItem = localStorage.length; // Getting the lenght of localStorage.
  if (storageItem > 0) {
    // Checking if there is anything in the localStorage
    const parentE = document.querySelector(".cart-link");
    const sup = document.createElement("sup");
    sup.setAttribute("class", "cart-sup");
    sup.textContent = storageItem;
    parentE.prepend(sup); // Appending the superscription element to the link element that holds the cart icon.
  }
}

/* ******************************************
 ** The following lines of codes is use to
 ** display the total amount of the cart item/s
 ** It displays the total price of items in the cart.
 ** *************************************** */
export function cartTotal(cartItems) {
  let total = 0;

  if (cartItems.length > 0) {
    cartItems.forEach((item) => {
      total += item.item.FinalPrice;
    });
    document.querySelector(".cart-total").innerHTML =
      `<strong>Total:</strong> $${total.toFixed(2)}`;

    document.getElementById("total-container").setAttribute("class", "");
  } else {
    document.getElementById("total-container").setAttribute("class", "hide");
  }
}
