// src/js/ProductDetails.mjs
import { setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    try {
      // Get product details
      this.product = await this.dataSource.findProductById(this.productId);
      
      // Render the product details
      this.renderProductDetails();
      
      // Add event listener to Add to Cart button
      document.getElementById('addToCart')
        .addEventListener('click', this.addProductToCart.bind(this));
    } catch (err) {
      console.error(err);
      document.querySelector(".product-detail").innerHTML = "<p>Error loading product.</p>";
    }
  }

  addProductToCart() {
    setLocalStorage(`${this.product.Id}`, this.product);
    alert('Product added to cart!');
  }

  renderProductDetails() {
    if (!this.product) return;

    document.querySelector(".brand-name").textContent = this.product.Brand?.Name || "";
    document.querySelector(".name-no-brand").textContent = this.product.NameWithoutBrand;
    const img = document.querySelector(".product-image");
    img.src = this.product.Image.replace(/^\.\./, ""); // remove leading ../ if needed
    img.alt = this.product.Name;
    document.querySelector(".product-card__price").textContent = `$${this.product.FinalPrice.toFixed(2)}`;
    document.querySelector(".product__color").textContent = this.product.Colors[0]?.ColorName || "";
    document.querySelector(".product__description").innerHTML = this.product.DescriptionHtmlSimple || "";
  }
}
