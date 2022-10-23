import * as cookie from "./Cookies.js";

export function isAuth() {
    return true ? cookie.getCookie("authtoken") !== undefined : false
}

export function needAuth() {
    if (!isAuth()) {
        window.location.replace("https://backend.darklorian.ru/authorization")
    }
}

export function notNeedAuth() {
    if (isAuth()) {
        window.location.replace("https://backend.darklorian.ru/profile")
    }
}
