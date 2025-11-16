// src/js/ProductList.mjs
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  // Проверяем, есть ли скидка (если SuggestedRetailPrice больше FinalPrice)
  const hasDiscount = product.SuggestedRetailPrice &&
    product.FinalPrice < product.SuggestedRetailPrice;

  // Вычисляем процент скидки
  const discountPercent = hasDiscount
    ? Math.round(((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100)
    : 0;

  return `<li class="product-card">
    <a href="/product_pages/?product=${product.Id}">
      ${hasDiscount ? `<span class="sale-badge">-${discountPercent}%</span>` : ''}
      <img
        src="${product.Image}"
        alt="${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">
        ${hasDiscount ? `<span class="original-price">$${product.SuggestedRetailPrice}</span>` : ''}
        $${product.FinalPrice}
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