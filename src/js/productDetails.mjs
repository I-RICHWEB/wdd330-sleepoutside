// src/js/ProductDetails.mjs
import { setLocalStorage } from './utils.mjs';

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

    // Add event listener to Add to Cart button
    document.getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    setLocalStorage(`${this.product.Id}`, this.product);
    alert('Product added to cart!');
  }

  renderProductDetails() {
    document.querySelector(".brand-name").textContent =
      this.product.Brand?.Name || this.product.Name;

  
    document.querySelector(".name-no-brand").textContent =
      this.product.NameWithoutBrand;
  
    document.querySelector(".product-image").src = this.product.Image;
    document.querySelector(".product-image").alt = this.product.Name;
  
    document.querySelector(".product-card__price").textContent =
      `$${this.product.FinalPrice}`;
  
    document.querySelector(".product__color").textContent =
      this.product.Colors?.[0]?.ColorName || "Color not available";
  
    document.querySelector(".product__description").innerHTML =
      this.product.DescriptionHtmlSimple;
  
    // Button is still ID-based → correct
    // Проверяем наличие скидки
    const hasDiscount = this.product.SuggestedRetailPrice &&
      this.product.FinalPrice < this.product.SuggestedRetailPrice;

    const discountPercent = hasDiscount
      ? Math.round(((this.product.SuggestedRetailPrice - this.product.FinalPrice) /
        this.product.SuggestedRetailPrice) * 100)
      : 0;

    document.querySelector("#productName").textContent = this.product.Name;
    document.querySelector("#productNameWithoutBrand").textContent = this.product.NameWithoutBrand;
    document.querySelector("#productImage").src = this.product.Image;
    document.querySelector("#productImage").alt = this.product.Name;

    // Показываем цену с бейджем если есть скидка
    const priceElement = document.querySelector("#productFinalPrice");
    if (hasDiscount) {
      priceElement.innerHTML = `
        <span class="sale-badge" style="position: static; display: inline-block; margin-right: 10px;">
          -${discountPercent}%
        </span>
        <span class="original-price">$${this.product.SuggestedRetailPrice}</span>
        $${this.product.FinalPrice}
      `;
    } else {
      priceElement.textContent = `$${this.product.FinalPrice}`;
    }

    document.querySelector("#productColorName").textContent = this.product.Colors[0].ColorName;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML = this.product.DescriptionHtmlSimple;
    document.querySelector("#addToCart").dataset.id = this.product.Id;
  }
}