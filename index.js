const mysql = require("mysql2/promise")

async function execute(query) {

    const connection = await mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
        port: process.env.DATABASE_PORT
    })
    connection.connect()

    try {
        const [results, fields] = await connection.query(query);

        return { results, fields }
    } catch (err) {
        console.log(err);
    }
}



async function findByEmail(email) {
    const { results } = await execute(`SELECT email FROM users WHERE email = '${email}'`) // code sql
    return results[0]
}

findByEmail("franzhenry@gmail.com")


async function createUser(username, email, password_hash, image_url) {
    try {
        await execute(`INSERT INTO users(username, email, password_hash, image_url) VALUES ('${username}', '${email}', '${password_hash}', '${image_url}');`)

        return true
    } catch (error) {
        console.log(error)

        return false
    }
}

createUser("davi", "ada@gmail.com", "ne9u12b9ŕfb w3r", "fot.png")