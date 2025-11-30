// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get URL parameter
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// render a list with a template
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  if (clear) {
    parentElement.innerHTML = "";
  }

  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

/* ******************************************
 ** The following lines of codes is use to
 ** display the total amount of the cart item/s
 ** It displays the total price of items in the cart.
 ** *************************************** */
export function cartTotal(cartItems) {
  let total = 0;
  if (cartItems.length > 0) {
    cartItems.forEach((item) => {
      total += item.item.FinalPrice;
    });
    document.querySelector(".cart-total").innerHTML =
      `<strong>Total:</strong> $${total.toFixed(2)}`;

    document.getElementById("total-container").setAttribute("class", "");
  } else {
    document.getElementById("total-container").setAttribute("class", "hide");
  }
}

/* ******************************************
 ** This function will render the header and
 ** footer of the different pages dynamically
 ** from a single source file each.
 ** *************************************** */
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

/* ******************************************
 ** This function will be use to fetch the
 ** header and foooter file content using
 ** the path that will be passed in.
 ** *************************************** */
export async function loadTemplate(path) {
  const data = (await fetch(path)).text();
  return data;
}

/* ******************************************
 ** This function will load the header and
 ** footer files and convert it to text
 ** and return the content as a string.
 ** *************************************** */
// utils.mjs

export async function loadHeaderFooter() {
  const headerHTML = await loadTemplate("../partials/header.html");
  const footerHTML = await loadTemplate("../partials/footer.html");

  const headerPlaceHolder = document.getElementById("site-header");
  const footerPlaceHolder = document.getElementById("site-footer");

  renderWithTemplate(headerHTML, headerPlaceHolder);
  renderWithTemplate(footerHTML, footerPlaceHolder);

  // Add Auth Buttons
  const authContainer = document.createElement("div");
  authContainer.classList.add("auth-buttons");
  authContainer.innerHTML = `
    <button class="btn-signin">Sign In</button>
    <button class="btn-signup">Sign Up</button>
  `;
  headerPlaceHolder.appendChild(authContainer);

  // Insert Modal
  const modal = document.createElement("div");
  modal.id = "authModal";
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-btn">&times;</span>
      <form id="authForm">
        <h2>Sign Up / Sign In</h2>
        <label>Name:</label>
        <input type="text" id="userName" required>
        <label>Email:</label>
        <input type="email" id="userEmail" required>
        <label>Password:</label>
        <input type="password" id="userPassword" required>
        <button type="submit">Submit</button>
      </form>
    </div>
  `;
  document.body.appendChild(modal);

  // Modal CSS for proper layering
  const style = document.createElement("style");
  style.textContent = `
    .modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
             background: rgba(0,0,0,0.6); z-index: 10000; pointer-events: none; }
    .modal.show { display: block; pointer-events: auto; }
    .modal-content { background: white; margin: 10% auto; padding: 20px; max-width: 400px; border-radius: 8px; position: relative; }
    .close-btn { position: absolute; top: 10px; right: 15px; cursor: pointer; font-size: 20px; }
    .auth-buttons { display: flex; gap: 10px; margin-left: auto; }
    @media(max-width:768px) { .auth-buttons { flex-direction: column; } }
  `;
  document.head.appendChild(style);

  // Show/Hide Modal
  const closeBtn = modal.querySelector(".close-btn");
  authContainer.querySelector(".btn-signin").addEventListener("click", () => modal.classList.add("show"));
  authContainer.querySelector(".btn-signup").addEventListener("click", () => modal.classList.add("show"));
  closeBtn.addEventListener("click", () => modal.classList.remove("show"));
  window.addEventListener("click", (e) => { if(e.target === modal) modal.classList.remove("show"); });

  // Optional: handle form submission
  const form = modal.querySelector("#authForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.userName.value;
    const email = form.userEmail.value;
    const password = form.userPassword.value;
    console.log("Form submitted:", { name, email, password });
    alertMessage("Submitted successfully!", "success");
    modal.classList.remove("show");
  });

  // Update cart badge as usual
  superScript();
}


/* ******************************************
 ** The following lines of codes is use to
 ** display a superscription on the cart icon.
 ** It displays the number of items in the cart.
 ** *************************************** */
export function superScript() {
  const storageItem = localStorage.length; // Getting the lenght of localStorage.
  if (storageItem > 0) {
    // Checking if there is anything in the localStorage
    const parentE = document.querySelector(".cart-link");
    const sup = document.createElement("sup");
    sup.setAttribute("class", "cart-sup");
    sup.textContent = storageItem;
    parentE.prepend(sup); // Appending the superscription element to the link element that holds the cart icon.
  }
}

/* ******************************************
 ** The following function is use to change the
 ** words to Sentence case.
 ** *************************************** */
export function toSentenceCase(data) {
  if (!data || data.length === 0) {
    return "";
  }
  const allLowCase = data.toLowerCase();
  const sentenceCase = allLowCase.charAt(0).toUpperCase() + allLowCase.slice(1);
  return sentenceCase;
}

export function alertMessage(message, state, scroll = true) {
  // create element to hold the alert
  const alert = document.createElement("div");
  // add a class to style the alert
  alert.classList.add("alert");
  alert.classList.add(state);
  // set the contents. You should have a message and an X or something the user can click on to remove
  alert.innerHTML = `<p>${message}</p> <span> X </span>`;
  // add a listener to the alert to see if they clicked on the X
  // if they did then remove the child
  alert.addEventListener("click", function (e) {
    if (e.target.innerHTML) {
      // how can you tell if they clicked on the X or on something else?  hint: check out e.target.tagName or e.target.innerText
      main.removeChild(this);
    }
  });
  // add the alert to the top of main
  const main = document.querySelector("main");
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  // you may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) {
    window.scrollTo(0, 0);
  }

  setTimeout(function () {
    main.removeChild(alert);
  }, 3000);
}
