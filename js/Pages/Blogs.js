import {sendRequest} from "../Handler.js";
import {get_header_auth, get_info} from "../utils.js";

get_info()

let request = sendRequest("/", undefined, "get", get_header_auth())
request.then(async r => {
    let json = await r.json()
    json.forEach(r => {
        let div = document.createElement("div");
        div.className = "blog"
        div.onclick = () => document.location.replace(`https://backend.darklorian.ru/posts?blog_id=${r["id"]}`)
        let img = document.createElement("img");
        img.src = "static/img/picture-message.png"
        img.width = "40";
        img.height = "40";
        img.style.marginRight = "30px"

        let div_header = document.createElement("div")
        div_header.className = "post-header"

        let div_name = document.createElement("div")
        div_name.className = "post-name"
        div_header.appendChild(div_name)

        let a_name = document.createElement("a")
        a_name.textContent = r["title"]
        a_name.className = "post-title"
        a_name.style.fontSize = "20px";
        div_name.appendChild(a_name)
        let a_left_content = document.createElement("div");

        let a_blog = document.createElement("p")
        a_blog.textContent = r["owner_id"]
        div_name.appendChild(a_blog)

        let a_text = document.createElement("a")
        a_text.className = "post-text"
        a_text.textContent = r["description"]
        a_text.style.fontSize = "16px";
        div_name.appendChild(a_text)

        let p_date = document.createElement("p")
        p_date.textContent = new Date(r["created_at"]).toLocaleDateString()
        p_date.className = "date"

        a_left_content.appendChild(a_blog);
        a_left_content.appendChild(p_date)
        div_header.appendChild(div_name)
        div.appendChild(img);
        div.appendChild(div_header)
        div.appendChild(a_left_content)
        document.getElementsByClassName("posts")[0].appendChild(div)
        let blogs_list = document.getElementsByClassName("blog");

        blogs_list[blogs_list.length - 1].addEventListener("mousedown", function (event) {
            if (event.button === 2) {
                console.log(event.pageX, event.pageY)
                sendRequest(`/${r["ud"]}/`, undefined, )
                return false;
            }
        })
    })
})

export function createBlogs(e) {
    console.log(e)
    let data = new FormData(e)
    let r = sendRequest("/", data, "post",  get_header_auth());
    r.then(async resp => {
        if (resp.ok) {
            document.getElementsByClassName("modal")[0].style.display = "none";
        }
    })
    document.location.reload()
    return false;
}
