/*
Author: Eldar
*/

const products = [
  {id : 0, pname : "Classic Long Sleeve Shirt", price : 50, sizes : "S/M/L/XL/XXL", description : "test1", stars : 4, in_cart : false, in_favorites : false, amount : 0}, 
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
{id : 20, pname : "Prestigious Over-Size Sunglasses For Women", price : 80, sizes : "Only One Size", description : "test3", stars : 5, in_cart : false, in_favorites : false, amount : 0},
];
const storage = ['cart', 'favorites'];

const cart = [];
const favorites = [];
let cartCheck = document.getElementById("cartShow");
let favCheck = document.getElementById("favsShow");
let cartCount = 0;
let favoritesCount = 0;
let temp_flag = false;
let amount = 0;

function addToCart(product) {
        let temp = cart.indexOf(products[product]);
        amount = Number(document.getElementById(`_amount${product}`).value);
        if (temp == -1) {
            cart.push(products[product]);
            temp = cart.indexOf(products[product]);
            cart[temp].amount += amount; 
        } else {
            cart[temp].amount += amount; 
        }
        // addCartToStorage(cart[temp].id);
        let temp_cart = JSON.parse(localStorage.getItem("cart") || "[]");
        localStorage.setItem('cart', JSON.stringify(temp_cart));
        cartCount += amount;
        console.log("ADD TO CART SUCCESS " + amount); 
        callToast(`Added ${ amount} Items To Cart`);
        console.log(`${products[i].id}`);
    updatePage(); 
}

function removeFromCart(product) {
        let temp = cart.indexOf(products[product]);
        amount = Number(document.getElementById(`_amount${product}`).value);
        if (temp == -1) {
            console.log("temp -1");
        }
        if (cart[temp] == undefined) {
            callToast("There are no items to remove");
            console.log("There are no items to remove");
            return;
        }
        if (cart[temp].amount <= 1) {
            cart[temp].amount--;
            cartCount --;
            cart.splice(temp, 1);
            updatePage();

        } else {
            cart[temp].amount --;
        }
        cartCount --;
        if (cartCount <= 0) {
            cartCount = 0;
        }    
            console.log(`REMOVE ${ amount} FROM CART SUCCESS`);
            callToast(`Removed ${ amount} Items From Cart`);
            updatePage();
}

function incrementValue(i)
{
    var value = parseInt(document.getElementById(`_amount${products[i].id}`).value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById(`_amount${products[i].id}`).value = value;
}

function decrementValue(i)
{
    var value = parseInt(document.getElementById(`_amount${products[i].id}`).value, 10);
    value = isNaN(value) ? 0 : value;
    if(value <= 0){
        return;
    } else{

        value--;
        document.getElementById(`_amount${products[i].id}`).value = value;
    }
}

function addToFavorites(product) {
    if (favorites.indexOf(products[product]) == -1) { 
        favorites.push(products[product]);
        favoritesCount++;
        console.log("ADD TO FAVORITES SUCCESS");
        callToast("Add To Favorites Success");
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
        callToast("Removed Item From Favorites");
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
        <input class="__amount" id="_amount${products[i].id}" type="number" value="0" placeholder="Amount">
        <li onclick="incrementValue(${products[i].id})" class="list-inline-item"><span class="btn btn-success" id="btn-plus">+</span></li>
        <li><a class="btn btn-success text-white mt-2"><i style="filter: invert(1);" onclick="addToCart(${products[i].id})" class="fa fa-fw fa-cart-arrow-down text-dark mr-1"></i></a></li>
    </ul>
    </ul>
<li class="list-inline-item"><i class="text-warning fa fa-star"></i>${products[i].stars}<p class="text-center mb-0">&dollar;${products[i].price}</p></li>
    </div>
    </div>`;
    }
        for (let i = 0; i < cart.length; i++) {
            cartCheck.innerHTML += `<div class="col-md-4">
            <div class="card mb-4 product-wap rounded-0">
                <div class="card rounded-0">
                <p style="color:white; text-align:center" class="bg-dark">Count:${cart[i].amount}</p>
                    <img class="card-img rounded-0 img-fluid" src="assets/img/shop_${cart[i].id}.jpg">
                    <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                        <ul class="list-unstyled">
                            <li><a class="btn btn-danger text-white mt-2"><i onclick="removeFromCart(${cart[i].id})" class="fas fa-minus-square"></i></a></li>
                        </ul>
                    </div>
                </div>
                <div class="card-body">
                    <a href="shop-single.html" class="h3 text-decoration-none">${cart[i].pname}</a>
                    <ul class="list-inline pb-3">
                    <li class="list-inline-item">Size :
                    <li>${products[i].sizes}</li>
                </ul>
            </div>
                    <ul style="display = inline-block;" class="list-unstyled d-flex justify-content-center mb-1">
                    <li><i class="text-warning fa fa-star"></i></li>${cart[i].stars}
                    </ul>
                    <p class="text-center mb-0">&dollar;${cart[i].price}</p>
                </div>
            </div>`;
            console.log(cart[i].amount);
    }
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


function initPage() {
    updatePage();
}

function searchProducts() {

}

function searchResults() {

}

function getProduct() {

}

function sortBy(){
    let selector = document.getElementById("sortSelect").value;
        if(selector == "A to Z"){
            products.sort(compare);
            console.log(products);
        }
        if(selector == "Item"){
            products.sort(compareNums);
        }
        if(selector == "Featured"){
            products.sort(comparePrices);
        }
        updatePage(); 
    }

function compare(a, b) {
    const nameA = a.pname.toUpperCase();
    const nameB = b.pname.toUpperCase();
    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }
    return comparison;
  }

  function compareNums(id1, id2) {
    const idA = id1.id;
    const idB = id2.id;
    let comparison = 0;
    if (idA > idB) {
      comparison = 1;
    } else if (idA < idB) {
      comparison = -1;
    }
    return comparison;
  }

  function comparePrices(pr1,pr2){
    const price1 = pr1.price;
    const price2 = pr2.price;
    let comparison = 0;
    if (price1 > price2) {
      comparison = 1;
    } else if (price1 < price2) {
      comparison = -1;
    }
    return comparison;
  }


function addCartToStorage(product) {                            // פונקציה שתגדיר את המוצר הספציפי
        console.log(product+" test storage value");
        let tempStorage = localStorage.getItem('cart');
         // קח את המוצר שיש בלוקאל סטוראג
        tempStorage = JSON.parse(tempStorage);  
        console.log(tempStorage);                    //תמיר את הערך לקוד
        if (tempStorage == null) {  
            console.log('kaka1')                              // אם הוא לא כלום - אם הוא כבר משהו בלוקאל סטוראג
                console.log('kaka2')       // אם המוצר לא קיים בלוקאל סטוראג
                tempStorage += JSON.parse(cart[product]);
            // tempStorage[product.number].inCart += 1                // תעלה את הכמות שלו בעלה ב1 ואז הכמות שלו תיהיה 1
        } else {    
            console.log('kaka')                                            // אחרת - אם המוצר כן קיים בלוקאל סטוראג                                                        // תוסיף לכמות שיש לו בעגלה עוד אחד (שיהיה לו עוד מוצר בעלה מבלי להציג את המוצר אלא רק לעלות את הכמות)
            tempStorage = {};
        }
        localStorage.setItem('cart', JSON.stringify(tempStorage))   // תגדיר את המוצרים בעגלה לשפה מג'ייסון למערך סקריפט כדי שהבראוזר יבין ותגדיר אותו בלוקאל סטוראג
}
