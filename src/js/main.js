// Importing all necessary modules for the supscription
const cartLink = document.querySelector(".cart");

const storageCount = localStorage.length;
const supElement = document.createElement("sup");
supElement.setAttribute("class", "cart-sup");

supElement.innerHTML = storageCount;

if (storageCount > 0) {
  cartLink.appendChild(supElement);
}
