
import mysql from "mysql2/promise.js"

export const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT
});
