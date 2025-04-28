import express from 'express'
import cors from 'cors'
import { getProfile } from './http/controllers/get-profile.js'
import { router } from './http/index.js'

const app = express()
const PORT = process.env.HOST_PORT

app.use(express.json())
app.use(cors())
app.use(router)

app.listen(PORT, async () => {
    console.log(`Server running http://localhost:${PORT}`)
})