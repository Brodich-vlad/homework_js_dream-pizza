import { pizzaSelectUser } from "./index.js";
import pizza from "./pizza.js";

// Функція пошуку елемента по id.
const get = id => document.getElementById(id);

// Функція створення зображеннь обраних індігрієнтів.
function clon (id,src,zIn = 0){
    const el = document.createElement('img');
    el.classList.add('draggable');
    el.draggable = "true";
    el.style = `z-index: ${zIn};`
    el.dataset.id = id;
    el.alt=`${id}`;
    el.src = src;
    // Вішаємо подію перетягування на коже створений елемент.
    el.addEventListener("dragstart", function (evt) {
        // Передаємо dataset.id перетягуємого об'єкта
        evt.dataTransfer.setData("Text", this.dataset.id);
    }, false);
    return el;
};

 // Функція видалення зображеннь обраних індігрієнтів.
function clonRemove(id){
    const [...listClon] = document.querySelectorAll('#table-wrapper > img');
    listClon.map((el)=>{
        if(el.dataset.id === id){
            el.remove(el)
        }else return;
    });
};

 // Функція видалення індігрієнтів з піци користувача.
function userRemovTopping(topping){
    if ("sauceClassicsauceBBQsauceRikotta".includes(topping)){
        pizzaSelectUser.sauce = '';
        console.log( pizzaSelectUser.sauce)
    }
    pizzaSelectUser.topping.map((el,i) =>{
        if ("moc1moc2moc3telyavetch1vetch2".includes(topping)){
            if(el.name === topping){
                pizzaSelectUser.topping.splice(i, 1)
            }
        }
    });
    pizzaSelectUser.price = show(pizzaSelectUser);
};

// Функція заповнення піци користувача
function userSlectTopping(topping) {
    // Перевірка розміру піци
    if ("smallmidbig".includes(topping)) {
        pizzaSelectUser.size = pizza.size.find((el) => {
            return el.name === topping
        })
    } 
    else if ("moc1moc2moc3telyavetch1vetch2".includes(topping)) {
        // Перевірка начинок для піци. Як-що є повторення - ігноруємо.
        let flag = false;
        pizzaSelectUser.topping.find(el=>{
            if(el.name === topping){
                flag = true   
            }
        })
        // Як-що повторів немає - додаємо начинки.
        if(!flag){
            pizzaSelectUser.topping.push(pizza.topping.find(el => el.name === topping ));
            flag = false;
        }  else return;
    // Перевірка обраного соусу.   
    } else if ("sauceClassicsauceBBQsauceRikotta".includes(topping)) {
        pizzaSelectUser.sauce = pizza.sauce.find(el => el.name === topping);
    }
    pizzaSelectUser.price = show(pizzaSelectUser);
};

// Функція виводу результатів на сторінку
function show(pizza) {
    let price = 0;
    let toppin = '';
    // Розрахунок та вивід ціни.
    if (pizza.sauce !== "") {
        price += pizza.sauce.price;
    }
    if(pizza.topping.length > 0){
        price += pizza.topping.reduce((a,b)=>{
            return a + b.price
        }, 0)
    }
    // Розмір коржа за замовчуванням.
    if(pizza.size === ""){
        pizza.size = {name : "big", price: 70};
    }
    if(pizza.size !== ""){
        price += pizza.size.price;
    }
    //  Вивід зображення соусу на сторінку.
    if(pizzaSelectUser.sauce !== ''){
        let a = get(pizzaSelectUser.sauce.name);
        // Видалення попереднього зображення соусу.
        clonRemove('sauc');
        // Вивід зображення соусу.
        get('table-wrapper').appendChild(clon('sauc',a.src));
        // Вивід назви соусу.
        get('sauce').innerHTML = `<span>${pizzaSelectUser.sauce.productName}</span>`;
    }
    else{
        get('sauce').innerHTML = '';
    }

    pizzaSelectUser.topping.forEach((el)=>{
        let a = get(el.name);
        let zIn = 1;
        // Вивід зображення начинок.
        console.log(a.id)
        if(a.id === 'moc1'||a.id === 'moc2'||a.id === 'moc3'){
            zIn = 2;
        }
        get('table-wrapper').appendChild(clon(a.id,a.src,zIn));
        toppin += `<span>${el.productName}</span>`;
    });
    // Вивід назви начинок.
    get('topping').innerHTML = toppin; 
    // Вивід загальної вартості піци. 
    document.getElementById('price').innerText = `${price} Грн.`;
    return price;
};

// Функція тест валідація.
const validate = (p, v) => p.test(v);

// Функція стилі вдалої валідації.
const validOk = (el) =>{
    el.classList.remove("error");
    el.classList.add("success");
};

// Функція стилі не вдалої валідації.
const validError = (el) =>{
    el.classList.remove("success");
    el.classList.add("error");
};




export { userSlectTopping,get,validate,validOk,validError,userRemovTopping,clonRemove}
