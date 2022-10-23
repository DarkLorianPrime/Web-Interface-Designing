import {sendRequest} from "../Handler.js";
import {deleteCookie, getCookie} from "../Cookies.js";

export function setProfile() {
    let request = sendRequest("/getinfo/", undefined, "get", {"authorization": "Token " + getCookie("authtoken")})
    request.then(async r => {
        let json = await r.json()
        if (r.status == 401) {
            deleteCookie("authtoken")
            document.location.replace("https://backend.darklorian.ru/authorization")
        }
        if (r.ok) {
            document.getElementsByClassName("userlink_cabinet")[0].textContent = json["response"][0]["username"];
            document.getElementById("date").textContent = new Date(json["response"][0]["registration_data"]).toLocaleDateString()
        }
    })
    request = sendRequest("/posts/my/", undefined, "get", {"authorization": "Token " + getCookie("authtoken")})
    request.then(async r => {
        let json = await r.json()
        console.log(json)
        json["response"].forEach(r => {
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

            let a_blog = document.createElement("a")
            a_blog.textContent = r["blog_id"]
            div_name.appendChild(a_blog)

            let a_text = document.createElement("a")
            a_text.className = "post-text"
            a_text.textContent = r["text"]

            let image = document.createElement("img")
            image.src = "media/images/example_logo.png"
            image.classList = ["userlogo cabinet"]

            let p_date = document.createElement("p")
            p_date.textContent = new Date(r["created_at"]).toLocaleDateString()
            p_date.className = "date"

            div_header.appendChild(image)
            div_header.appendChild(div_name)
            div.appendChild(div_header)
            div.appendChild(a_text)
            div.appendChild(p_date)
            document.getElementsByClassName("posts")[0].appendChild(div)
        })
    })
}
setProfile()
