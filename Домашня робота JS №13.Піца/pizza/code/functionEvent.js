import {userSlectTopping,validate,validOk,validError} from "./functions.js"
import {user} from "./index.js"

// Функція перевірки розміру коржа.
export function clickInputSize(e) {
    if(e.target.tagName === "INPUT"){
        userSlectTopping(e.target.value)
    }
};

// Функція перевірки данних користувача.
export function userData (el){
    if(el.type === "text" && validate(/^[а-яієґї'-]{2,}$/ig, el.value)){
        user.name = el.value;
        validOk(el);
    }
    else if(el.type === "tel" && validate(/^\+\d{12}$/ig, el.value)){
        user.phone = el.value
        validOk(el);
    }else if(el.type === "email" && validate(/^[a-z_.0-9]+@[a-z0-9-.]+\.[a-z.]+$/ig, el.value)){
        user.email = el.value
        validOk(el);
    }else{
        validError(el)
    }
};