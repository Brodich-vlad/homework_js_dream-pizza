import {clickInputSize,userData} from "./functionEvent.js"
import {userSlectTopping,get,userRemovTopping,clonRemove} from "./functions.js"

// Обрати розмір коржа для піци.
get("pizza").addEventListener("click", clickInputSize);

// Шукаємо всі начінки.
document.querySelectorAll(".draggable").forEach((el)=>{
    // Вішаемо подію "dragstart" початок перетягування.
    el.addEventListener("dragstart", function (evt) {
        // Передаємо id перетягуємого об'єкта
        evt.dataTransfer.setData("Text", this.id);
    }, false);
});

// Знаходимо цільовий елемент для додавання елементів.
const table = get("table-wrapper");

// Об'єкт, що перетягується, потрапляє в область цільового елемента.
table.addEventListener("dragenter", function () {
    // Додаємо стилі до цільового елемента.
    this.style.background = "rgba(214, 209, 200, 0.541)";
}, false);
    
// Об'єкт, що перетягується, залишає область цільового елемента.
table.addEventListener("dragleave", function () {
    this.style.background  = "";
}, false);

// Об'єкт, що перетягується, знаходиться над цільовим елементом.
table.addEventListener("dragover", function (evt) {
    if (evt.preventDefault) evt.preventDefault();
    return false;
}, false);

 // Об'єкт, що перетягується, відпущений над цільовим елементом.
table.addEventListener("drop", function (evt) {
    if (evt.preventDefault) evt.preventDefault();
    if (evt.stopPropagation) evt.stopPropagation();
    // Отриманні данні передаємо у функцію
    userSlectTopping(evt.dataTransfer.getData("Text"));
    // Прибираємо стилі.
    this.style.background  = "";  
    return false;
}, false);

// Знаходимо цільовий елемент для видалення елементів.
const  body = get('body');

// Об'єкт, що перетягується, знаходиться над цільовим елементом.
body.addEventListener("dragover", function (evt) {
    if (evt.preventDefault) evt.preventDefault();
    return false;
}, false);

 // Об'єкт, що перетягується, відпущений над цільовим елементом.
body.addEventListener("drop", function (evt) {
    if (evt.preventDefault) evt.preventDefault();
    if (evt.stopPropagation) evt.stopPropagation();
    // Отриманні данні передаємо у функцію видалення елементів.
    let clonId = evt.dataTransfer.getData("Text")
    userRemovTopping(clonId);
    clonRemove(clonId);
    // Прибираємо стилі.
    this.style.background  = "";  
    return false;
}, false);

// Піца яку зібрав користувач.
export const pizzaSelectUser = {
   size : "",
   topping : [],
   sauce : "",
   price : 0
}

// Данні користувача.
export const user = {
    name : "",
    phone: "",
    email: "",
}

// Шукаємо поля форми.
document.querySelectorAll('#info  INPUT').forEach((input)=>{
    input.addEventListener("blur", (e) => {userData(e.target);});
});

// Функція впіймай знижку.
get('banner').addEventListener("mousemove",(e)=>{
    e.target.style = `bottom: ${Math.floor(Math.random()*70 + 3)}%;`+`right: ${Math.floor(Math.random()*65 + 3)}%;`;
});
