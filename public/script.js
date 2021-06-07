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
            }
        })
        .catch(err => console.log(err))
    
})

document.querySelector("#button").addEventListener("click", function() {

    inputs = document.querySelectorAll("input")

    let bookObj = {}

    inputs.forEach(el => {
        if (el.value !== "") {
            bookObj[el.id] = el.value
        }
        else {
            return false
        }
    });


    fetch(`${window.location.href}books`, { 
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method:"POST",
        body: JSON.stringify(bookObj) 
    })
        .catch(err => console.log(err))
})