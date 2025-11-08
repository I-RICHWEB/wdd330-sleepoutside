// Importing all necessary class and functions from various file.
import ProductData from "./ProductData.mjs";
import { getParam } from "./utils.mjs";
import ProductDetails from "./productDetails.mjs";

// Creating a new instance of the productData class to get the data.
const dataSource = new ProductData("tents");
// Using the getParam function to extract the product Id from the url.
const productId = getParam("product");

// Creating a new instance of the productDetails class
const product = new ProductDetails(productId, dataSource);

// Calling the initizing function
product.init();
