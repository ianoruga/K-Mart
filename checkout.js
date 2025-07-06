import { cart, removeProduct, saveToStorage } from "./cart.js";
import { products } from "./products.js";

let cartSummaryHTML = "";
updateCartQuantity();
calculate();
cart.forEach((cartItem) => {
  const ProductId = cartItem.productId;
  console.log(cart);

  let matchingProduct;
  products.forEach((product) => {
    if (ProductId === product.id) {
      matchingProduct = product;
    }
  });

  cartSummaryHTML += `<div class="itemBox js-cartItem-${matchingProduct.id}">
            <h1 class="deliveryDate">Delivery Date: Tuesday, July 1</h1>
            <div class="itemBox_inside">
              <img src="${matchingProduct.image}" />
              <div class="cart_NPQ">
                <h1 class="cartName">${matchingProduct.name}</h1>
                <p class="cart_price">₱${(matchingProduct.price / 100).toFixed(
                  2
                )}</p>
                <div class="cart_QB">
                  <p class="q">Quantity:</p>
                  <p class="cart_quantity">${cartItem.quantity}</p>
                  <div class="bts">
                    <button class="cart_bt js-update-link" data-product-id=${
                      cartItem.productId
                    }>Update</button>
                    <input class="quantity-input 
                    input-${cartItem.productId}" type="number" min="1" value='${
    cartItem.quantity
  }'"><button class="cart_bt save-quantity-link" data-product-id="${
    cartItem.productId
  }">Save</button>
                    <button class="cart_bt js-delete-link" data-product-id = "${
                      cartItem.productId
                    }">Delete</button>
                  </div>
                </div>
              </div>
              <div class="delivery_option">
                <p class="delivery_title">Choose a delivery option:</p>
                <div class="options">
                  <input type="radio" name="date-${
                    cartItem.productId
                  }" value="1" />
                  <div class="dates">
                    <p class="date1">Tuesday, July 1</p>
                    <p class="ship">FREE Shipping</p>
                  </div>
                </div>
                <div class="options">
                  <input type="radio" name="date-${
                    cartItem.productId
                  }" value="2" />
                  <div class="dates">
                    <p class="date1">Tuesday, July 1</p>
                    <p class="ship">FREE Shipping</p>
                  </div>
                </div>
                <div class="options">
                  <input type="radio" name="date-${
                    cartItem.productId
                  }" value="3" />
                  <div class="dates">
                    <p class="date1">Tuesday, July 1</p>
                    <p class="ship">FREE Shipping</p>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
});

document.querySelector(".cartItems").innerHTML = cartSummaryHTML;

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    removeProduct(productId);
    const container = document.querySelector(`.js-cartItem-${productId}`);
    container.remove();
    updateCartQuantity();
    calculate();
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
  document.querySelector(".tItems").innerHTML = `Items(${quantity})`;
}

document.querySelectorAll(".js-update-link").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    console.log(productId);
    const container = document.querySelector(`.js-cartItem-${productId}`);
    container.classList.add("is-editing");
  });
});

document.querySelectorAll(".save-quantity-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    console.log(productId);
    const valueOld = document.querySelector(`.input-${productId}`);
    const valueOld2 = Number(valueOld.value);
    let matchingItem;
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    if (matchingItem) {
      matchingItem.quantity = valueOld2;
      saveToStorage();
      updateCartQuantity();
      calculate();
    }
    console.log(cart);

    const container = document.querySelector(`.js-cartItem-${productId}`);
    container.querySelector(".cart_quantity").textContent = valueOld2;
    container.classList.remove("is-editing");
  });
});

function calculate() {
  let grandTotal = 0;
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingItem;
    products.forEach((product) => {
      if (productId === product.id) {
        matchingItem = product;
      }
    });
    if (matchingItem) {
      const ItemTotal = matchingItem.price * cartItem.quantity;
      grandTotal += ItemTotal;
    }
  });
  console.log((grandTotal / 100).toFixed(2));
  document.querySelector(".summary_price").textContent = `₱${(
    grandTotal / 100
  ).toFixed(2)}`;
}
