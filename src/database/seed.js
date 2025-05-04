const { execute } = require("./connection.js")

async function seedUsers() {
    await execute("DELETE FROM users;")
    await execute(`INSERT INTO users(username, email, password_hash, avatar_url) VALUES 
        ('henry', 'henry@gmail.com', '123456', 'character-one.png'),
        ('ezequiel', 'ezequiel@gmail.com', '123456', 'character-two.png'),
        ('matheus', 'matheus@gmail.com', '123456', 'character-three.jpeg');
    `)

    console.log("seeding users done successfully👤")
}

seedUsers()