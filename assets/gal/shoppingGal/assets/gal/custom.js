/*
Author: Gal
*/
const products = [
  { name: "batman hat", color: "black", price: "", count: "" },
  { name: "batman hat", color: "white", price: "", count: "" },
  { name: "onther shit", color: "brown", price: "", count: "" },
  { name: "baby", color: "none", price: "", count: "" },
];
const cart = [];
const favorites = [];

function addToCart(i) {
  products[i].count = document.getElementById(`counter${i}`).value;
  if (
    cart.includes(products[i]) ||
    products[i].count == `` ||
    products[i].count < 1
  ) {
    return;
  } else {
    cart.push(products[i]);
    updateResults();
  }
}

function removeFromCart(ob) {
  document.getElementById("XXX").innerHTML = `You Removed ${cart[ob].name}`;
  cart.splice(ob, 1);
  updateResults();
}

function showw() {
  //just for testing,
  for (let i = 0; i < products.length; i++) {
    document.getElementById(
      "shop"
    ).innerHTML += `${products[i].name}, color: ${products[i].color}<button onclick="addToFavorites(${i})">Add To Favorites</button><input type="number" name="" id="counter${i}"><button onclick="addToCart(${i})">Add To Cart</button><br>`;
  }
}

function addToFavorites(i) {
  if (favorites.includes(products[i])) {
    return;
  } else {
    favorites.push(products[i]);
    updateResults();
  }
}

function fromFavoritesToCart(i) {
  if (cart.includes(favorites[i])) {
    return;
  } else {
    cart.push(favorites[i]);
    updateResults();
  }
}

function removeFromFavorites(ob) {
  document.getElementById(
    "XXX"
  ).innerHTML = `You Removed ${favorites[ob].name}`;
  favorites.splice(ob, 1);
  updateResults();
}

function updateResults() {
  document.getElementById("summaryCart").innerHTML = ``;
  for (let i = 0; i < cart.length; i++) {
    document.getElementById(
      "summaryCart"
    ).innerHTML += `${cart[i].name}, color: ${cart[i].color}, count: ${products[i].count}<button onclick="removeFromCart(${i})">Remove</button><br>`;
    document.getElementById("cartNum").innerHTML = `${cart.length}`;
  }
  document.getElementById("favs").innerHTML = ``;
  for (let i = 0; i < favorites.length; i++) {
    document.getElementById(
      "favs"
    ).innerHTML += `${favorites[i].name}, color: ${favorites[i].color}<button onclick="removeFromFavorites(${i})">Remove</button> <button onclick="fromFavoritesToCart(${i})">Add To Cart</button><br>`;
    document.getElementById("favNum").innerHTML = `${favorites.length}`;
  }
}

function searchProducts() {}

function getProduct() {}

function addToWatchlist() {}

function removeFromWatchlist() {}
