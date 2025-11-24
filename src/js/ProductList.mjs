import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
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

  return `<li class="product-card">
    <a href="/product_pages/?product=${product.Id}">
      ${hasDiscount ? `<span class="sale-badge">-${discountPercent}%</span>` : ""}
      <img
        src="${product.Images?.PrimaryMedium || ""}"
        alt="${product.Name || "Product image"}"
      />
      <h3 class="card__brand">${product.Brand?.Name || ""}</h3>
      <h2 class="card__name">${product.NameWithoutBrand || product.Name || ""}</h2>
      <p class="product-card__price">
        ${hasDiscount ? `<span class="original-price">$${formatPrice(product.SuggestedRetailPrice)}</span>` : ""}
        $${formatPrice(product.FinalPrice)}
      </p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;

    // storage for fetched list and current displayed list
    this.originalList = [];
    this.currentList = [];
    this.sortCriteria = "name-asc";
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.originalList = Array.isArray(list) ? list : [];
    this.currentList = [...this.originalList];
    this.sortList(); // apply default sorting
    this.renderList(this.currentList);
  }

  setSort(criteria) {
    this.sortCriteria = criteria;
    this.sortList();
    this.renderList(this.currentList);
  }

  // sorts this.currentList in place according to this.sortCriteria
  sortList() {
    const criteria = this.sortCriteria;
    // create a copy so we don't mutate originalList externally
    this.currentList = [...this.currentList];

    const getName = (p) =>
      (p.NameWithoutBrand || p.Name || "").toString().toLowerCase();

    const getPrice = (p) => {
      const n = Number(p.FinalPrice);
      return Number.isFinite(n) ? n : Infinity; // unknown price sorts to end
    };

    switch (criteria) {
      case "name-asc":
        this.currentList.sort((a, b) => (getName(a) > getName(b) ? 1 : -1));
        break;
      case "name-desc":
        this.currentList.sort((a, b) => (getName(a) < getName(b) ? 1 : -1));
        break;
      case "price-asc":
        this.currentList.sort((a, b) => getPrice(a) - getPrice(b));
        break;
      case "price-desc":
        this.currentList.sort((a, b) => getPrice(b) - getPrice(a));
        break;
      default:
        // no-op, keep original order
        this.currentList = [...this.originalList];
    }
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
