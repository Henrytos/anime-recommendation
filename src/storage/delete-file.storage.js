function deleteFileStorage(filename) {
    const pathFile = path.join(__dirname, '../', '../', 'uploads', filename)
    fs.unlinkSync(pathFile);
}

module.exports = {
    deleteFileStorage
}