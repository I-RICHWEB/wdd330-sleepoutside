import { getLocalStorage, superScript } from "./utils.mjs";

// The render cart is broken and does not render cart items
// The .map method is an array or object method that is suppose to illiterate through
// an array object.
const storageItem = [];

function renderCartContents() {
  // I used a smiple for loop to get all the localStorage items and add them
  // to an object.
  for (let i = 0; i < localStorage.length; i++) {
    const storageKey = localStorage.key(i);
    const cartItems = getLocalStorage(storageKey);
    storageItem.push(cartItems);
  }

  const htmlItems = storageItem.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();

/* ******************************************
 ** Calling the superscription of the cart
 ** items function.
 ** *************************************** */
superScript();
