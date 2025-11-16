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