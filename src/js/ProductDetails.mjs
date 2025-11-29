// src/js/ProductDetails.mjs
import { setLocalStorage, alertMessage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Get product details
    this.product = await this.dataSource.findProductById(this.productId);

    // Render the product details
    this.renderProductDetails();

    productDetailsDiscount(this.product);

    // Add event listener to Add to Cart button
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    setLocalStorage(`${this.product.Id}`, this.product);
    alertMessage("Product added to cart!", "success");
  }

  renderProductDetails() {
    const hasDiscount =
      this.product.SuggestedRetailPrice &&
      Number(this.product.FinalPrice) <
        Number(this.product.SuggestedRetailPrice);

    // Safely format prices
    const formatPrice = (p) => {
      const n = Number(p);
      return Number.isFinite(n) ? n.toFixed(2) : p;
    };

    document.querySelector("#productName").textContent = this.product.Name;
    document.querySelector("#productNameWithoutBrand").textContent =
      this.product.NameWithoutBrand;
    document.querySelector("#productImage").src =
      this.product.Images.PrimaryLarge;
    document.querySelector("#productImage").alt = this.product.Name;
    document.querySelector("#productFinalPrice").innerHTML = `
        ${hasDiscount ? `<span class="original-price">$${formatPrice(this.product.SuggestedRetailPrice)}</span>` : ""}
        $${formatPrice(this.product.FinalPrice)}
      `;
    document.querySelector("#productColorName").textContent =
      this.product.Colors[0].ColorName;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML =
      this.product.DescriptionHtmlSimple;
    document.querySelector("#addToCart").dataset.id = this.product.Id;
  }
}

// Discount in the product details page.
function productDetailsDiscount(product) {
  // Check if there is a discount (if SuggestedRetailPrice is greater than FinalPrice)
  const hasDiscount =
    product.SuggestedRetailPrice &&
    Number(product.FinalPrice) < Number(product.SuggestedRetailPrice);

  // Calculate discount percentage
  const discountPercent = hasDiscount
    ? Math.round(
        ((Number(product.SuggestedRetailPrice) - Number(product.FinalPrice)) /
          Number(product.SuggestedRetailPrice)) *
          100,
      )
    : 0;

  // Safely format prices
  const formatPrice = (p) => {
    const n = Number(p);
    return Number.isFinite(n) ? n.toFixed(2) : p;
  };

  document.querySelector(".sale-dis-badge").innerHTML = hasDiscount
    ? `<span class="sale-badge">-${discountPercent}%</span>`
    : "";
}
