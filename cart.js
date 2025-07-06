export let cart = JSON.parse(localStorage.getItem("carts"));
if (!cart) {
  cart = [
    {
      productId: "PID-F7K3Q9",
      quantity: 2,
    },
    { productId: "PID-A2J6XP", quantity: 2 },
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
