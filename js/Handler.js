let backend_url = "https://backend.darklorian.ru/api/v1"

export function sendRequest(url, formdata, method, headers) {

    return fetch(backend_url + url,
        {
            method: method,
            body: formdata,
            headers: headers
        })
}
