import {
  cart,
  removeProduct,
  saveToStorage,
  updateDeliveryOption,
} from "./cart.js";
import { products, getProduct } from "./products.js";
import { deliveryOptions, getDeliveryOption } from "./deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export function renderOrderSummary() {
  let cartSummaryHTML = "";
  updateCartQuantity();

  cart.forEach((cartItem) => {
    const ProductId = cartItem.productId;
    console.log(cart);

    const matchingProduct = getProduct(ProductId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    cartSummaryHTML += `<div class="itemBox js-cartItem-${matchingProduct.id}">
            <h1 class="deliveryDate">Delivery Date: ${dateString}</h1>
            <div class="itemBox_inside">
              <img src="${matchingProduct.image}" />
              <div class="inside2">
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
                ${deliveryOptionHTML(matchingProduct, cartItem)}
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
      renderPaymentSummary();
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
      }
      console.log(cart);

      const container = document.querySelector(`.js-cartItem-${productId}`);
      container.querySelector(".cart_quantity").textContent = valueOld2;
      container.classList.remove("is-editing");
      renderPaymentSummary();
    });
  });

  function deliveryOptionHTML(matchingProduct, cartItem) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");

      const priceString =
        deliveryOption.price === 0
          ? "FREE"
          : `₱${(deliveryOption.price / 100).toFixed(2)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
    <div class="options js-delivery-option"
    data-product-id="${matchingProduct.id}"
    data-delivery-option-id="${deliveryOption.id}">
                  <input type="radio" 
                  ${isChecked ? "checked" : ""}
                  name="date-${matchingProduct.id}" class="ship-${
        matchingProduct.id
      }" value="1" />
                  <div class="dates">
                    <p class="date1">${dateString}</p>
                    <p class="ship">${priceString} Shipping</p>
                  </div>
                  </div>
    `;
    });

    return html;
  }

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}

renderOrderSummary();
