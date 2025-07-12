export let cart = JSON.parse(localStorage.getItem("carts"));
if (!cart) {
  cart = [
    {
      productId: "PID-F7K3Q9",
      quantity: 2,
      deliveryOptionId: "1",
    },
    { productId: "PID-A2J6XP", quantity: 2, deliveryOptionId: "2" },
  ];
}
export function saveToStorage() {
  localStorage.setItem("carts", JSON.stringify(cart));
}
export function addToCart(productId) {
  let matchingItem;
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });
  const q = document.querySelector(`.js-quantity-selector-${productId}`);
  const qValue = Number(q.value);

  if (matchingItem) {
    matchingItem.quantity += qValue;
  } else {
    cart.push({
      productId: productId,
      quantity: qValue,
      deliveryOptionId: "1",
    });
  }
  saveToStorage();
}
export function removeProduct(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}
