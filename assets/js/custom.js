/*
Author: Eldar
*/

const products = [
    {id : 0, pname : "Product1", price : 50, sizes : "S/M/L/XL/XXL", description : "test1", stars : 4, in_cart : false, in_favorites : false, amount : 0}, 
    {id : 1, pname : "Product2", price : 100, sizes : "L/XL/XXL", description : "test2", stars : 3, in_cart : false, in_favorites : false, amount : 0}, 
    {id : 2, pname : "Product3", price : 150, sizes : "L/XXL", description : "test3", stars : 5, in_cart : false, in_favorites : false, amount : 0}
];

var cart = [];
var favorites = [];
let cartCount = 0;
let favoritesCount = 0;
let amount = 0;

function addToCart(product) {
        let cart_index;
        cart = localStorage.getObj('cart');
        amount = Number(document.getElementById(`_amount${product}`).value);
        if (cart == null || cart == undefined) {
            cart = [];
            cart.push(products[product]);
            cart_index = cart.findIndex(index => index == products[product]);
            cart[cart_index].amount += amount; 
        } else {
            cart_index = cart.findIndex(index => index.id == products[product].id);
            if (cart_index == -1) {
                cart.push(products[product]);
                cart_index = cart.findIndex(index => index == products[product]);
            }
            cart[cart_index].amount += amount;    
        }
        localStorage.setObj('cart', cart);
        cartCount += amount;
        console.log("ADD TO CART SUCCESS " + amount); 
        callToast(cart[cart_index].pname + " added to cart " + amount);
    updatePage(); 
}

function removeFromCart(product) {
    cart = localStorage.getObj('cart');
    let cart_index = cart.findIndex(index => index.id == products[product].id);
    amount = Number(document.getElementById(`_amount${product}`).value);

    if (cart[cart_index] == undefined || cart[cart_index] == -1) {
        callToast("There are no items to remove");
        console.log("There are no items to remove");
        return;
    }
    if (cart[cart_index].amount <= 1) {
        cart.splice(cart_index, 1);
    } else {
        cart[cart_index].amount -= amount;
    }
    cartCount -= amount;
    if (cartCount < 0) {
        cartCount = 0;
    }    
    console.log("REMOVE FROM CART SUCCESS" + amount);
    callToast("REMOVE FROM CART SUCCESS" + amount);
    localStorage.setObj('cart', cart);
    updatePage();
}

function addToFavorites(product) {
    favorites = localStorage.getObj('favorites');
    let favorites_index;
    if (favorites == null || favorites == undefined) {
        favorites = [];
        favorites.push(products[product]);
        favorites_index = favorites.findIndex(index => index == products[product]);
        favorites[favorites_index].amount = 1; 
    } else {
        favorites_index = favorites.findIndex(index => index.id == products[product].id);
        if (favorites_index == -1) { 
            favorites.push(products[product]);
            favorites_index = favorites.findIndex(index => index == products[product]);
            favorites[favorites_index].amount = 1;
            favoritesCount++;
            console.log("ADD TO FAVORITES SUCCESS");
            callToast("ADD TO FAVORITES SUCCESS");
        } else {
            removeFromFavorites(favorites_index);
            return;
        }

    }       
   
    localStorage.setObj('favorites', favorites);
    updatePage(); 
}

function removeFromFavorites(product) {
    favorites.splice(product, 1);
    console.log("REMOVE FROM FAVORITES SUCCESS");
    callToast("REMOVE FROM FAVORITES SUCCESS");
    favoritesCount--;
    localStorage.setObj('favorites', favorites);
    updatePage();
}

function inCart(product) {
    cart = localStorage.getObj('cart');
    let cart_index;
    if (cart = null) {
        return false;
    } else {
        cart_index = cart.findIndex(index => index == products[product]);
        if (cart_index !== -1){
            return true;
        }
    }
    return false;
}

function inFavorite(product) {
    favorites = localStorage.getObj('favorites');
    if (favorites == null) {
        return false;
    } else {
        let favorites_index = favorites.findIndex(index => index.id == products[product].id);
        if (favorites_index !== -1){
            return true;
        }
    }
    return false;
}

function updatePage() {
    let FavoritesCheck;
    _res.innerHTML = "";
    _carticon.innerHTML = cartCount;
    _favoritesicon.innerHTML = favoritesCount;
    for (let i = 0; i < products.length; i++) {
        if (inFavorite(i)) {
            FavoritesCheck = `<li><a class="btn btn-danger text-white"><i onclick="addToFavorites(${products[i].id})" class="fas fa-heart"></i></a></li>`;
        } else {
            FavoritesCheck = `<li><a class="btn btn-success text-white"><i onclick="addToFavorites(${products[i].id})" class="far fa-heart"></i></a></li>`;
        }
        _res.innerHTML += `<div class="col-md-4">
        <div class="card mb-4 product-wap rounded-0">
            <div class="card rounded-0">
                <img class="card-img rounded-0 img-fluid" src="assets/img/shop_${products[i].id}.jpg">
                <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                    <ul class="list-unstyled">
                        ${FavoritesCheck}
                        <li><input class="__amount" id="_amount${products[i].id}" type="number" value="1" placeholder="Amount"></li>
                        <li><a class="btn btn-success text-white mt-2"><i onclick="addToCart(${products[i].id})" class="fas fa-plus-square"></i></a></li>
                        <li><a class="btn btn-danger text-white mt-2"><i onclick="removeFromCart(${products[i].id})" class="fas fa-minus-square"></i></a></li>
                    </ul>
                </div>
            </div>
            <div class="card-body">
                <a href="shop-single.html" class="h3 text-decoration-none">${products[i].pname}</a>
                <ul class="w-100 list-unstyled d-flex justify-content-between mb-0">
                    <li>${products[i].sizes}</li>
                    <li class="pt-2">
                        <span class="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                        <span class="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                        <span class="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                        <span class="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                        <span class="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
                    </li>
                </ul>
                <ul style="display = inline-block;" class="list-unstyled d-flex justify-content-center mb-1">
                <li><i class="text-warning fa fa-star"></i></li>${products[i].stars}
                </ul>
                <p class="text-center mb-0">&dollar;${products[i].price}</p>
            </div>
        </div>`
    }
    updateCounters();    
}


function callToast(msg) {
    let _toast = document.getElementById("_toast");
    _toast.innerHTML = msg;
    _toast.className = "show";
    setTimeout(function () {
        _toast.className = _toast.className.replace("show", "");
    }, 2000);
}

function initPage() {
    favorites = localStorage.getObj('favorites');
    cart = localStorage.getObj('cart');
    updateCounters();
    callToast("Init-done");
    updatePage();
}


Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}


function updateCounters() {
    cartCount = 0;
    favoritesCount = 0;
    let cart_update = localStorage.getObj('cart');
    let favorites_update = localStorage.getObj('favorites');
    for (i in cart_update) {
        cartCount += cart_update[i].amount;
    }
    for (i in favorites_update) {
        favoritesCount += favorites_update[i].amount;
    }
    if (favorites_update = null) {   
        favoritesCount = 0; 
    }
    if (cart_update = null) {   
        cartCount = 0; 
    }
}



function searchProducts() {

}

function searchResults() {

}

function getProduct() {

}