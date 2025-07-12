import { cart } from "./cart.js";
import { getProduct } from "./products.js";
import { getDeliveryOption } from "./deliveryOptions.js";

export function renderPaymentSummary() {
  let productPrice = 0;
  let shippingPrice = 0;
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPrice += product.price * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPrice += deliveryOption.price;
  });

  const totalBeforeTaxCents = productPrice + shippingPrice;
  const tax = totalBeforeTaxCents * 0.1;

  const total = totalBeforeTaxCents + tax;
  console.log((total / 100).toFixed(2));

  const paymentSummaryHTML = `
  <h1 class="header2">Review your order</h1>
        <div class="summary_box">
          <div class="summary_top">
            <p><strong>Order Summary</strong></p>
            <div class="summary_inside">
              <p class="margin tItems">Items (1):</p>
              <p class="summary_price margin">₱${(productPrice / 100).toFixed(
                2
              )}</p>
            </div>
            <div class="summary_inside">
              <p class="margin">Shipping & handling:</p>
              <p class="summary_shipping margin">₱${(
                shippingPrice / 100
              ).toFixed(2)}</p>
            </div>
            <div class="line">
              <div class="line2"></div>
            </div>
            <div class="summary_inside2">
              <p class="margin">Total before tax:</p>
              <p class="total_beforeTax margin">₱${(
                totalBeforeTaxCents / 100
              ).toFixed(2)}</p>
            </div>
            <div class="summary_inside">
              <p class="margin">Estimated tax (10%):</p>
              <p class="Estimated_tax margin">₱${(tax / 100).toFixed(2)}</p>
            </div>
            <div class="line3"></div>
            <div class="summary_inside3">
              <h1 class="OT margin">Order total:</h1>
              <p class="order_total margin">₱${(total / 100).toFixed(2)}</p>
            </div>
            <button class="place_order">Place your order</button>
          </div>
        </div>
  `;
  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
}
