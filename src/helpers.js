export const getCart = () => {
  return new Promise((resolve, reject) => {
    const cart = window.localStorage.getItem("cart");
    resolve(cart);
  });
};

export const storeCart = (cart) => {
  return window.localStorage.setItem("cart", cart);
};
