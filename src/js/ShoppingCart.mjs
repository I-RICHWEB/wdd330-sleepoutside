import { getLocalStorage, cartTotal } from "./utils.mjs";

// Array of objects { key: string, item: object }
const storageItems = [];

/**
 * Render cart contents from localStorage.
 * Assumes each cart item is stored under its own localStorage key and
 * that getLocalStorage(key) returns a parsed object with a Name property.
 */
function renderCartContents() {
  storageItems.length = 0;

  for (let i = 0; i < localStorage.length; i++) {
    const storageKey = localStorage.key(i);
    const cartItem = getLocalStorage(storageKey);

    if (cartItem && cartItem.Name) {
      storageItems.push({ key: storageKey, item: cartItem });
    }
  }

  const htmlItems = storageItems.map(({ key, item }) =>
    cartItemTemplate(key, item)
  );

  const list = document.querySelector(".product-list");
  if (list) {
    list.innerHTML = htmlItems.join("");
  }

  cartTotal(storageItems);
  updateCartBadge();
}

/**
 * Increase quantity by 1, up to max stock if defined
 */
function increaseQuantity(key) {
  const item = getLocalStorage(key);
  if (!item) return;

  const maxStock = item.Stock ?? item.inStock ?? item.inventory ?? null;
  if (maxStock && (item.quantity || 1) >= maxStock) {
    alert(`Maximum stock reached: ${maxStock}`);
    return;
  }

  item.quantity = (item.quantity || 1) + 1;
  localStorage.setItem(key, JSON.stringify(item));
  renderCartContents();
}

/**
 * Decrease quantity by 1, never below 1
 */
function decreaseQuantity(key) {
  const item = getLocalStorage(key);
  if (!item) return;

  item.quantity = (item.quantity || 1) - 1;
  if (item.quantity < 1) item.quantity = 1;

  localStorage.setItem(key, JSON.stringify(item));
  renderCartContents();
}

/**
 * Update cart badge in header
 */
function updateCartBadge() {
  const badge = document.querySelector(".cart-count");
  if (!badge) return;

  let totalQty = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const item = getLocalStorage(key);
    if (item && item.quantity) totalQty += item.quantity;
  }

  badge.textContent = totalQty;
}

/**
 * Template for a single cart item with quantity controls
 */
function cartItemTemplate(key, item) {
  const quantity = item.quantity ?? 1;
  const totalPrice = (item.FinalPrice * quantity).toFixed(2);

  return `<li class="cart-card divider" data-key="${key}">
    <a href="#" class="cart-card__image">
      <img src="${item.Images?.PrimaryMedium}" alt="${item.Name}" />
    </a>

    <a href="#"><h2 class="card__name">${item.Name}</h2></a>
    <p class="cart-card__color">${item.Colors?.[0]?.ColorName ?? ""}</p>

    <div class="quantity-container">
      <button class="qty-btn decrease" data-key="${key}">−</button>
      <span class="cart-card__quantity">${quantity}</span>
      <button class="qty-btn increase" data-key="${key}">+</button>
    </div>

    <p class="cart-card__price">$${totalPrice}</p>

    <div class="remove-btn" data-key="${key}" aria-label="Remove ${item.Name}">
      <img class="bin-icon" src="../images/delete-bin.png" alt="delete icon">
    </div>
  </li>`;
}

export default class ShoppingCart {
  /**
   * Attach delegated listener to handle remove, increase, decrease
   */
  attachRemoveHandler() {
    const list = document.querySelector(".product-list");
    if (!list) return;

    list.addEventListener("click", (e) => {
      const key = e.target.closest("[data-key]")?.dataset?.key;
      if (!key) return;

      // Remove
      if (e.target.closest(".remove-btn")) {
        localStorage.removeItem(key);
        renderCartContents();
        return;
      }

      // Increase
      if (e.target.closest(".increase")) {
        increaseQuantity(key);
        return;
      }

      // Decrease
      if (e.target.closest(".decrease")) {
        decreaseQuantity(key);
        return;
      }
    });
  }

  init() {
    renderCartContents();
  }
}
