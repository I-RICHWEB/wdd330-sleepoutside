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

/* ******************************************
 ** This function will render the header and
 ** footer of the different pages dynamically
 ** from a single source file each.
 ** *************************************** */
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

/* ******************************************
 ** This function will be use to fetch the
 ** header and foooter file content using
 ** the path that will be passed in.
 ** *************************************** */
export async function loadTemplate(path) {
  const data = (await fetch(path)).text();
  return data;
}

/* ******************************************
 ** This function will load the header and
 ** footer files and convert it to text
 ** and return the content as a string.
 ** *************************************** */
export async function loadHeaderFooter() {
  const header = await loadTemplate("../partials/header.html");
  const footer = await loadTemplate("../partials/footer.html");
  const headerPlaceHolder = document.getElementById("site-header");
  const footerPlaceHolder = document.getElementById("site-footer");

  renderWithTemplate(header, headerPlaceHolder);
  renderWithTemplate(footer, footerPlaceHolder);

  /* ******************************************
   ** Calling the superscription of the cart
   ** items function to show the numbers of
   ** items in the cart.
   ** *************************************** */
  superScript();
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
 ** The following function is use to change the
 ** words to Sentence case.
 ** *************************************** */
export function toSentenceCase(data) {
  if (!data || data.length === 0) {
    return "";
  }
  const allLowCase = data.toLowerCase();
  const sentenceCase = allLowCase.charAt(0).toUpperCase() + allLowCase.slice(1);
  return sentenceCase;
}
