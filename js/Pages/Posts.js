import {sendRequest} from "../Handler.js";
import {getCookie} from "../Cookies.js";
import {get_info} from "../utils.js";

get_info()

const blog_id = new URLSearchParams(window.location.search)
if (!blog_id.has("blog_id")) {
    document.location.replace("https://backend.darklorian.ru/")
}
let get_blog = sendRequest(`/${blog_id.get("blog_id")}/`, undefined, "get", {"authorization": "Token " + getCookie("authtoken")})
get_blog.then(async resp => {
    let json = await resp.json();
    console.log(json)
    if (resp.ok) {
        document.getElementsByClassName("blogs_name")[0].textContent = json["response"]["blog"][0]["title"]
    }
})

export function createPosts(e) {
    console.log(e)
    let data = new FormData(e)
    let r = sendRequest(`/${blog_id.get("blog_id")}/posts/`, data, "post", {"authorization": "Token " + getCookie("authtoken")});
    r.then(async resp => {
        let json = await resp.json()
        if (resp.ok) {
            document.getElementsByClassName("modal")[0].style.display = "none";
        }
    })
    document.location.reload()
    return false;
}

let request = sendRequest(`/${blog_id.get("blog_id")}/posts/`, undefined, "get", {"authorization": "Token " + getCookie("authtoken")})
request.then(async r => {
    let json = await r.json()
    console.log(json["posts"])
    json["posts"].forEach(r => {
        r = r[0]
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
