import { alertMessage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    productDetailsDiscount(this.product);

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const key = `${this.product.Id}`;
    const existing = JSON.parse(localStorage.getItem(key));

    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;

      // Optional: prevent exceeding stock
      const maxStock = existing.Stock ?? existing.inStock ?? existing.inventory ?? null;
      if (maxStock && existing.quantity > maxStock) {
        alertMessage(`Only ${maxStock} in stock!`, "warning");
        existing.quantity = maxStock;
      }

      localStorage.setItem(key, JSON.stringify(existing));
      alertMessage("Quantity updated in cart!", "success");
    } else {
      const itemToSave = { ...this.product, quantity: 1 };
      localStorage.setItem(key, JSON.stringify(itemToSave));
      alertMessage("Product added to cart!", "success");
    }

    // Trigger cart update
    document.dispatchEvent(new CustomEvent("cartUpdated"));

    // Update cart badge
    updateCartBadge();
  }

  renderProductDetails() {
    const hasDiscount =
      this.product.SuggestedRetailPrice &&
      Number(this.product.FinalPrice) < Number(this.product.SuggestedRetailPrice);

    const formatPrice = (p) => {
      const n = Number(p);
      return Number.isFinite(n) ? n.toFixed(2) : p;
    };

    document.querySelector("#productName").textContent = this.product.Name;
    document.querySelector("#productNameWithoutBrand").textContent =
      this.product.NameWithoutBrand;
    document.querySelector("#productImage").src =
      this.product.Images?.PrimaryLarge || "/images/placeholder.jpg";
    document.querySelector("#productImage").alt = this.product.Name;
    document.querySelector("#productFinalPrice").innerHTML = `
        ${hasDiscount ? `<span class="original-price">$${formatPrice(this.product.SuggestedRetailPrice)}</span>` : ""}
        $${formatPrice(this.product.FinalPrice)}
      `;
    document.querySelector("#productColorName").textContent =
      this.product.Colors[0]?.ColorName || "";
    document.querySelector("#productDescriptionHtmlSimple").innerHTML =
      this.product.DescriptionHtmlSimple;
    document.querySelector("#addToCart").dataset.id = this.product.Id;
  }
}

// Discount badge
function productDetailsDiscount(product) {
  const hasDiscount =
    product.SuggestedRetailPrice &&
    Number(product.FinalPrice) < Number(product.SuggestedRetailPrice);

  const discountPercent = hasDiscount
    ? Math.round(
        ((Number(product.SuggestedRetailPrice) - Number(product.FinalPrice)) /
          Number(product.SuggestedRetailPrice)) *
          100
      )
    : 0;

  document.querySelector(".sale-dis-badge").innerHTML = hasDiscount
    ? `<span class="sale-badge">-${discountPercent}%</span>`
    : "";
}

// Update cart badge in header
function updateCartBadge() {
  const badge = document.querySelector(".cart-count");
  if (!badge) return;

  let totalQty = 0;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const item = JSON.parse(localStorage.getItem(key));

    if (item && item.quantity) totalQty += item.quantity;
  }

  badge.textContent = totalQty;
}
