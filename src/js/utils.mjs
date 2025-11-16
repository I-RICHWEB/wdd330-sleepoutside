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

export function superScript() {
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
}



// render a single template
export function renderWithTemplate(template, parentElement, data = {}, callback) {
  parentElement.innerHTML = template;
  if (callback) callback();
}

// fetch HTML template as string
export async function loadTemplate(path) {
  const response = await fetch(path);
  const html = await response.text();
  return html;
}

// load header and footer dynamically
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");

  const headerEl = document.getElementById("main-header");
  const footerEl = document.getElementById("main-footer");

  renderWithTemplate(headerTemplate, headerEl, {}, () => {
    superScript(); // restore cart superscript if needed
  });
  renderWithTemplate(footerTemplate, footerEl);
}

