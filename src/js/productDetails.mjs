// Importing the necessary functions
import { setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  addToCart(product) {
    // To fix cart only allowing a single tent item to be store
    // because the "key" is always the same and not uniques as it require
    // a unique key at all times. I am going to set the products id as the key.
    setLocalStorage(`${this.product.Id}`, this.product);
  }
  renderProductDetails(product) {
    if (!product) {
      document.querySelector(".product-detail").innerHTML =
        "<p>Product not found.</p>";
      return;
    }

    document.title = product.Name;
    document.querySelector(".brand-name").textContent =
      product.Brand.Name || "";
    document.querySelector(".name-no-brand").textContent =
      product.NameWithoutBrand;

    const img = document.querySelector(".product-image");
    img.src = product.Image.replace(/^\.\./, "");
    img.alt = product.Name;

    document.querySelector(".product-card__price").textContent =
      `$${product.FinalPrice.toFixed(2)}`;

    document.querySelector(".product__color").textContent =
      product.Colors[0].ColorName;

    const desc = document.querySelector(".product__description");
    // DescriptionHtmlSimple contains HTML
    desc.innerHTML = product.DescriptionHtmlSimple || "";
  }
  async init() {
    // try and catch block to render the poduct details.
    try {
      this.product = await this.dataSource.findProductById(this.productId);
      this.renderProductDetails(this.product);
      document
        .getElementById("addToCart")
        .addEventListener("click", this.addToCart.bind(this));
    } catch (err) {
      console.error(err);
      document.querySelector(".product-detail").innerHTML =
        "<p>Error loading product.</p>";
    }
  }
}
