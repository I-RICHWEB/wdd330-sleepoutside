import{r as i,s as n}from"./utils-mQi3S-TS.js";import{P as c}from"./ProductData-CRcDnxTv.js";function r(s){const t=s.discount&&s.discount>0,a=t?(s.FinalPrice*(1-s.discount)).toFixed(2):s.FinalPrice.toFixed(2),e=t?`<span class="discount-badge">${s.discount*100}% OFF</span>`:"";return`<li class="product-card">
    <a href="/product_pages/?product=${s.Id}">
      <img src="${s.Image}" alt="${s.Name}" />
      <h3 class="card__brand">${s.Brand.Name}</h3>
      <h2 class="card__name">${s.NameWithoutBrand}</h2>
      ${e}
      <p class="product-card__price">
        ${t?`<span class="old-price">$${s.FinalPrice}</span> `:""}
        <span class="new-price">$${a}</span>
      </p>
    </a>
  </li>`}class o{constructor(t,a,e){this.category=t,this.dataSource=a,this.listElement=e}async init(){const t=await this.dataSource.getData();this.renderList(t)}renderList(t){i(r,this.listElement,t)}}const d=new c("tents"),l=document.querySelector("#home-products"),m=new o("tents",d,l);m.init();n();
