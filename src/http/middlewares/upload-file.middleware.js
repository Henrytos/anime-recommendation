function uploadFileMiddleware() {

    return upload.single('input_avatar_url')
}

module.exports = { uploadFileMiddleware }