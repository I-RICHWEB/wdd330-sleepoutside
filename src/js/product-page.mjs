import ProductData from "./ProductData.mjs";
import { setLocalStorage } from "./utils.mjs";

const dataSource = new ProductData("tents");

function getIdFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function renderProduct(product) {
  if (!product) {
    document.querySelector(".product-detail").innerHTML = "<p>Product not found.</p>";
    return;
  }

  document.title = product.Name;

  const img = document.getElementById("productImage");
  img.src = product.Image.replace(/^\.\./, "");
  img.alt = product.Name;

  document.getElementById("productName").textContent = product.Name;
  document.getElementById("productBrand").textContent = (product.Brand && product.Brand.Name) || "";
  document.getElementById("productPrice").textContent = `$${product.FinalPrice.toFixed(2)}`;

  const desc = document.getElementById("productDescription");
  // DescriptionHtmlSimple contains HTML
  desc.innerHTML = product.DescriptionHtmlSimple || "";

  const addBtn = document.getElementById("addToCart");
  addBtn.dataset.id = product.Id;
  addBtn.addEventListener("click", () => {
    setLocalStorage(`${product.Id}`, product);
    addBtn.textContent = "Added";
    setTimeout(() => (addBtn.textContent = "Add to Cart"), 1000);
  });
}

async function init() {
  const id = getIdFromQuery();
  if (!id) {
    document.querySelector(".product-detail").innerHTML = "<p>No product specified.</p>";
    return;
  }

  try {
    const product = await dataSource.findProductById(id);
    renderProduct(product);
  } catch (err) {
    console.error(err);
    document.querySelector(".product-detail").innerHTML = "<p>Error loading product.</p>";
  }
}

init();
