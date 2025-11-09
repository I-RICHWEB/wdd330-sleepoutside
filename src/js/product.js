// src/js/product.js
import { getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

// Get the product ID from the URL
const productId = getParam('product');

// Create a data source for tents
const dataSource = new ProductData('tents');

// Create a product details instance and initialize it
const product = new ProductDetails(productId, dataSource);
product.init();