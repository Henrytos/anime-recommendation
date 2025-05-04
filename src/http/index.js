const { signInController } = require("./controllers/sign-in.controller.js")
const { signUpController } = require("./controllers/sign-up.controller.js")
const { uploadFileMiddleware } = require("./middlewares/upload-file.middleware.js")

const express = require("express")
const router = express.Router()

router.post('/sing-in', signInController)
router.post('/sing-up', uploadFileMiddleware, signUpController)

module.exports = router