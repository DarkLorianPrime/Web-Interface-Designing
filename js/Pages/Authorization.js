import {sendRequest} from "../Handler.js";
import {setCookie} from "../Cookies.js";

function seterror(text) {
    document.getElementsByClassName("dop")[0].textContent = text
    document.getElementsByClassName("dop")[0].style.color = "darkred"
}

export function onsubmit_custom(e) {
    let formdata = new FormData(e)
    e.childNodes.forEach((d) => {
        if (["login", "registration"].indexOf(d.name) != -1) {
            let response = sendRequest("/" + d.name + "/", formdata, "post")
            response.then(async response => {
                if (response.statusText == "Unprocessable Entity") {
                    seterror("Вы не ввели логин или пароль.")
                } else {
                    let response_json = await response.json()
                    if (!response.ok) {
                        seterror(response_json["detail"]["error"])
                    } else {
                        setCookie("authtoken", response_json["response"])
                        document.location.replace("https://backend.darklorian.ru/authorization")
                    }
                }
            })
            return false;
        }
    })
    return false;
}

export function onclick_custom(e) {
    let input = document.createElement('input');
    input.name = e
    input.type = "hidden"
    document.getElementById("authform").appendChild(input);
}
