import {sendRequest} from "./Handler.js";
import {deleteCookie, getCookie} from "./Cookies.js";

export function get_info() {
    let request = sendRequest("/getinfo/", undefined, "get",  get_header_auth())
    request.then(async r => {
        let json = await r.json()
        if (r.status === 401) {
            deleteCookie("authtoken")
            document.location.replace("https://backend.darklorian.ru/authorization")
        }
        if (r.ok) {
            document.getElementsByClassName("userlink")[0].textContent = json["response"][0]["username"];
        }
    })
}

export function get_header_auth() {
    return {"authorization": "Token " + getCookie("authtoken")}
}