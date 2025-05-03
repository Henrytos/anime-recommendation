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
        connection.end()
        return { results, fields }
    } catch (err) {
        connection.end()
        console.log(err);
    }
}


module.exports = { execute }
