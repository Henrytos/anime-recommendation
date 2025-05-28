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
      image_url: "https://example.com/jjk.jpg",
      description: "Feiticeiros enfrentam maldições com ação intensa.",
      target_audience: "shounen",
      gender: "ação",
    },
    {
      anime_id: 102,
      title: "Kimi ni Todoke",
      image_url: "https://example.com/knt.jpg",
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
  for (let position = 0; position < comments.length; position++) {
    let comment = comments[position]

    await client.query(
      `INSERT INTO comments (comment_id, fk_anime_id, fk_user_id, description)
      VALUES (DEFAULT, ${comment.fk_anime_id}, ${comment.fk_user_id}, '${comment.description}')`,
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

  // QUIZ RESULT
  const quizResults = [
    { fk_user_id: 1, fk_quiz_id: 1000, fk_anime_id: 101 },
    { fk_user_id: 2, fk_quiz_id: 1000, fk_anime_id: 102 },
  ];
  for (let position = 0; position < quizResults.length; position++) {
    let result = quizResults[position]

    await client.query(
      `INSERT INTO quiz_result (fk_user_id, fk_quiz_id, fk_anime_id)
      VALUES (?, ?, ?)`,
      [result.fk_user_id, result.fk_quiz_id, result.fk_anime_id]
    );
  }

  console.log("seed database ✅");

  const queryToDeleteViewCommentsUsers = `DROP VIEW IF EXISTS users_comments`
  await client.query(queryToDeleteViewCommentsUsers)

  const queryToDeleteViewRecommendationsUsers = `DROP VIEW IF EXISTS users_recommendations`
  await client.query(queryToDeleteViewRecommendationsUsers)

  const queryToDeleteViewRecommendationsLastWeekUsers = `DROP VIEW IF EXISTS users_recommendations_last_week`
  await client.query(queryToDeleteViewRecommendationsLastWeekUsers)

  const queryToCreateViewCommentsUses = `CREATE VIEW users_comments AS SELECT users.user_id, users.username, users.avatar_url, comments.description, comments.created_at, comments.fk_anime_id as anime_id FROM users JOIN comments ON users.user_id = comments.fk_user_id JOIN animes ON animes.anime_id = comments.fk_anime_id;`
  await client.query(queryToCreateViewCommentsUses)

  const queryToCreateViewRecommendationsLastWeekUsers = `CREATE VIEW users_recommendations_last_week AS SELECT quiz_result.fk_user_id AS 'user_id',COUNT(fk_user_id) AS 'quantity', DAY(quiz_result.created_at) AS 'date' FROM quiz_result GROUP BY quiz_result.fk_user_id, DAY(quiz_result.created_at);`
  await client.query(queryToCreateViewRecommendationsLastWeekUsers)

  const queryToCreateViewRecommendationsUsers = `CREATE VIEW users_recommendations AS SELECT quiz_result.fk_user_id as user_id,title, image_url, anime_id FROM quiz_result JOIN animes ON quiz_result.fk_anime_id = animes.anime_id;`
  await client.query(queryToCreateViewRecommendationsUsers)

  console.log("create views ✅")

  await client.end();
}


seedInDatabase();