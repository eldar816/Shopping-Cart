const product = [                       // המערך של המוצרים
    {
        name: 'eldar',
        number: 1,
        price: 52,
        inCart: 0
    },
    {
        name: 'gal',
        number: 2,
        price: 10,
        inCart: 0
    },
    {
        name:'idan',
        number: 3,
        price: 5,
        inCart: 0
    },
    {
        name: 'yarden',
        number: 4,
        price: 8,
        inCart: 0
    }
]

let carts = document.querySelectorAll('.add-to-cart');  // כל מוצר באיצ'טימל יכיל את הקלאס הזה

for (let i = 0; i < carts.length; i++) {                // רץ על כל המערך ומבצע פונקציה שבעת קליק יבוצע פונקציה שתקבל את המוצר הספציפי שעליו נלחץ הקליק
    carts[i].addEventListener('click', () => {
        cartNumbers(product[i]);                        // זו הפונקציה שמקבלת את המוצר הספציפי שנלחץ עליו הקליק
        totalCost(product[i]);
    })
}

function checkCartAmount() {                          // בעת טעינת הדף יוצג כמות המוצרים בעגלת הקניות שהייתה בפעם האחרונה שהמשתמש היה באתר (מתוך הלוקאל סטוראג')
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {                               // אם זה לא ריק אז תרשום את הכמות מוצרים שהייתה בסל בספאן תחת הדיב עם הקלאס קארט
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {                         // פונקציה שמקבלת את המוצר הספציפי מהריצה על המערך (שורה 28) ומגדירה את מספר הפריטים בעגלת הקניות כולל מה שהיה בלוקאל סטוראג
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = Number(productNumbers);

    if (productNumbers) {                               // אם זה לא ריק תעלה את המספר שבלוקאל סטוראג' באחד ולאחר מכן גם יעלה המספר בעגלת הקניות
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {                                              // אחרת, אם זה ריק תגדיר את הלוקאל סטוראג' לאחד
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);                                  // בעת סיום הפונקציה תקרא לפונקציה אחרת עם המשתנה של המוצר הספציפי
}

function setItems(product) {                            // פונקציה שתגדיר את המוצר הספציפי
    let cartItems = localStorage.getItem('productsInCart'); // קח את המוצר שיש בלוקאל סטוראג
    cartItems = JSON.parse(cartItems);                      //תמיר את הערך לקוד

    if (cartItems != null) {                                // אם הוא לא כלום - אם הוא כבר משהו בלוקאל סטוראג

        if (cartItems[product.number] == undefined) {       // אם המוצר לא קיים בלוקאל סטוראג
            cartItems = {                                   // מעדכן את הרשימת עגלה בלוקאל סטוראג ומוסיף את המוצר
                ...cartItems,                               // השלוש נקודות הן כדי לקחת את כל מה שהמוצר מכיל בדיב ולא רק את המספר שלו
                [product.number]: product
            }
        }
        cartItems[product.number].inCart += 1                // תעלה את הכמות שלו בעלה ב1 ואז הכמות שלו תיהיה 1
    } else {                                                // אחרת - אם המוצר כן קיים בלוקאל סטוראג
        product.inCart = 1;                                 // תוסיף לכמות שיש לו בעגלה עוד אחד (שיהיה לו עוד מוצר בעלה מבלי להציג את המוצר אלא רק לעלות את הכמות)
        cartItems = {
            [product.number]: product
        }
    }
    localStorage.setItem('productsInCart', JSON.stringify(cartItems))   // תגדיר את המוצרים בעגלה לשפה מג'ייסון למערך סקריפט כדי שהבראוזר יבין ותגדיר אותו בלוקאל סטוראג
}

function totalCost(product) {                               // פונקציה שתשמור בלוקאל סטוראג' את המחירים של המוצרים ותחשב את כולם יחד
    let cartCost = localStorage.getItem('totalCost');       // מגדיר משתנה ששווה לכל מחירי המוצרים שנבחרו יחד
    
    if (cartCost != null){                                  // אם קיים מחיר תהפוך אותו למספר ותוסיף לו את המחיר של המוצר הבא שנלחץ
        cartCost = Number(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price)
    } else{                                                 // אחרת אם לא קיים מחיר עדיין תגדיר לו אותו למחיר של המוצר הנלחץ
        localStorage.setItem('totalCost', product.price)
    }
    return
}


function displayCart() {                                    // מעדכן את התצוגה של עגלת הקניות לפי המוצרים שנמצאים בלוקאל סטוראג + חדשים
    let cartItems = localStorage.getItem('productsInCart'); // תיגש ללוקאל סטוראג ותשמור את כל מה שיש שם בתוך המשתנה
    cartItems = JSON.parse(cartItems);                      // תעביר את המשתנה לקוד
    let total = localStorage.getItem('totalCost');          // תיגש ללוקאל סטוראג ותשמור את כל מה שיש שם בתוך המשתנה
    total = JSON.parse(total);                              // תעביר את המשתנה לקוד
    let productContainer = document.querySelector('.products-container'); // תגדיר משתנה שיקבל את התכולה של העגלת הקניות
    if (cartItems && productContainer ){                                  // אם המשתנים האלו לא רקים 
        Object.values(cartItems).map(item =>{                             // תקח את המשתנה שמתקבל כאובייקט ותשאוב ממנו את כל הערכים שלו
            productContainer.innerHTML +=                                 // תכניס לתכולת עגלת הקניות את הערכים של המשתנה מהלוקאל סטוראג
            `                               
            <div class='product'> 
            <span>${item.number}</span>
            <span>${item.name}</span>
            &nbsp&nbsp&nbsp&nbsp&nbsp
            <span>${item.inCart}</span>
            `
        })
        Object.values(total);
            productContainer.innerHTML +=
            `
            <span>${total}</span>
            `
    }
}

// function removeItem() {
//     let cartItems = localStorage.getItem('productsInCart'); // תיגש ללוקאל סטוראג ותשמור את כל מה שיש שם בתוך המשתנה
//     cartItems = JSON.parse(cartItems);                       //תמיר את הערך לקוד
//     Object.values(cartItems).map(item => {                             // תקח את המשתנה שמתקבל כאובייקט ותשאוב ממנו את כל הערכים שלו
//         console.log(item.inCart);
//         let inncart = item.inCart - 1;
//         localStorage.setItem('productsInCart', inncart)
//         console.log(inncart);
//     })
//     // let cartRemove = localStorage.('productsInCart', cartItems - 1);
//     // console.log(cartRemove);
//     // cartItems = localStorage.setItem('productsInCart', product -1);
// }

checkCartAmount();                                     // תקרא לפונקציה שמעדכנת את המספר מוצרים שהיה בעגלה בשימוש האחרון באתר לפי הלוקאל סטוראג
displayCart();                                           // תקרא לפונקציה שמעדכנת את התצוגה של העגלת קניות לפי הלוקאל סטוראג