import { getParam, superScript } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./productDetails.mjs";

const dataSource = new ProductData("tents");

const productId = getParam("product");

const productDetails = new ProductDetails(productId, dataSource);
productDetails.init();

/* ******************************************
 ** Calling the superscription of the cart
 ** items function.
 ** *************************************** */
superScript();

