const http = require('http')
const fs = require("fs")
const path = require("path")

const host = '127.0.0.1'
const port = 8080

const server = http.createServer((req, res) => {
    console.log(req.url)
    //console.log(path.dirname(path.dirname(req.url)))
    let directory = req.url
    while(path.dirname(directory) !== "/") {
        directory = path.dirname(directory)
    }
    
    if (directory === "/") {
        fs.readFile("./index.html", (err, file) => {
            if (err) {
                res.statusCode = 404
                res.setHeader("Content-Type", 'text/html')
                res.end("<h1>404, Not-found")
            }
            else {
                res.statusCode = 200
                res.setHeader("Content-Type", 'text')
                res.end(file)
            }
        })
    }
    else if (directory === "/public") {
        console.log("some path")
        fs.readFile(`./${req.url}`, (err, file) => {
            if (err) {
                res.statusCode = 404
                res.setHeader("Content-Type", 'text/html')
                res.end("<h1>404, Not-found")
            }
            else {
                res.statusCode = 200
                //res.setHeader("Content-Type", 'text')
                res.end(file)
            }
        })
    }

    else {
        res.statusCode = 403
        res.setHeader("Content-Type", 'text/html')
        res.end("<h1>403, Acces forbiden")
    }

})

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`)
})


