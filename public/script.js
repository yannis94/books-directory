let inputs = document.querySelectorAll("input")
let httpMethod = "POST"

window.addEventListener("load", function() {
    let booksDiv = document.querySelector("#datas")
    fetch(`${window.location.href}books`)
        .then(rep => rep.json())
        .then(data => {
            for (book in data) {
                h2 = document.createElement("h2")
                h2.innerText = data[book].title
                h3 = document.createElement("h3")
                h3.innerText = data[book].author
                p = document.createElement("p")
                p.innerText = data[book].editor
                div = document.createElement("div")
                div.dataset.id = book
                div.classList.add("book")
                div.appendChild(h2)
                div.appendChild(h3)
                div.appendChild(p)
                booksDiv.appendChild(div)

                div.addEventListener("click", function() {
                    
                    inputs[0].value = this.querySelector("h2").innerText
                    inputs[1].value = this.querySelector("h3").innerText
                    inputs[2].value = this.querySelector("p").innerText

                    btn = document.createElement("div")
                    btn.id = "delete"
                    btn.innerText = "Delete"
                    btn.dataset.id = this.dataset.id
                    btn.addEventListener("click", function() { delBook(this.dataset.id) })
                    document.querySelector('#formBook').appendChild(btn)

                    httpMethod = "PUT"
                })
            }
        })
        .catch(err => console.log(err))
    
})

function delBook(id) {
    fetch(`${window.location.href}books`, {
        headers: {
            "Content-Type": "text/plain"
        },
        method: "DELETE",
        body: id
    })
}

document.querySelector("#button").addEventListener("click", function() {

    let bookObj = {}

    if (httpMethod === "PUT") {
        bookObj[document.querySelector('#delete').dataset.id] = {}

        inputs.forEach(el => {
            if (el.value !== "") {
                bookObj[document.querySelector('#delete').dataset.id][el.id] = el.value
            }
            else {
                return false
            }
        });
    }
    else {
        inputs.forEach(el => {
            if (el.value !== "") {
                bookObj[el.id] = el.value
            }
            else {
                return false
            }
        });
    }


    fetch(`${window.location.href}books`, { 
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: httpMethod,
        body: JSON.stringify(bookObj) 
    })
        .catch(err => console.log(err))
})