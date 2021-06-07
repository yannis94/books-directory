const http = require('http')
const fs = require("fs")
const path = require("path")
const mime = require("./config/mimeType")

const host = '127.0.0.1'
const port = 8080

const server = http.createServer((req, res) => {
    console.log(req.url)
    
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

    //Files
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

    //API
    else if (directory === "/books") {
        if (req.method === 'GET') {
            //show info
            let fileData = ''
            const stream = fs.createReadStream("./books.json", 'UTF8')

            stream.on('data', chunk => {
                fileData += chunk
            })

            stream.on('end', ()=> {
                res.statusCode = 200
                res.setHeader("Content-Type", mime.json)
                res.end(fileData)
            })

        }
        else if (req.method === 'POST') {
            //post data
            let reqbody = ''


            req.on('data', chunk => {
                reqbody += chunk
            })
            req.on("end", () => {
                //write data in books.json
                newBookDatas = JSON.parse(reqbody)
                newBookId = Date.now()
                
                fileData = ''
            
                const stream = fs.createReadStream("./books.json", 'UTF8')

                stream.on('data', chunk => {
                        fileData += chunk
                })

                stream.on('end', ()=> {
                    data = JSON.parse(fileData)
                    data[newBookId] = newBookDatas
                    fs.writeFile("./books.json", JSON.stringify(data), err => console.log(err))
                    res.statusCode = 200
                    res.end()
                })
            })
            req.on("error", err => {
                res.statusCode = 501
                res.setHeader = "Content-Type: text/html"
                res.end("<h1>501, Internal server errors</h1>")
            })
        }
        else if (req.method === 'PUT') {
            //update data
            let reqbody = ''


            req.on('data', chunk => {
                reqbody += chunk
            })
            req.on("end", () => {
                updateContact = JSON.parse(reqbody)
                updateContactId = Object.keys(updateContact)[0]
                db = ''
            
                const stream = fs.createReadStream("./books.json", 'UTF8')

                stream.on('data', chunk => {
                    db += chunk
                })

                stream.on('end', ()=> {
                    data = JSON.parse(db)
                    data[updateContactId] = updateContact[updateContactId]
                    //data[newBookId] = newBookDatas
                    fs.writeFile("./books.json", JSON.stringify(data), err => console.log(err))
                    res.statusCode = 200
                    res.end()
                })
            })
        }
        else if (req.method === 'DELETE') {
            //delete data
        }
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


