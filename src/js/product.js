import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Load header/footer first
loadHeaderFooter().then(() => {
  const dataSource = new ProductData("tents");

  // Ensure URL parameter matches your links (either "product" or "id")
  const productId = getParam("product"); 

  if (!productId) {
    document.querySelector(".product-detail").innerHTML = "<p>No product selected.</p>";
  } else {
    const productDetails = new ProductDetails(productId, dataSource);
    productDetails.init();
  }
});
