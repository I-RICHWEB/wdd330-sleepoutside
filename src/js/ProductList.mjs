// src/js/ProductList.mjs
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  // TODO: Calculate discount and badge dynamically
  const hasDiscount = product.discount && product.discount > 0;
  const discountPrice = hasDiscount
    ? (product.FinalPrice * (1 - product.discount)).toFixed(2)
    : product.FinalPrice.toFixed(2);

  const badge = hasDiscount
    ? `<span class="discount-badge">${product.discount * 100}% OFF</span>`
    : "";

  return `<li class="product-card">
    <a href="/product_pages/?product=${product.Id}">
      <img src="${product.Image}" alt="${product.Name}" />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      ${badge}
      <p class="product-card__price">
        ${hasDiscount ? `<span class="old-price">$${product.FinalPrice}</span> ` : ""}
        <span class="new-price">$${discountPrice}</span>
      </p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
