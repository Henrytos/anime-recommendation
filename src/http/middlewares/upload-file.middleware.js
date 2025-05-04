const { upload } = require("../../storage/upload-file.storage.js")

function uploadFileMiddleware(fieldName) {

    return upload.single(fieldName)
}

module.exports = { uploadFileMiddleware }