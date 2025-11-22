import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
// import ProductDetails from "./ProductDetails.mjs";
import ProductDetails from "./productDetails.mjs";

/* ******************************************
 ** Calling the loadHeaderFooter function to
 ** dynamically load the header and footer.
 ** *************************************** */
loadHeaderFooter();

const dataSource = new ProductData();

const productId = getParam("product");

const productDetails = new ProductDetails(productId, dataSource);
productDetails.init();
