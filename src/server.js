const express = require("express")
const cors = require("cors")
const router = require("./http/index.js")
const path = require("node:path")


const app = express()
const PORT = process.env.HOST_PORT

app.use(cors())
app.use(express.json())
app.use(router)
app.use(express.static(path.join(__dirname, '/public')))

app.listen(PORT, async () => {
    console.log(`Server running http://localhost:${PORT}`)
})