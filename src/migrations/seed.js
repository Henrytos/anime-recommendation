const { createConnection } = require("mysql2/promise.js");

async function seedInDatabase() {
  const client = await createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
  });

  const queryToDeleteUsers = "DELETE FROM users;";
  await client.query(queryToDeleteUsers);

  const users = [
    {
      username: "henry_dev",
      email: "henry@gmail.com",
      password: "123456",
      avatarUrl: "henry-profile.png",
    },
    {
      username: "nathalia",
      email: "nathalia@gmail.com",
      password: "123456",
      avatarUrl: "nathalia-profile.png",
    },
  ];

  for (let position = 0; position < users.length; position++) {
    let user = users[position];
    let queryToCreateUser = `INSERT INTO users (username, email, password_hash, avatar_url)
    VALUES ('${user.username}', '${user.email}', '${user.password}', '${user.avatarUrl}');`;

    await client.query(queryToCreateUser);
    console.log(`insert user ${user.username} ✅`);
  }

  const queryToDeleteAnimes = "DELETE FROM animes;";
  await client.query(queryToDeleteAnimes);

  const animes = [
    {
      apiAnimeId: 40748,
      title: "Jujutsu Kaisen",
      imageUrl: "https://cdn.myanimelist.net/images/anime/1171/109222l.jpg",
      description:
        "Idly indulging in baseless paranormal activities with the Occult Club, high schooler Yuuji Itadori spends his days at..",
      targetAudience: "Shounen",
      gender: "Action",
    },
  ];

  for (let position = 0; position < animes.length; position++) {
    let anime = animes[position];

    let queryToCreateAnime = `INSERT INTO animes ( api_anime_id, title, image_url, description, target_audience, gender)
        VALUES (${anime.apiAnimeId}, '${anime.title}', '${anime.imageUrl}', '${anime.description}', '${anime.targetAudience}', '${anime.gender}');
`;

    await client.query(queryToCreateAnime);
    console.log(`insert anime ${anime.title} ✅`);
  }

  const queryToDeleteQUizzes = "DELETE FROM quizzes;";
  await client.query(queryToDeleteQUizzes);

  const quizzes = [
    {
      title: "Qual anime combina com você?",
      description: "Responda para saber qual anime é a sua cara.",
      thumbUrl:
        "https://m.media-amazon.com/images/S/pv-target-images/1a28caac129bed86dbf1fe3d474c2017379e39f5aac7082123ecc39ed6ce16b5.jpg",
      isMapping: true,
    },
  ];

  for (let position = 0; position < animes.length; position++) {
    let quiz = quizzes[position];

    let queryToCreateQUiz = `
    INSERT INTO quizzes (title, description, thumb_url,is_mapping)
      VALUES 
      ('${quiz.title}', '${quiz.description}','${quiz.thumbUrl}', ${quiz.isMapping});

`;

    await client.query(queryToCreateQUiz);
    console.log(`insert quiz ${quiz.title} ✅`);
  }

  console.log("closing database connection ✅");
  await client.end();
  return;
}

seedInDatabase();
