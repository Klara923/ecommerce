const PRODUCTS = {
  1: {
    name: "Rabbit",
    image: "images/products/pet1.jpg",
    description:
      "A cute and fluffy rabbit. Rabbits should live in pairs or groups, as they are social animals. A large rodent cage is recommended.",
  },
  2: {
    name: "Rat",
    image: "images/products/pet2.webp",
    description:
      "A cute and fluffy rat. Rats should live in pairs or groups, as they are social animals. A medium rodent cage is recommended.",
  },
  3: {
    name: "Guinea Pig",
    image: "images/products/pet3.jpeg",
    description:
      "A cute and fluffy guinea pig. Guinea pigs should live in pairs or groups, as they are social animals. A large rodent cage is recommended.",
  },
  4: {
    name: "Hamster",
    image: "images/products/pet4.jpeg",
    description:
      "A cute and fluffy hamster. Hamsters should live alone, as they are territorial animals. A small rodent cage is recommended.",
  },
  5: {
    name: "Chinchilla",
    image: "images/products/pet5.jpeg",
    description:
      "A cute and fluffy chinchilla. Chinchillas should live in pairs or groups, as they are social animals. A large rodent cage is recommended.",
  },
  6: {
    name: "Mouse",
    image: "images/products/pet6.webp",
    description:
      "A cute and fluffy mouse. Mice should live in pairs or groups, as they are social animals. A small rodent cage is recommended.",
  },
  7: {
    name: "Small Rodent Cage",
    image: "images/products/cage2.jpg",
    description: "A cage for small rodents. Recommended for hamsters and mice.",
  },
  8: {
    name: "Medium Rodent Cage",
    image: "images/products/cage3.jpg",
    description: "A cage for medium-sized rodents. Recommended for rats.",
  },
  9: {
    name: "Large Rodent Cage",
    image: "images/products/cage1.webp",
    description:
      "A cage for large rodents. Recommended for rabbits, guinea pigs, and chinchillas.",
  },
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

function renderCart() {
  const list = document.getElementById("cart-list");
  const cart = getCart();
  if (!cart.length) {
    list.innerHTML = "<li>Your cart is empty.</li>";
    return;
  }
  list.innerHTML = cart
    .map((id, i) =>
      PRODUCTS[id]
        ? `<li>${PRODUCTS[id].name} <button type="button" data-cart-index="${i}">Remove</button></li>`
        : "",
    )
    .join("");
  list.querySelectorAll("[data-cart-index]").forEach((btn) => {
    btn.addEventListener("click", () => {
      removeFromCartByIndex(btn.getAttribute("data-cart-index"));
      renderCart();
      updateCartCounter();
    });
  });
}

const productDetail = document.getElementById("product-detail");
if (productDetail) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const product = PRODUCTS[id];
  const img = document.getElementById("product-image");
  const nameEl = document.getElementById("product-name");
  nameEl.textContent = product.name;
  const descEl = document.getElementById("product-description");
  descEl.textContent = product.description;
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
renderCart();
