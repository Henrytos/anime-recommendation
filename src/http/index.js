
const { Router } = require("express")
const fs = require("node:fs")
const path = require("node:path")

const upload = require('../storage/upload-file.js')
const { findByEmail, createUser } = require("../models/user-model")

const router = Router()

router.post('/sing-in', async (req, res) => {
    const { email, password } = req.body

    const user = await findByEmail(email)
    const isMatchPassword = user.password_hash != password

    if (isMatchPassword) {
        return res.status(400).json({
            message: "incorrect credentials"
        })
    }

    return res.status(200).json({
        message: "entry successful",
        user,
    })
})

router.post('/sing-up', upload.single('input_avatar_url'), async (req, res) => {
    const { name, email, password } = req.body
    const imageUrl = req.file.filename

    const userWithEmail = await findByEmail(email)

    if (userWithEmail) {
        const pathFile = path.join(__dirname, '../', '../', 'uploads', imageUrl)
        fs.unlinkSync(pathFile);

        return res.status(400).json({
            message: "there is a user with this email"
        })
    }

    await createUser(name, email, password, imageUrl)

    return res.status(201).json({
        message: "user created successfully"
    })
})

module.exports = router