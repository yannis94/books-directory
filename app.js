const http = require('http')
const host = '127.0.0.1'
const port = 8080

const server = http.createServer((req, response) => {
    console.log(req)
    response.statusCode = 200
    response.setHeader("Content-Type", "html")
    response.end("Hello friend")
})

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`)
})