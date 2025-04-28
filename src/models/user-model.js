import { connection } from "../database/connection.js"

export async function createUser({ name, email, imageUrl }) {
    console.log("function createUser(){...}")
    await connection.query("SHOW TABLES;") // code sql name, email, imageUrl
}

export async function saveUser({ id, name, email, imageUrl }) {
    console.log("function saveUser(){...}")
    await connection.query("SHOW TABLES;") // code sql
}

export async function deleteUser({ id }) {
    console.log("function deleteUser(){...}")
    await connection.query("SHOW TABLES;") // code sql
}

export async function getUser({ id }) {
    console.log("function getUser(){...}")
    await connection.query("SHOW TABLES;") // code sql
}