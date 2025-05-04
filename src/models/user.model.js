const { execute } = require("../database/connection.js")

async function createUser(username, email, password, avatarUrl) {
    try {
        await execute(`INSERT INTO users(username, email, password_hash, avatar_url) VALUES ('${username}', '${email}', '${password}', '${avatarUrl}');`)

        return true
    } catch (error) {
        console.log(error)

        return false
    }
}

async function findByEmail(email) {
    const { results } = await execute(`SELECT * FROM users WHERE email = '${email}'`) // code sql
    return results[0]
}

module.exports = {
    createUser,
    findByEmail
}