/* ******************************************
 ** Importing all the important files
 ** and object that we will need.
 ** *************************************** */
const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  /* ******************************************
   ** The following lines of code gets the products
   ** from the API endpoint and it returns it.
   ** *************************************** */
  async getData(category) {
    const data = await fetch(`${baseURL}products/search/${category}`);
    const products = await convertToJson(data);
    return products.Result;
  }

  /* ******************************************
   ** The following lines of code is use to find
   ** specific products by their ID
   ** *************************************** */
  async findProductById(id) {
    const res = await fetch(`${baseURL}product/${id}`);
    const products = await convertToJson(res);
    return products.Result;
  }

  async checkout(orderObject) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderObject),
    };
    const res = await fetch(`${baseURL}checkout`, options);
    // const data = await convertToJson(res);
    return res.status;
  }
}
