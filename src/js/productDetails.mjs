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
    document.querySelector("#productName").textContent = this.product.Name;
    document.querySelector("#productNameWithoutBrand").textContent = this.product.NameWithoutBrand;
    document.querySelector("#productImage").src = this.product.Image;
    document.querySelector("#productImage").alt = this.product.Name;
    document.querySelector("#productFinalPrice").textContent = `$${this.product.FinalPrice}`;
    document.querySelector("#productColorName").textContent = this.product.Colors[0].ColorName;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML = this.product.DescriptionHtmlSimple;
    document.querySelector("#addToCart").dataset.id = this.product.Id;
  }
}