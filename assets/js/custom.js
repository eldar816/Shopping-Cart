/*
Author: Eldar
*/

const products = [
    {id : 0, pname : "Product1", price : 50, sizes : "S/M/L/XL/XXL", description : "test1", stars : 4, in_cart : false, in_favorites : false}, 
    {id : 1, pname : "Product2", price : 100, sizes : "L/XL/XXL", description : "test2", stars : 3, in_cart : false, in_favorites : false}, 
    {id : 2, pname : "Product3", price : 150, sizes : "L/XXL", description : "test3", stars : 5, in_cart : false, in_favorites : false}
];

const cart = [];
const favorites = [];

let cartCount = 0;
let favoritesCount = 0;
let temp_flag = false;
let amount = 0;

function addToCart(product) {
        amount = Number(document.getElementById(`_amount${product}`).value); 
        for (let i = 0; i < amount; i++) {
            cart.push(products[product]);
            cartCount++;
        }
        console.log("ADD TO CART SUCCESS" + amount);
        callToast("ADD TO CART SUCCESS" + amount);
    updatePage(); 
}

function removeFromCart(product) {
        amount = Number(document.getElementById(`_amount${product}`).value);
        product = cart.indexOf(products[product]);
        for (let i = 0; i < amount; i++) {
            cart.splice(product, 1);
            cartCount--;
        }
        if (cartCount < 0) {
            cartCount = 0;
        }    
            console.log("REMOVE FROM CART SUCCESS" + amount);
            callToast("REMOVE FROM CART SUCCESS" + amount);
    updatePage();
}

function addToFavorites(product) {
    if (favorites.indexOf(products[product]) == -1) { 
        favorites.push(products[product]);
        favoritesCount++;
        console.log("ADD TO FAVORITES SUCCESS");
        callToast("ADD TO FAVORITES SUCCESS");
    } else {
        removeFromFavorites(product);
        return;
    }
    updatePage(); 
}

function removeFromFavorites(product) {
        product = favorites.indexOf(products[product]);
        console.log(product);
        favorites.splice(product, 1);
        console.log("REMOVE FROM FAVORITES SUCCESS");
        callToast("REMOVE FROM FAVORITES SUCCESS");
        favoritesCount--;
    updatePage();
}

function inCart(product) {
    return (cart.indexOf(products[product]) !== -1);
}

function inFavorite(product) {
    return (favorites.indexOf(products[product]) !== -1);
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
}


function callToast(msg) {
    let _toast = document.getElementById("_toast");
    _toast.innerHTML = msg;
    _toast.className = "show";
    setTimeout(function () {
        _toast.className = _toast.className.replace("show", "");
    }, 2000);
}

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
  
function checkCookie() {
    var user=getCookie("username");
    if (user != "") {
      alert("Welcome again " + user);
    } else {
       user = prompt("Please enter your name:","");
       if (user != "" && user != null) {
         setCookie("username", user, 30);
       }
    }
  }
  
  function removeCookie(cname) {
      document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"`;
}



function searchProducts() {

}

function searchResults() {

}

function getProduct() {

}