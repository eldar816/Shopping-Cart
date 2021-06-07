/*
Author: Eldar
*/

// const products = [
//     {id : 0, pname : "Product1", price : 50, sizes : "S/M/L/XL/XXL", description : "test1", stars : 4, in_cart : false, in_favorites : false, amount : 0}, 
//     {id : 1, pname : "Product2", price : 100, sizes : "L/XL/XXL", description : "test2", stars : 3, in_cart : false, in_favorites : false, amount : 0}, 
//     {id : 2, pname : "Product3", price : 150, sizes : "L/XXL", description : "test3", stars : 5, in_cart : false, in_favorites : false, amount : 0}
// ];

const products = [{id : 0, pname : "Classic Long Sleeve Shirt", price : 50, sizes : "S/M/L/XL/XXL", description : "test1", stars : 4, in_cart : false, in_favorites : false, amount : 0}, 
  {id : 1, pname : "Golf Casual Shirt", price : 100, sizes : "S/M/L/XL/XXL", description : "test2", stars : 3, in_cart : false, in_favorites : false, amount : 0}, 
  {id : 2, pname : "Elegant Daily Dress", price : 150, sizes : "S/M/L/XXL", description : "test3", stars : 5, in_cart : false, in_favorites : false, amount : 0},
  {id : 3, pname : "Classic Unique Dress", price : 70, sizes : "S/M/L/XL/XXL", description : "test1", stars : 4, in_cart : false, in_favorites : false, amount : 0}, 
  {id : 4, pname : "Gym One Color Sport Outfit", price : 120, sizes : "S/M/L/XL/XXL", description : "test2", stars : 3, in_cart : false, in_favorites : false, amount : 0}, 
  {id : 5, pname : "Gym Colored DryFit Sport Outfit", price : 80, sizes : "S/M/L/XL/XXL", description : "test3", stars : 5, in_cart : false, in_favorites : false, amount : 0},
  {id : 6, pname : "Men's Elegant Blazer", price : 150, sizes : "S/M/L/XL/XXL", description : "test1", stars : 4, in_cart : false, in_favorites : false, amount : 0}, 
  {id : 7, pname : "Men's Casual Daily Blazer", price : 100, sizes : "L/XL/XXL", description : "test2", stars : 3, in_cart : false, in_favorites : false, amount : 0}, 
  {id : 8, pname : "Casual Sunglasses", price : 150, sizes : "S/M/L/XXL", description : "test3", stars : 5, in_cart : false, in_favorites : false, amount : 0},
  {id : 9, pname : "Men's Classic Jeans", price : 70, sizes : "S/M/L/XL/XXL", description : "test1", stars : 4, in_cart : false, in_favorites : false, amount : 0}, 
  {id : 10, pname : "Classic Tunique Daily Style", price : 140, sizes : "L/XL/XXL", description : "test2", stars : 3, in_cart : false, in_favorites : false, amount : 0}, 
  {id : 11, pname : "Women's Classic Skinny Jeans", price : 80, sizes : "S/M/L/XL/XXL", description : "test3", stars : 5, in_cart : false, in_favorites : false, amount : 0},
  {id : 12, pname : "Unisex Snickers Shoes", price : 150, sizes : "Between 36-43", description : "test1", stars : 4, in_cart : false, in_favorites : false, amount : 0}, 
  {id : 13, pname : "Men's Scribbled Surf Pants Basic ", price : 100, sizes : "L/XL/XXL", description : "test2", stars : 3, in_cart : false, in_favorites : false, amount : 0}, 
  {id : 14, pname : "Elegant Special Events Moccasin", price : 150, sizes : "Between 35-40", description : "test3", stars : 5, in_cart : false, in_favorites : false, amount : 0},
  {id : 15, pname : "High Heels Ballet Shoes", price : 80, sizes : "Between 34-38", description : "test1", stars : 4, in_cart : false, in_favorites : false, amount : 0}, 
  {id : 16, pname : "Casual Designed Leather Bag", price : 160, sizes : "Only One Size", description : "test2", stars : 3, in_cart : false, in_favorites : false, amount : 0}, 
  {id : 17, pname : "Women's Elegant Bag For Events", price : 110, sizes : "Only One Size", description : "test3", stars : 5, in_cart : false, in_favorites : false, amount : 0},
  {id : 18, pname : "Women's Unique Suede Casual Bag", price : 70, sizes : "Only One Size", description : "test1", stars : 4, in_cart : false, in_favorites : false, amount : 0}, 
  {id : 19, pname : "Over-Size Sunglasses Daily Style For Women", price : 120, sizes : "Only One Size", description : "test2", stars : 3, in_cart : false, in_favorites : false, amount : 0}, 
  {id : 20, pname : "Prestigious Over-Size Sunglasses For Women", price : 80, sizes : "Only One Size", description : "test3", stars : 5, in_cart : false, in_favorites : false, amount : 0}];

var cart = [];
var favorites = [];
let cartCount = 0;
let favoritesCount = 0;
let amount = 0;
let cartCheck = document.getElementById("cartShow");
let favCheck = document.getElementById("favsShow");

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

function removeFromCart(product, flag) {
    cart = localStorage.getObj('cart');
    let cart_index = cart.findIndex(index => index.id == products[product].id);
    amount = Number(document.getElementById(`_amount${product}`).value);
    if (amount < 1) {
        amount = 1;
    }
    // if ((amount - cart[cart_index].amount) <= 0) {
    //     flag = true;
    // }
    if (cart[cart_index] == undefined || cart[cart_index] == -1) {
        callToast("There are no items to remove");
        console.log("There are no items to remove");
        return;
    }
    if (flag = true) {
        cartCount -= cart[cart_index].amount;
        cart.splice(cart_index, 1);
        console.log("REMOVE FROM CART SUCCESS" + amount);
        callToast("REMOVE FROM CART SUCCESS" + amount);
        localStorage.setObj('cart', cart);
        updatePage();
        return;
    }
    if (cart[cart_index].amount <= 1) {
        cart.splice(cart_index, 1);
    } else {
        cart_index = cart.findIndex(index => index.id == products[product].id);
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

function removeAllFromCart(product, flag) {
    removeFromCart(product, flag); 
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

// function updatePage() {
//     let FavoritesCheck;
//     _res.innerHTML = "";
//     _carticon.innerHTML = cartCount;
//     _favoritesicon.innerHTML = favoritesCount;
//     for (let i = 0; i < products.length; i++) {
//         if (inFavorite(i)) {
//             FavoritesCheck = `<li><a class="btn btn-danger text-white"><i onclick="addToFavorites(${products[i].id})" class="fas fa-heart"></i></a></li>`;
//         } else {
//             FavoritesCheck = `<li><a class="btn btn-success text-white"><i onclick="addToFavorites(${products[i].id})" class="far fa-heart"></i></a></li>`;
//         }
//         _res.innerHTML += `<div class="col-md-4">
//         <div class="card mb-4 product-wap rounded-0">
//             <div class="card rounded-0">
//                 <img class="card-img rounded-0 img-fluid" src="assets/img/shop_${products[i].id}.jpg">
//                 <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
//                     <ul class="list-unstyled">
//                         ${FavoritesCheck}
//                         <li><input class="__amount" id="_amount${products[i].id}" type="number" value="1" placeholder="Amount"></li>
//                         <li><a class="btn btn-success text-white mt-2"><i onclick="addToCart(${products[i].id})" class="fas fa-plus-square"></i></a></li>
//                         <li><a class="btn btn-danger text-white mt-2"><i onclick="removeFromCart(${products[i].id})" class="fas fa-minus-square"></i></a></li>
//                     </ul>
//                 </div>
//             </div>
//             <div class="card-body">
//                 <a href="shop-single.html" class="h3 text-decoration-none">${products[i].pname}</a>
//                 <ul class="w-100 list-unstyled d-flex justify-content-between mb-0">
//                     <li>${products[i].sizes}</li>
//                     <li class="pt-2">
//                         <span class="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
//                         <span class="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
//                         <span class="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
//                         <span class="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
//                         <span class="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
//                     </li>
//                 </ul>
//                 <ul style="display = inline-block;" class="list-unstyled d-flex justify-content-center mb-1">
//                 <li><i class="text-warning fa fa-star"></i></li>${products[i].stars}
//                 </ul>
//                 <p class="text-center mb-0">&dollar;${products[i].price}</p>
//             </div>
//         </div>`
//     }
//     updateCounters();    
// }


function updatePage() {
    let FavoritesCheck;
    _res.innerHTML = "";
    cartCheck.innerHTML = "";
    favCheck.innerHTML = "";
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
        </ul>
        </div>
        </div>
        <div class="card-body">
        <a href="shop-single.html" class="h3 text-decoration-none">${products[i].pname}</a>
        <ul class="w-100 list-unstyled d-flex justify-content-between mb-0">
        <ul class="list-inline pb-3">
        <li class="list-inline-item">Size :
            <input type="hidden" name="product-size" id="product-size" value="S">
        </li>
        <li>${products[i].sizes}</li>
        </ul>
        <ul class="list-inline pb-3">
        <li onclick="decrementValue(${products[i].id})" class="list-inline-item"><span class="btn btn-danger" id="btn-minus">-</span></li>
        <input class="__amount" id="_amount${products[i].id}" type=number min=1 max=999 value=1 placeholder="Amount">
        <li onclick="incrementValue(${products[i].id})" class="list-inline-item"><span class="btn btn-success" id="btn-plus">+</span></li>
        <li><a class="btn btn-success text-white mt-2"><i style="filter: invert(1);" onclick="addToCart(${products[i].id})" class="fa fa-fw fa-cart-arrow-down text-dark mr-1"></i></a></li>
        </ul>
        </ul>
        <li class="list-inline-item"><i class="text-warning fa fa-star"></i>${products[i].stars}<p class="text-center mb-0">&dollar;${products[i].price}</p></li>
        </div>
        </div>`;
    }
    updateCart();
    updateFavorites();
    updateCounters();
}


function updateFavorites() {
    favorites = localStorage.getObj('favorites');
    for (let i = 0; i < favorites.length; i++) {
        favCheck.innerHTML += `<div class="col-md-4">
        <div class="card mb-4 product-wap rounded-0">
            <div class="card rounded-0">
                <img class="card-img rounded-0 img-fluid" src="assets/img/shop_${favorites[i].id}.jpg">
                <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                    <ul class="list-unstyled">
                
                        <li><a class="btn btn-success text-white mt-2"><i style="filter: invert(1);" onclick="addToCart(${favorites[i].id})" class="fa fa-fw fa-cart-arrow-down text-dark mr-1"></i></a></li>
                        <li><a class="btn btn-danger text-white mt-2"><i onclick="removeFromFavorites(${favorites[i].id})" class="fas fa-minus-square"></i></a></li>
                    </ul>
                </div>
            </div>
            <div class="card-body">
                <a href="shop-single.html" class="h3 text-decoration-none">${favorites[i].pname}</a>
                <ul class="w-100 list-unstyled d-flex justify-content-between mb-0">
                    <li>${favorites[i].sizes}</li>
                </ul>
                <ul style="display = inline-block;" class="list-unstyled d-flex justify-content-center mb-1">
                <li><i class="text-warning fa fa-star"></i></li>${favorites[i].stars}
                </ul>
                <p class="text-center mb-0">&dollar;${favorites[i].price}</p>
    
            </a>
            </div>
        </div>`;
        }
}

function updateCart() {
    cart = localStorage.getObj('cart');
    for (let i = 0; i < cart.length; i++) {
        cartCheck.innerHTML += `<div class="col-md-4">
        <div class="card mb-4 product-wap rounded-0">
            <div class="card rounded-0">
            <p style="color:white; text-align:center" class="bg-dark">Count:${cart[i].amount}</p>
                <img class="card-img rounded-0 img-fluid" src="assets/img/shop_${cart[i].id}.jpg">
                <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                    <ul class="list-unstyled">
                        <li><a class="btn btn-danger text-white mt-2"><i onclick="removeAllFromCart(${cart[i].id})" class="fas fa-minus-square"></i></a></li>
                    </ul>
                </div>
            </div>
            <div class="card-body">
                <a href="shop-single.html" class="h3 text-decoration-none">${cart[i].pname}</a>
                <ul class="list-inline pb-3">
                <li class="list-inline-item">Size :
                <li>${cart[i].sizes}</li>
            </ul>
        </div>
                <ul style="display = inline-block;" class="list-unstyled d-flex justify-content-center mb-1">
                <li><i class="text-warning fa fa-star"></i></li>${cart[i].stars}
                </ul>
                <p class="text-center mb-0">&dollar;${cart[i].price}</p>
            </div>
        </div>`;
    }
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

// function incrementValue(i) {
//     var value = parseInt(document.getElementById(`_amount${products[i].id}`).value, 10);
//     value = isNaN(value) ? 0 : value;
//     if (value >= 1000) {
//         return;
//     }
//     value++;
//     document.getElementById(`_amount${products[i].id}`).value = value;
// }

// function decrementValue(i) {
//     var value = parseInt(document.getElementById(`_amount${products[i].id}`).value, 10);
//     value = isNaN(value) ? 0 : value;
//     if(value <= 0){
//         return;
//     } else {
//         value--;
//         document.getElementById(`_amount${products[i].id}`).value = value;
//     }
// }


function incrementValue(i) {
    document.getElementById(`_amount${i}`).stepUp();
 }
 function decrementValue(i) {
    document.getElementById(`_amount${i}`).stepDown();
 }

function searchProducts() {

}

function searchResults() {

}

function getProduct() {

}