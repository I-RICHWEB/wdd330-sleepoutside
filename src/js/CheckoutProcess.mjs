import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const externalService = new ExternalServices();

export default class CheckoutProcess {
  constructor() {
    this.cartList = [];
    this.subtotal = 0;
    this.tax = 0;
    this.shippingFee = 8;
    this.ordTotal = 0;
    this.getLocalStorage = getLocalStorage;
  }

  subTotal() {
    // clear previous contents so re-render doesn't duplicate
    this.cartList.length = 0;

    // collect only keys that represent cart items
    for (let i = 0; i < localStorage.length; i++) {
      const storageKey = localStorage.key(i);
      const cartItem = this.getLocalStorage(storageKey);

      // basic validation: only include plausible cart objects (adjust if your shape differs)
      if (cartItem && cartItem.Name) {
        this.cartList.push({ key: storageKey, item: cartItem });
      }
    }

    if (this.cartList.length > 0) {
      this.cartList.forEach((item) => {
        this.subtotal += item.item.FinalPrice;
      });
    }
    return this.subtotal.toFixed(2);
  }
  // This method is to calculate for the sales tax.
  setTax() {
    this.tax = (6 / 100) * this.subtotal;
    return this.tax.toFixed(2);
  }
  // this method calculate the shipping fees.
  shipFee() {
    this.shippingFee = 8;
    if (this.cartList.length > 0) {
      this.cartList.forEach(() => {
        this.shippingFee += 2;
      });

      return this.shippingFee.toFixed(2);
    }
  }

  // This method calculate the order total.
  orderTotal() {
    this.ordTotal =
      Number(this.subtotal) + Number(this.tax) + Number(this.shippingFee);
    return this.ordTotal.toFixed(2);
  }

  // The checkout method of the checkout process.
  async checkout(formElement) {
    // const formElement = document.getElementById("checkout-form");
    const formDetails = getFormData(formElement);
    const simpleCartItemList = packageItems();
    const ordTotal = this.orderTotal();
    const shipping = this.shipFee();
    const tax = this.setTax();
    const orderDate = new Date().toISOString();

    const orderObject = orderPackager(
      formDetails,
      simpleCartItemList,
      orderDate,
      ordTotal,
      shipping,
      tax,
    );

    try {
      const complete = await externalService.checkout(orderObject);
      return complete;
    } catch (err) {
      return err;
    }
  }
}

// This function will arrange the cart item in the expected order.
function packageItems() {
  const cartItemsList = [];

  for (let i = 0; i < localStorage.length; i++) {
    const storeKey = localStorage.key(i);
    const items = getLocalStorage(storeKey);

    // basic validation: only include plausible cart objects (adjust if your shape differs)
    if (items && items.Name) {
      cartItemsList.push({ key: storeKey, item: items });
    }
  }

  const simpleList = simplifyConverter(cartItemsList);

  return simpleList;
}

function simplifyConverter(list) {
  const simplifyList = [];

  if (list.length > 0) {
    list.map((item) => {
      const itemObject = {
        id: item.item.Id,
        name: item.item.Name,
        price: item.item.FinalPrice,
        quantity: 1,
      };
      simplifyList.push(itemObject);
    });
  }
  return simplifyList;
}

// FormData class to extract the form data into a json object.

function getFormData(form) {
  const data = {};

  const inputFields = form.querySelectorAll("[name]");

  inputFields.forEach((field) => {
    data[field.name] = field.value;
  });

  return data;
}

function orderPackager(
  formData,
  simpleList,
  orderDate,
  orderTotal,
  shipping,
  tax,
) {
  // This is the total arrangement of all the items that the API will
  // be expecting from the user as other.
  const orderPackage = {};

  // Passing all the items into the object accordingly.
  orderPackage.orderDate = orderDate;

  if (Object.keys(formData).length > 0) {
    Object.entries(formData).forEach(([key, value]) => {
      orderPackage[key] = value;
    });
  } else {
    console.log("Nothing in the formData");
    return;
  }

  orderPackage.items = simpleList;
  orderPackage.orderTotal = orderTotal;
  orderPackage.shipping = shipping;
  orderPackage.tax = tax;
  return orderPackage;
}
