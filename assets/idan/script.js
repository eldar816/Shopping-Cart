const product = [                       // המערך של המוצרים
                    {number : 1,
                    inCart : 0},
                    {number : 2,
                    inCart: 0},
                    {number : 3,
                    inCart: 0},
                    {number : 4,
                    inCart: 0}
                ]

let carts = document.querySelectorAll('.add-to-cart');  // כל מוצר באיצ'טימל יכיל את הקלאס הזה

for (let i = 0; i < carts.length; i++) {                // רץ על כל המערך ומבצע פונקציה שבעת קליק יבוצע פונקציה שתקבל את המוצר הספציפי שעליו נלחץ הקליק
    carts[i].addEventListener('click', () => {
        cartNumbers(product[i]);                        // זו הפונקציה שמקבלת את המוצר הספציפי שנלחץ עליו הקליק
    })
}

function onLoadCartNumbers() {                          // בעת טעינת הדף יוצג כמות המוצרים בעגלת הקניות שהייתה בפעם האחרונה שהמשתמש היה באתר (מתוך הלוקאל סטוראג')
    let productNumbers = localStorage.getItem('cartNumbers');
    
    if (productNumbers) {                               // אם זה לא ריק אז תרשום את הכמות מוצרים שהייתה בסל בספאן תחת הדיב עם הקלאס קארט
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {                         // פונקציה שמקבלת את המוצר הספציפי מהריצה על המערך (שורה 16) ומגדירה את מספר הפריטים בעגלת הקניות כולל מה שהיה בלוקאל סטוראג
    let productNumbers = localStorage.getItem('cartNumbers');
    
    productNumbers = Number(productNumbers);
        
    if( productNumbers ){                               // אם זה לא ריק תעלה את המספר שבלוקאל סטוראג' באחד ולאחר מכן גם יעלה המספר בעגלת הקניות
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }else{                                              // אחרת, אם זה ריק תגדיר את הלוקאל סטוראג' לאחד
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);                                  // בעת סיום הפונקציה תקרא לפונקציה אחרת עם המשתנה של המוצר הספציפי
}

function setItems(product) {                            // פונקציה שתגדיר את המוצר הספציפי
    let cartItems = localStorage.getItem('productsInCart'); // קח את המוצר שיש בלוקאל סטוראג
    cartItems = JSON.parse(cartItems);                      //תמיר אותו לקובץ ג'ייסון

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


onLoadCartNumbers()                                     // תקרא לפונקציה שמעדכנת את המספר מוצרים שהיה בעגלה בשימוש האחרון באתר לפי הלוקאל סטוראג