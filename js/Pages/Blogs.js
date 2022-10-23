import {sendRequest} from "../Handler.js";
import {deleteCookie, getCookie} from "../Cookies.js";

let request = sendRequest("/getinfo/", undefined, "get", {"authorization": "Token " + getCookie("authtoken")})
request.then(async r => {
    let json = await r.json()
    if (r.status == 401) {
        deleteCookie("authtoken")
        document.location.replace("https://backend.darklorian.ru/authorization")
    }
    if (r.ok) {
        document.getElementsByClassName("userlink")[0].textContent = json["response"][0]["username"];
    }
})

request = sendRequest("/", undefined, "get", {"authorization": "Token " + getCookie("authtoken")})
request.then(async r => {
    let json = await r.json()
    console.log(json)
    json.forEach(r => {
        let div = document.createElement("div");
        div.className = "post"

        let div_header = document.createElement("div")
        div_header.className = "post-header"

        let div_name = document.createElement("div")
        div_name.className = "post-name"
        div_header.appendChild(div_name)

        let a_name = document.createElement("a")
        a_name.textContent = r["title"]
        a_name.className = "post-title"
        div_name.appendChild(a_name)

        let a_blog = document.createElement("p")
        a_blog.textContent = "Владелец - " + r["owner_id"]
        div_name.appendChild(a_blog)

        let a_text = document.createElement("a")
        a_text.className = "post-text"
        a_text.textContent = r["description"]

        let p_date = document.createElement("p")
        p_date.textContent = new Date(r["created_at"]).toLocaleDateString()
        p_date.className = "date"

        div_header.appendChild(div_name)
        div.appendChild(a_blog);
        div.appendChild(div_header)
        div.appendChild(a_text)
        div.appendChild(p_date)
        document.getElementsByClassName("posts")[0].appendChild(div)
    })
})

export function createBlogs(e) {
    console.log(e)
    let data = new FormData(e)
    let r = sendRequest("/", data, "post", {"authorization": "Token " + getCookie("authtoken")});
    r.then(async resp => {
        let json = await resp.json()
        if (resp.ok) {
            document.getElementsByClassName("modal")[0].style.display = "none";
        }
    })
    return false;
}
