import { products } from "./products.js";
import { cart, addToCart } from "./cart.js";
let productHTML = "";
updateCartQuantity();
products.forEach((product) => {
  productHTML += `<div class="item_box">
          <div class="top_box">
            <img src="./${product.image}" class="item_image" />
            <h1 class="item_description">
              ${product.name}
            </h1>
          </div>
          <div class="prize_quantity">
            <p class="prize">₱${(product.price / 100).toFixed(2)}</p>
            <select class="quantityBox js-quantity-selector-${
              product.id
            }" id="quantity">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
          <div class="added_box added_box-${
            product.id
          }"><i class="bx bxs-check-circle add_icon"></i><p class="added_text">Added<p></div>
          <button class="add_cart js-add-to-cart"
          data-product-id="${product.id}">Add to Cart</button>
        </div>`;
});

document.querySelector(".shop_container").innerHTML = productHTML;
const hideTimeouts = new Map();
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;

    addToCart(productId);
    updateCartQuantity();
    console.log(cart);
    const addedBox = document.querySelector(`.added_box-${productId}`);
    popup(addedBox, productId);
  });
});

function updateCartQuantity() {
  let quantity = 0;
  cart.forEach((item) => {
    quantity += item.quantity;
  });
  document.querySelectorAll(".js-cart-quantity").forEach((cart) => {
    cart.innerHTML = quantity;
  });
}

function popup(addedBox, productId) {
  if (addedBox) {
    addedBox.style.opacity = 1;

    if (hideTimeouts.has(productId)) {
      clearTimeout(hideTimeouts.get(productId));
    }
    const timeoutId = setTimeout(() => {
      addedBox.style.opacity = 0;
      hideTimeouts.delete(productId);
    }, 3000);
    hideTimeouts.set(productId, timeoutId);
  }
}
const burger = document.querySelector(".burger");
const burgerPopup = document.getElementById("burger_popup");

burger.addEventListener("click", () => {
  burgerPopup.classList.toggle("active");
});
