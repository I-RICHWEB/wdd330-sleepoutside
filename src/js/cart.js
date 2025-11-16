import { getLocalStorage, superScript, cartTotal } from "./utils.mjs";

// Array of objects { key: string, item: object }
const storageItems = [];

/**
 * Render cart contents from localStorage.
 * Assumes each cart item is stored under its own localStorage key and
 * that getLocalStorage(key) returns a parsed object with a Name property.
 */
function renderCartContents() {
  // clear previous contents so re-render doesn't duplicate
  storageItems.length = 0;

  // collect only keys that represent cart items
  for (let i = 0; i < localStorage.length; i++) {
    const storageKey = localStorage.key(i);
    const cartItem = getLocalStorage(storageKey);

    // basic validation: only include plausible cart objects (adjust if your shape differs)
    if (cartItem && cartItem.Name) {
      storageItems.push({ key: storageKey, item: cartItem });
    }
  }

  const htmlItems = storageItems.map(({ key, item }) =>
    cartItemTemplate(key, item),
  );
  const list = document.querySelector(".product-list");
  if (list) {
    list.innerHTML = htmlItems.join("");
  }

  // This is the function call to the cart total display
  cartTotal(storageItems);
}

/**
 * Template for a single cart item. Remove button includes a data-key attribute for removal.
 */
function cartItemTemplate(key, item) {
  return `<li class="cart-card divider" data-key="${escapeHtml(key)}">
  <a href="#" class="cart-card__image">
    <img
      src="${escapeHtml(item.Image)}"
      alt="${escapeHtml(item.Name)}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${escapeHtml(item.Name)}</h2>
  </a>
  <p class="cart-card__color">${escapeHtml(item.Colors?.[0]?.ColorName ?? "")}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${escapeHtml(item.FinalPrice)}</p>
  <div class="remove-btn" data-key="${escapeHtml(key)}" aria-label="Remove ${escapeHtml(item.Name)}">
  <img class="bin-icon" src="../images/delete-bin.png" alt="delete icon"></div>
</li>`;
}

/**
 * Delegated event listener attached to the product list to handle remove button clicks.
 * Removes the corresponding localStorage key and re-renders the list.
 */
function attachRemoveHandler() {
  const list = document.querySelector(".product-list");
  if (!list) return;

  list.addEventListener("click", (e) => {
    const btn = e.target.closest(".remove-btn");
    if (!btn) return;

    const key = btn.dataset.key;
    if (!key) return;

    // Optional: confirmation
    // if (!confirm("Remove this item from the cart?")) return;
    localStorage.removeItem(key);
    renderCartContents();
  });
}

/**
 * Small helper to escape strings injected into HTML to reduce XSS risk.
 */
function escapeHtml(str) {
  if (str === undefined || str === null) return "";
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Initial render + attach handlers + run superscription
renderCartContents();
attachRemoveHandler();
superScript();
