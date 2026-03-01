const PRODUCTS = {
  1: { name: "Rabbit", image: "images/products/pet1.jpg" },
  2: { name: "Rat", image: "images/products/pet2.webp" },
  3: { name: "Guinea Pig", image: "images/products/pet3.jpeg" },
  4: { name: "Hamster", image: "images/products/pet4.jpeg" },
  5: { name: "Chinchilla", image: "images/products/pet5.jpeg" },
  6: { name: "Mouse", image: "images/products/pet6.webp" },
  7: { name: "Small rodents cage", image: "images/products/cage2.jpg" },
  8: { name: "Medium rodents cage", image: "images/products/cage3.jpg" },
  9: { name: "Large rodents cage", image: "images/products/cage1.webp" },
};

const CART_KEY = "cart";

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY));
}

function setCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(productId) {
  const id = productId;
  const cart = getCart();
  cart.push(id);
  setCart(cart);
}

function removeFromCartByIndex(index) {
  const cart = getCart();
  cart.splice(index, 1);
  setCart(cart);
}

function updateCartCounter() {
  const el = document.getElementById("cart-counter");
  if (el) el.textContent = getCart().length;
}

const productDetail = document.getElementById("product-detail");
if (productDetail) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const product = PRODUCTS[id];
  const img = document.getElementById("product-image");
  const nameEl = document.getElementById("product-name");
  nameEl.textContent = product.name;
  img.src = product.image;
}

const buyBtn = document.getElementById("buy-btn");
if (buyBtn) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const productId = id;
  buyBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addToCart(productId);
    updateCartCounter();
    alert("Added to cart!");
  });
}

document.querySelectorAll("[data-product-id]").forEach((el) => {
  const btn = el.querySelector(".add-to-cart-btn");
  const id = el.getAttribute("data-product-id");
  btn.addEventListener("click", () => {
    addToCart(id);
    updateCartCounter();
    alert("Added to cart!");
  });
});

updateCartCounter();
