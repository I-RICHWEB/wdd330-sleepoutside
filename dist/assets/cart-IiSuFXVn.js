import{s,g as o}from"./utils-mQi3S-TS.js";const t=[];function l(){for(let r=0;r<localStorage.length;r++){const c=localStorage.key(r),e=o(c);t.push(e)}const a=t.map(r=>n(r));document.querySelector(".product-list").innerHTML=a.join("")}function n(a){return`<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${a.Image}"
      alt="${a.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${a.Name}</h2>
  </a>
  <p class="cart-card__color">${a.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${a.FinalPrice}</p>
</li>`}l();s();
