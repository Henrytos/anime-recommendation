const express = require("express")
const router = express.Router()

const { signInController } = require("./controllers/sign-in.controller.js")
const { signUpController } = require("./controllers/sign-up.controller.js")
const { upload } = require('../storage/upload-file.storage.js')

router.post('/sing-in', signInController)
router.post('/sing-up', upload.single('input_avatar_url'), signUpController)

module.exports = router