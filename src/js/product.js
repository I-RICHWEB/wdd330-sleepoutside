import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./productDetails.mjs";

/* ******************************************
 ** Calling the loadHeaderFooter function to
 ** dynamically load the header and footer.
 ** *************************************** */
loadHeaderFooter();

const dataSource = new ExternalServices();

const productId = getParam("product");

const productDetails = new ProductDetails(productId, dataSource);
productDetails.init();
