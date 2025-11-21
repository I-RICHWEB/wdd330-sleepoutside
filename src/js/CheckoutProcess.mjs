export default class CheckoutProcess {
  constructor(getLocalStorage) {
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
}
