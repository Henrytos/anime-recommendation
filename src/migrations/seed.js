const { createConnection } = require("mysql2/promise");

async function seedInDatabase() {
  const client = await createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
  });

  await client.query("DELETE FROM quiz_result;");
  await client.query("DELETE FROM alternatives;");
  await client.query("DELETE FROM questions;");
  await client.query("DELETE FROM comments;");
  await client.query("DELETE FROM animes;");
  await client.query("DELETE FROM quizzes;");
  await client.query("DELETE FROM users;");

  // USERS
  const users = [
    {
      username: "henry_dev",
      email: "henry@gmail.com",
      password: "123456",
      avatarUrl: "https://example.com/avatar1.png",
    },
    {
      username: "nathalia_art",
      email: "nathalia@gmail.com",
      password: "123456",
      avatarUrl: "https://example.com/avatar2.png",
    },
  ];
  for (let position = 0; position < users.length; position++) {
    let user = users[position]

    await client.query(
      `INSERT INTO users (username, email, password_hash, avatar_url)
      VALUES ('${user.username}', '${user.email}', SHA2('${user.password}', 512), '${user.avatarUrl}')`
    );
  }

  // QUIZZES
  await client.query(
    `INSERT INTO quizzes (title, description, thumb_url, is_mapping)
    VALUES (?, ?, ?, ?)`,
    [
      "Qual anime combina com você?",
      "Responda para saber qual anime é a sua cara.",
      "https://m.media-amazon.com/images/S/pv-target-images/1a28caac129bed86dbf1fe3d474c2017379e39f5aac7082123ecc39ed6ce16b5.jpg",
      true,
    ]
  );

  // ANIMES
  const animes = [
    {
      anime_id: 101,
      title: "Jujutsu Kaisen",
      image_url: "https://upload.wikimedia.org/wikipedia/pt/thumb/4/4b/Jujutsu_Kaisen_Cover.png/250px-Jujutsu_Kaisen_Cover.png",
      description: "Feiticeiros enfrentam maldições com ação intensa.",
      target_audience: "shounen",
      gender: "ação",
    },
    {
      anime_id: 102,
      title: "Kimi ni Todoke",
      image_url: "https://imusic.b-cdn.net/images/item/original/550/9781421527550.jpg?karuho-shiina-2009-kimi-ni-todoke-from-me-to-you-vol-1-kimi-ni-todoke-from-me-to-you-paperback-book&class=scaled&v=1398257494",
      description: "Romance delicado entre adolescentes.",
      target_audience: "shoujo",
      gender: "romance",
    },
  ];
  for (let position = 0; position < animes.length; position++) {
    let anime = animes[position]

    await client.query(
      `INSERT INTO animes (anime_id, title, image_url, description, target_audience, gender)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        anime.anime_id,
        anime.title,
        anime.image_url,
        anime.description,
        anime.target_audience,
        anime.gender,
      ]
    );
  }

  // COMMENTS
  const comments = [
    {
      comment_id: 1,
      fk_anime_id: 101,
      fk_user_id: 1,
      description: "Anime incrível, cheio de ação!",
    },
    {
      comment_id: 2,
      fk_anime_id: 102,
      fk_user_id: 2,
      description: "Muito fofo e emocionante.",
    },
  ];
  for (let position = 0; position < 30; position++) {

    let min = 0, max = comments.length
    let interval = max - min
    let randomPosition = Math.floor(Math.random() * interval)
    let result = comments[randomPosition]

    await client.query(
      `INSERT INTO comments (comment_id, fk_anime_id, fk_user_id, description)
      VALUES (DEFAULT, ${result.fk_anime_id}, ${result.fk_user_id}, '${result.description}')`,
    );
  }

  // QUESTIONS
  const questions = [
    {
      fk_quiz_id: 1000,
      title: "Qual estilo de anime você prefere?",
      number: 1,
    },
    {
      fk_quiz_id: 1000,
      title: "Prefere ação ou romance?",
      number: 2,
    },
  ];
  for (let position = 0; position < questions.length; position++) {
    let question = questions[position]

    await client.query(
      `INSERT INTO questions (fk_quiz_id, title, number)
      VALUES (?, ?, ?)`,
      [question.fk_quiz_id, question.title, question.number]
    );
  }

  // ALTERNATIVES
  const alternatives = [
    {
      alternative_id: 1,
      title: "ISEKAI",
      description:
        "histórias onde um protagonista é transportado para um mundo diferente, seja por teletransporte, reencarnação ou outros meios.",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh5mrA2nP6KCjb4Hk2_gjZvwE7s8ED7xg6pg&s",
      is_correct: true,
      target_audience: "shounen",
      gender: "comédia",
      fk_question_id: 1,
      fk_quiz_id: 1000,
    },
    {
      alternative_id: 2,
      title: "SHOUNEN",
      description:
        "caracterizado por histórias de ação, aventura e luta, com personagens muitas vezes motivados por objetivos importantes e que destacam valores como amizade, lealdade e coragem",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsi1ZgWlAzBWWDc3KPWJNIuHVTIIRZ_wO9hg&s",
      is_correct: true,
      target_audience: "shounen",
      gender: "ação",
      fk_question_id: 1,
      fk_quiz_id: 1000,
    },
    {
      alternative_id: 3,
      title: "GORE",
      description:
        "O gore é um dos subgêneros mais extremos do horror, proporcionando experiências chocantes e marcadas por um forte impacto visual e ..",
      image_url:
        "https://m.media-amazon.com/images/S/pv-target-images/286a0e266e2521f56a810653db79e2dfa4de7e9f80286b321085bcf9e75f43fb._SX1080_FMjpg_.jpg",
      is_correct: true,
      target_audience: "shounen",
      gender: "drama",
      fk_question_id: 1,
      fk_quiz_id: 1000,
    },
    {
      alternative_id: 4,
      title: "SPORTS",
      description:
        "Anime onde enredo principal gira entorno de um esporte",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_wXgz45gUcu4fiG6L3jkMq0BTaUhoR4y49A&s",
      is_correct: true,
      target_audience: "shounen",
      gender: "ação",
      fk_question_id: 1,
      fk_quiz_id: 1000,
    },
    // Repete para question_id 2
    {
      alternative_id: 1,
      title: "ISEKAI",
      description:
        "histórias onde um protagonista é transportado para um mundo diferente, seja por teletransporte, reencarnação ou outros meios.",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh5mrA2nP6KCjb4Hk2_gjZvwE7s8ED7xg6pg&s",
      is_correct: true,
      target_audience: "shounen",
      gender: "comédia",
      fk_question_id: 2,
      fk_quiz_id: 1000,
    },
    {
      alternative_id: 2,
      title: "SHOUNEN",
      description:
        "caracterizado por histórias de ação, aventura e luta, com personagens muitas vezes motivados por objetivos importantes e que destacam valores como amizade, lealdade e coragem",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsi1ZgWlAzBWWDc3KPWJNIuHVTIIRZ_wO9hg&s",
      is_correct: true,
      target_audience: "shounen",
      gender: "ação",
      fk_question_id: 2,
      fk_quiz_id: 1000,
    },
    {
      alternative_id: 3,
      title: "GORE",
      description:
        "O gore é um dos subgêneros mais extremos do horror, proporcionando experiências chocantes e marcadas por um forte impacto visual e ..",
      image_url:
        "https://m.media-amazon.com/images/S/pv-target-images/286a0e266e2521f56a810653db79e2dfa4de7e9f80286b321085bcf9e75f43fb._SX1080_FMjpg_.jpg",
      is_correct: true,
      target_audience: "shounen",
      gender: "drama",
      fk_question_id: 2,
      fk_quiz_id: 1000,
    },
    {
      alternative_id: 4,
      title: "SPORTS",
      description:
        "Anime onde enredo principal gira entorno de um esporte",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_wXgz45gUcu4fiG6L3jkMq0BTaUhoR4y49A&s",
      is_correct: true,
      target_audience: "shounen",
      gender: "ação",
      fk_question_id: 2,
      fk_quiz_id: 1000,
    },
  ];
  for (let position = 0; position < alternatives.length; position++) {
    let alt = alternatives[position]

    await client.query(
      `INSERT INTO alternatives (alternative_id, title, description, image_url, is_correct, target_audience, gender, fk_question_id, fk_quiz_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        alt.alternative_id,
        alt.title,
        alt.description,
        alt.image_url,
        alt.is_correct,
        alt.target_audience,
        alt.gender,
        alt.fk_question_id,
        alt.fk_quiz_id,
      ]
    );
  }

  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  // QUIZ RESULT


  const quizResults = [
    { fk_user_id: 1, fk_quiz_id: 1000, fk_anime_id: 101, created_at: `${year}-${month}-${day} ${hour}-${minutes}-${seconds}` },
    { fk_user_id: 1, fk_quiz_id: 1000, fk_anime_id: 102, created_at: `${year}-${month}-${day - 1} ${hour}-${minutes}-${seconds}` },
    { fk_user_id: 1, fk_quiz_id: 1000, fk_anime_id: 101, created_at: `${year}-${month}-${day - 2} ${hour}-${minutes}-${seconds}` },
    { fk_user_id: 1, fk_quiz_id: 1000, fk_anime_id: 101, created_at: `${year}-${month}-${day - 3} ${hour}-${minutes}-${seconds}` },
    { fk_user_id: 1, fk_quiz_id: 1000, fk_anime_id: 102, created_at: `${year}-${month}-${day - 4} ${hour}-${minutes}-${seconds}` },
    { fk_user_id: 1, fk_quiz_id: 1000, fk_anime_id: 101, created_at: `${year}-${month}-${day - 5} ${hour}-${minutes}-${seconds}` },
    { fk_user_id: 1, fk_quiz_id: 1000, fk_anime_id: 101, created_at: `${year}-${month}-${day - 6} ${hour}-${minutes}-${seconds}` },
  ];
  for (let position = 0; position < 40; position++) {

    let min = 0, max = quizResults.length
    let interval = max - min
    let randomPosition = Math.floor(Math.random() * interval)
    let result = quizResults[randomPosition]

    await client.query(
      `INSERT INTO quiz_result (fk_user_id, fk_quiz_id, fk_anime_id, created_at)
      VALUES (?, ?, ?, ?)`,
      [result.fk_user_id, result.fk_quiz_id, result.fk_anime_id, result.created_at]
    );
  }

  console.log("seed database ✅");

  const queryToDeleteViewCommentsUsers = `DROP VIEW IF EXISTS users_comments`
  await client.query(queryToDeleteViewCommentsUsers)

  const queryToDeleteViewRecommendationsUsers = `DROP VIEW IF EXISTS users_recommendations`
  await client.query(queryToDeleteViewRecommendationsUsers)

  const queryToDeleteViewRecommendationsLastWeekUsers = `DROP VIEW IF EXISTS users_recommendations_last_week`
  await client.query(queryToDeleteViewRecommendationsLastWeekUsers)

  const queryToDeleteViewUserMetricsQuizzesWeek = `DROP VIEW IF EXISTS users_metrics_quizzes_week`
  await client.query(queryToDeleteViewUserMetricsQuizzesWeek)

  const queryToCreateViewCommentsUses = `CREATE VIEW users_comments AS SELECT users.user_id, users.username, users.avatar_url, comments.description, comments.created_at, comments.fk_anime_id as anime_id FROM users JOIN comments ON users.user_id = comments.fk_user_id JOIN animes ON animes.anime_id = comments.fk_anime_id;`
  await client.query(queryToCreateViewCommentsUses)

  const queryToCreateViewRecommendationsLastWeekUsers = `CREATE VIEW users_recommendations_last_week AS SELECT quiz_result.fk_user_id AS 'user_id',COUNT(fk_user_id) AS 'quantity', DAY(quiz_result.created_at) AS 'date' FROM quiz_result GROUP BY quiz_result.fk_user_id, DAY(quiz_result.created_at);`
  await client.query(queryToCreateViewRecommendationsLastWeekUsers)

  const queryToCreateViewRecommendationsUsers = `CREATE VIEW users_recommendations AS SELECT quiz_result.fk_user_id as user_id,title, image_url, anime_id FROM quiz_result JOIN animes ON quiz_result.fk_anime_id = animes.anime_id;`
  await client.query(queryToCreateViewRecommendationsUsers)

  const querytoCreateViewuUserMetricsQuizzesWeek = `
    CREATE VIEW users_metrics_quizzes_week AS SELECT
    fk_user_id AS user_id,
    COUNT(*) AS 'quantity',
    CASE
      WHEN DAY(created_at) = DAY(NOW()) THEN "hoje"
      WHEN DAYNAME(created_at) = "Monday" THEN "segunda-feira"
      WHEN DAYNAME(created_at) = "Tuesday" THEN "terça-feira"
      WHEN DAYNAME(created_at) = "Wednesday" THEN "quarta-feira"
      WHEN DAYNAME(created_at) = "Thursday" THEN "quinta-feira"
      WHEN DAYNAME(created_at) = "Friday" THEN "sexta-feira"
      WHEN DAYNAME(created_at) = "Saturday" THEN "sábado"
      WHEN DAYNAME(created_at) = "Sunday" THEN "domingo"
    END AS date
    FROM quiz_result
    WHERE TIMESTAMPDIFF(DAY,created_at, NOW()) < 7
    GROUP BY DAY(created_at), MONTH(created_at), date, fk_user_id
    ORDER BY MONTH(created_at) ASC, DAY(created_at) ASC;
  `
  await client.query(querytoCreateViewuUserMetricsQuizzesWeek)

  console.log("create views ✅")

  await client.end();
}


seedInDatabase();