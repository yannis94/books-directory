const http = require('http')
const fs = require("fs")
const path = require("path")
const mime = require("./config/mimeType")

const host = '127.0.0.1'
const port = 8080


const server = http.createServer((req, res) => {
    
    let directory = req.url
    while(path.dirname(directory) !== "/") {
        directory = path.dirname(directory)
    }
    
    if (directory === "/") {
        fs.readFile("./index.html", (err, file) => {
            if (err) {
                res.statusCode = 404
                res.setHeader("Content-Type", 'text/html')
                res.end("<h1>404, Not-found</h1>")
            }
            else {
                res.statusCode = 200
                res.setHeader("Content-Type", 'text')
                res.end(file)
            }
        })
    }
    else if (directory === "/public") {
        
        //set file extension & find the content-type html header

        let ext = path.extname(req.url).replace(".", "")

        let fileData = ''
        const stream = fs.createReadStream(`./${req.url}`, 'UTF8')

        stream.on('data', chunk => {
                fileData += chunk
        })

        stream.on('end', ()=> {
            res.statusCode = 200
            res.setHeader("Content-Type", mime[ext])
            res.end(fileData)
        })
    }

    else {
        res.statusCode = 403
        res.setHeader("Content-Type", 'text/html')
        res.end("<h1>403, Acces forbiden</h1>")
    }

})

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`)
})


