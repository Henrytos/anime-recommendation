const multer = require("multer")
const crypto = require("node:crypto")

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        const extensions = file.originalname.split('.')[1]
        const filename = crypto.randomBytes(64).toString("hex")

        cb(null, `${filename}.${extensions}`)
    }
})

const upload = multer({
    storage
})

module.exports = { upload }