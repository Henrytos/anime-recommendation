const { createConnection } = require("mysql2/promise");

async function seedInDatabase() {
  const client = await createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
  });

  console.log("connection mysql ✅");


  await client.query("DELETE FROM quiz_result;");
  await client.query("DELETE FROM alternatives;");
  await client.query("DELETE FROM questions;");
  await client.query("DELETE FROM comments;");
  await client.query("DELETE FROM animes;");
  await client.query("DELETE FROM quizzes;");
  await client.query("DELETE FROM users;");

  console.log("delete all ✅");

  // USERS
  const users = [
    {
      username: "henry_dev",
      email: "henry@gmail.com",
      password: "123456",
      avatarUrl: "henry-profile.png",
    },
    {
      username: "nathalia_art",
      email: "nathalia@gmail.com",
      password: "123456",
      avatarUrl: "nathalia-profile.png",
    },
  ];
  for (let position = 0; position < users.length; position++) {
    let user = users[position]

    await client.query(
      `INSERT INTO users (username, email, password_hash, avatar_url)
      VALUES ('${user.username}', '${user.email}', SHA2('${user.password}', 512), '${user.avatarUrl}')`
    );
  }
  console.log("seed users ✅");




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
  console.log("seed quizzes ✅");


  // ANIMES
  const animes = [];

  for (let page = 1; page <= 5; page++) {
    const response = await fetch(`https://api.jikan.moe/v4/top/anime?page=${page}`)
    const result = await response.json()

    if (page % 3 == 0) {
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }

    const animesResponse = result.data

    for (let position = 0; position < animesResponse.length; position++) {
      const anime = animesResponse[position]
      const anime_id = anime.mal_id
      const title = anime.title
      const description = anime.synopsis
      const image_url = anime.images.jpg.large_image_url
      const target_audience = anime.demographics[0]?.name
      const gender = anime.genres[0]?.name
      const score = anime.score


      if (anime && anime_id && title && image_url && gender && description && target_audience && score) {
        animes.push({
          anime_id,
          title,
          image_url,
          description,
          target_audience,
          gender,
          score
        })
      }

    }
  }

  const animesOrder = animes.reduce((accumulator, currentValue) => {
    const valueExists = accumulator.filter(item => item.anime_id == currentValue.anime_id)
    if (valueExists.length == 0) {
      accumulator.push(currentValue)
    }

    return accumulator
  }, [])


  for (let position = 0; position < animesOrder.length; position++) {
    let anime = animesOrder[position]

    await client.query(
      `INSERT INTO animes (anime_id, title, image_url, description, target_audience, gender, score)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        anime.anime_id,
        anime.title,
        anime.image_url,
        anime.description,
        anime.target_audience,
        anime.gender,
        anime.score
      ]
    );
  }

  console.log("seed animes ✅");


  // COMMENTS
  const comments = [
    {
      comment_id: 1,
      fk_anime_id: animesOrder[Math.floor(Math.random() * animes.length)].anime_id,
      fk_user_id: 1,
      description: "Anime incrível, cheio de ação!",
    },
    {
      comment_id: 2,
      fk_anime_id: animesOrder[Math.floor(Math.random() * animes.length)].anime_id,
      fk_user_id: 2,
      description: "Muito fofo e emocionante.",
    },
  ];
  for (let position = 0; position < 6; position++) {

    let min = 0, max = comments.length
    let interval = max - min
    let randomPosition = Math.floor(Math.random() * interval)
    let result = comments[randomPosition]

    await client.query(
      `INSERT INTO comments (comment_id, fk_anime_id, fk_user_id, description)
      VALUES (DEFAULT, ${result.fk_anime_id}, ${result.fk_user_id}, '${result.description}')`,
    );
  }
  console.log("seed comments ✅");


  // QUESTIONS
  const questions = [
    { fk_quiz_id: 1000, title: "Qual estilo de anime você prefere?", number: 1 },
    { fk_quiz_id: 1000, title: "Prefere ação ou romance?", number: 2 },
    { fk_quiz_id: 1000, title: "Você gosta de histórias com elementos sobrenaturais?", number: 3 },
    { fk_quiz_id: 1000, title: "Prefere mundos futuristas ou cenários do cotidiano?", number: 4 },
    { fk_quiz_id: 1000, title: "Você se interessa por histórias premiadas ou populares?", number: 5 },
    { fk_quiz_id: 1000, title: "Prefere histórias de mistério ou de aventura?", number: 6 },
    { fk_quiz_id: 1000, title: "Curte mais animes de comédia ou dramas emocionantes?", number: 7 },
    { fk_quiz_id: 1000, title: "Histórias que focam no amadurecimento dos personagens te agradam?", number: 8 },
    { fk_quiz_id: 1000, title: "Você gosta de acompanhar esportes em animes?", number: 9 },
    { fk_quiz_id: 1000, title: "Prefere protagonistas femininas ou masculinos?", number: 10 }
  ];

  for (let position = 0; position < questions.length; position++) {
    let question = questions[position]

    await client.query(
      `INSERT INTO questions (fk_quiz_id, title, number)
      VALUES (?, ?, ?)`,
      [question.fk_quiz_id, question.title, question.number]
    );
  }
  console.log("seed questions ✅");


  // ALTERNATIVES
  const alternatives = [
    // Question 1
    { alternative_id: 1, title: "Action", description: "Batalhas eletrizantes e muita adrenalina.", image_url: "https://i.imgur.com/HBErK0Z.jpg", is_correct: true, target_audience: "Shounen", gender: "Action", fk_question_id: 1, fk_quiz_id: 1000 },
    { alternative_id: 2, title: "Romance", description: "Histórias de amor, emoção e superação.", image_url: "https://i.imgur.com/jtPTwEv.jpg", is_correct: true, target_audience: "Shoujo", gender: "Romance", fk_question_id: 1, fk_quiz_id: 1000 },
    { alternative_id: 3, title: "Comedy", description: "Animes leves, divertidos e engraçados.", image_url: "https://i.imgur.com/vIL2hpo.jpg", is_correct: true, target_audience: "Josei", gender: "Comedy", fk_question_id: 1, fk_quiz_id: 1000 },
    { alternative_id: 4, title: "Mystery", description: "Suspense, investigações e revelações.", image_url: "https://i.imgur.com/5Z0Y7eM.jpg", is_correct: true, target_audience: "Seinen", gender: "Mystery", fk_question_id: 1, fk_quiz_id: 1000 },

    // Question 2
    { alternative_id: 5, title: "Ação", description: "Lutas intensas e heróis destemidos.", image_url: "https://i.imgur.com/4pcr1iG.jpg", is_correct: true, target_audience: "Shounen", gender: "Action", fk_question_id: 2, fk_quiz_id: 1000 },
    { alternative_id: 6, title: "Romance", description: "Relacionamentos emocionantes e cativantes.", image_url: "https://i.imgur.com/jtPTwEv.jpg", is_correct: true, target_audience: "Shoujo", gender: "Romance", fk_question_id: 2, fk_quiz_id: 1000 },
    { alternative_id: 7, title: "Supernatural", description: "Poderes místicos e mundos além da realidade.", image_url: "https://i.imgur.com/2tvnWke.jpg", is_correct: true, target_audience: "Seinen", gender: "Supernatural", fk_question_id: 2, fk_quiz_id: 1000 },
    { alternative_id: 8, title: "Adventure", description: "Explorações e jornadas épicas.", image_url: "https://i.imgur.com/HeI3z1M.jpg", is_correct: true, target_audience: "Shounen", gender: "Adventure", fk_question_id: 2, fk_quiz_id: 1000 },

    // Question 3
    { alternative_id: 9, title: "Sim, adoro sobrenatural!", description: "Magia, mistérios e poderes ocultos.", image_url: "https://i.imgur.com/2tvnWke.jpg", is_correct: true, target_audience: "Seinen", gender: "Supernatural", fk_question_id: 3, fk_quiz_id: 1000 },
    { alternative_id: 10, title: "Prefiro histórias mais realistas.", description: "Cenas do cotidiano, sem elementos mágicos.", image_url: "https://i.imgur.com/7nuwG1E.jpg", is_correct: true, target_audience: "Josei", gender: "Slice of Life", fk_question_id: 3, fk_quiz_id: 1000 },
    { alternative_id: 11, title: "Gosto de ambos, dependendo da história.", description: "Se a história me prender, gosto dos dois.", image_url: "https://i.imgur.com/HeI3z1M.jpg", is_correct: true, target_audience: "Shounen", gender: "Adventure", fk_question_id: 3, fk_quiz_id: 1000 },
    { alternative_id: 12, title: "Só se tiver um toque de comédia.", description: "Mistura de sobrenatural e humor.", image_url: "https://i.imgur.com/vIL2hpo.jpg", is_correct: true, target_audience: "Shoujo", gender: "Comedy", fk_question_id: 3, fk_quiz_id: 1000 },

    // Question 4
    { alternative_id: 13, title: "Futuristas (Sci-Fi)", description: "Tecnologia avançada, robôs e espaço.", image_url: "https://i.imgur.com/3BSlRtV.jpg", is_correct: true, target_audience: "Seinen", gender: "Sci-Fi", fk_question_id: 4, fk_quiz_id: 1000 },
    { alternative_id: 14, title: "Cotidiano (Slice of Life)", description: "Histórias simples e emocionantes do dia a dia.", image_url: "https://i.imgur.com/7nuwG1E.jpg", is_correct: true, target_audience: "Josei", gender: "Slice of Life", fk_question_id: 4, fk_quiz_id: 1000 },
    { alternative_id: 15, title: "Ambos, se tiver aventura.", description: "Aventura em qualquer cenário é o que importa.", image_url: "https://i.imgur.com/HeI3z1M.jpg", is_correct: true, target_audience: "Shounen", gender: "Adventure", fk_question_id: 4, fk_quiz_id: 1000 },
    { alternative_id: 16, title: "Prefiro fantasia.", description: "Mundos mágicos, reinos e criaturas incríveis.", image_url: "https://i.imgur.com/2tvnWke.jpg", is_correct: true, target_audience: "Shoujo", gender: "Supernatural", fk_question_id: 4, fk_quiz_id: 1000 },

    // Question 5
    { alternative_id: 17, title: "Premiados", description: "Obras renomadas, com prêmios e altas avaliações.", image_url: "https://i.imgur.com/M7bqmkS.jpg", is_correct: true, target_audience: "Seinen", gender: "Award Winning", fk_question_id: 5, fk_quiz_id: 1000 },
    { alternative_id: 18, title: "Populares", description: "Animes famosos, badalados e cheios de fãs.", image_url: "https://i.imgur.com/HBErK0Z.jpg", is_correct: true, target_audience: "Shounen", gender: "Action", fk_question_id: 5, fk_quiz_id: 1000 },
    { alternative_id: 19, title: "Indie e alternativos", description: "Obras diferentes e criativas fora do mainstream.", image_url: "https://i.imgur.com/7nuwG1E.jpg", is_correct: true, target_audience: "Josei", gender: "Slice of Life", fk_question_id: 5, fk_quiz_id: 1000 },
    { alternative_id: 20, title: "Não me importo, só quero me divertir.", description: "Qualquer anime bom me serve!", image_url: "https://i.imgur.com/vIL2hpo.jpg", is_correct: true, target_audience: "Shoujo", gender: "Comedy", fk_question_id: 5, fk_quiz_id: 1000 },

    // Question 6
    { alternative_id: 21, title: "Mistério", description: "Investigações, segredos e reviravoltas.", image_url: "https://i.imgur.com/5Z0Y7eM.jpg", is_correct: true, target_audience: "Seinen", gender: "Mystery", fk_question_id: 6, fk_quiz_id: 1000 },
    { alternative_id: 22, title: "Aventura", description: "Explorações incríveis e desafios.", image_url: "https://i.imgur.com/HeI3z1M.jpg", is_correct: true, target_audience: "Shounen", gender: "Adventure", fk_question_id: 6, fk_quiz_id: 1000 },
    { alternative_id: 23, title: "Mistério sobrenatural", description: "Casos envolvendo magia e forças ocultas.", image_url: "https://i.imgur.com/2tvnWke.jpg", is_correct: true, target_audience: "Seinen", gender: "Supernatural", fk_question_id: 6, fk_quiz_id: 1000 },
    { alternative_id: 24, title: "Aventura romântica", description: "Explorações com foco em relacionamentos.", image_url: "https://i.imgur.com/jtPTwEv.jpg", is_correct: true, target_audience: "Shoujo", gender: "Romance", fk_question_id: 6, fk_quiz_id: 1000 },

    // Question 7
    { alternative_id: 25, title: "Comédia", description: "Histórias para dar boas risadas.", image_url: "https://i.imgur.com/vIL2hpo.jpg", is_correct: true, target_audience: "Josei", gender: "Comedy", fk_question_id: 7, fk_quiz_id: 1000 },
    { alternative_id: 26, title: "Drama", description: "Enredos emocionantes que tocam o coração.", image_url: "https://i.imgur.com/M7bqmkS.jpg", is_correct: true, target_audience: "Seinen", gender: "Slice of Life", fk_question_id: 7, fk_quiz_id: 1000 },
    { alternative_id: 27, title: "Comédia romântica", description: "Romances leves, cheios de humor.", image_url: "https://i.imgur.com/jtPTwEv.jpg", is_correct: true, target_audience: "Shoujo", gender: "Romance", fk_question_id: 7, fk_quiz_id: 1000 },
    { alternative_id: 28, title: "Comédia de aventura", description: "Diversão em jornadas épicas.", image_url: "https://i.imgur.com/HeI3z1M.jpg", is_correct: true, target_audience: "Shounen", gender: "Adventure", fk_question_id: 7, fk_quiz_id: 1000 },

    // Question 8
    { alternative_id: 29, title: "Sim, gosto de amadurecimento pessoal", description: "Histórias que acompanham crescimento dos personagens.", image_url: "https://i.imgur.com/7nuwG1E.jpg", is_correct: true, target_audience: "Josei", gender: "Slice of Life", fk_question_id: 8, fk_quiz_id: 1000 },
    { alternative_id: 30, title: "Prefiro batalhas e ação.", description: "Crescimento através de lutas e desafios.", image_url: "https://i.imgur.com/HBErK0Z.jpg", is_correct: true, target_audience: "Shounen", gender: "Action", fk_question_id: 8, fk_quiz_id: 1000 },
    { alternative_id: 31, title: "Sim, principalmente romances que desenvolvem bem os personagens.", description: "Evolução emocional é importante.", image_url: "https://i.imgur.com/jtPTwEv.jpg", is_correct: true, target_audience: "Shoujo", gender: "Romance", fk_question_id: 8, fk_quiz_id: 1000 },
    { alternative_id: 32, title: "Depende, se tiver aventura fica melhor.", description: "Desenvolvimento junto a grandes desafios.", image_url: "https://i.imgur.com/HeI3z1M.jpg", is_correct: true, target_audience: "Shounen", gender: "Adventure", fk_question_id: 8, fk_quiz_id: 1000 },

    // Question 9
    { alternative_id: 33, title: "Sim, amo animes de esportes!", description: "Superação, trabalho em equipe e competições emocionantes.", image_url: "https://i.imgur.com/IIG3KJJ.jpg", is_correct: true, target_audience: "Shounen", gender: "Sports", fk_question_id: 9, fk_quiz_id: 1000 },
    { alternative_id: 34, title: "Não, prefiro outros gêneros.", description: "Esportes não me atraem tanto.", image_url: "https://i.imgur.com/M7bqmkS.jpg", is_correct: true, target_audience: "Josei", gender: "Slice of Life", fk_question_id: 9, fk_quiz_id: 1000 },
    { alternative_id: 35, title: "Gosto, mas só se tiver drama também.", description: "Histórias esportivas com foco emocional.", image_url: "https://i.imgur.com/7nuwG1E.jpg", is_correct: true, target_audience: "Seinen", gender: "Drama", fk_question_id: 9, fk_quiz_id: 1000 },
    { alternative_id: 36, title: "Gosto, mas só se for bem humorado.", description: "Animes esportivos com bastante comédia.", image_url: "https://i.imgur.com/vIL2hpo.jpg", is_correct: true, target_audience: "Shoujo", gender: "Comedy", fk_question_id: 9, fk_quiz_id: 1000 },

    // Question 10
    { alternative_id: 37, title: "Masculino", description: "Protagonistas masculinos determinados.", image_url: "https://i.imgur.com/HBErK0Z.jpg", is_correct: true, target_audience: "Shounen", gender: "Action", fk_question_id: 10, fk_quiz_id: 1000 },
    { alternative_id: 38, title: "Feminino", description: "Protagonistas femininas fortes e inspiradoras.", image_url: "https://i.imgur.com/7nuwG1E.jpg", is_correct: true, target_audience: "Josei", gender: "Slice of Life", fk_question_id: 10, fk_quiz_id: 1000 },
    { alternative_id: 39, title: "Tanto faz, depende da história.", description: "O enredo é o mais importante.", image_url: "https://i.imgur.com/M7bqmkS.jpg", is_correct: true, target_audience: "Seinen", gender: "Mystery", fk_question_id: 10, fk_quiz_id: 1000 },
    { alternative_id: 40, title: "Prefiro casais como protagonistas.", description: "Foco em relações e desenvolvimento conjunto.", image_url: "https://i.imgur.com/jtPTwEv.jpg", is_correct: true, target_audience: "Shoujo", gender: "Romance", fk_question_id: 10, fk_quiz_id: 1000 },
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
  console.log("seed alternatives ✅");


  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth(); // sem +1 aqui, só no formato final
  const day = date.getDate();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  function formatDate(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const h = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    return `${y}-${m}-${day} ${h}:${min}:${s}`;
  }

  const quizResults = Array.from({ length: 7 }, (_, i) => ({
    fk_user_id: 1,
    fk_quiz_id: 1000,
    fk_anime_id: animesOrder[Math.floor(Math.random() * animes.length)].anime_id,
    created_at: formatDate(new Date(year, month, day - i, hour, minutes, seconds)),
  }));

  for (let position = 0; position < 5; position++) {

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

  console.log("seed quiz_result ✅");

  const queryToDeleteViewCommentsUsers = `DROP VIEW IF EXISTS users_comments`
  await client.query(queryToDeleteViewCommentsUsers)

  const queryToDeleteViewRecommendationsUsers = `DROP VIEW IF EXISTS users_recommendations`
  await client.query(queryToDeleteViewRecommendationsUsers)

  const queryToDeleteViewRecommendationsLastWeekUsers = `DROP VIEW IF EXISTS users_recommendations_last_week`
  await client.query(queryToDeleteViewRecommendationsLastWeekUsers)

  const queryToDeleteViewUserMetricsQuizzesWeek = `DROP VIEW IF EXISTS users_metrics_quizzes_week`
  await client.query(queryToDeleteViewUserMetricsQuizzesWeek)

  const queryToCreateViewCommentsUses = `CREATE VIEW users_comments AS SELECT 
        users.user_id,
        users.username,
        users.avatar_url,
        comments.description,
        comments.fk_anime_id AS anime_id,
        CASE
            WHEN TIMESTAMPDIFF(SECOND, comments.created_at, NOW()) < 60 THEN CONCAT('Há ', TIMESTAMPDIFF(SECOND, comments.created_at, NOW()), ' segundos')
            WHEN TIMESTAMPDIFF(MINUTE, comments.created_at, NOW()) < 60 THEN CONCAT('Há ', TIMESTAMPDIFF(MINUTE, comments.created_at, NOW()), ' minutos')
            WHEN TIMESTAMPDIFF(HOUR, comments.created_at, NOW()) < 24 THEN CONCAT('Há ', TIMESTAMPDIFF(HOUR, comments.created_at, NOW()), ' horas')
            WHEN TIMESTAMPDIFF(DAY, comments.created_at, NOW()) = 1 THEN CONCAT('Há ', TIMESTAMPDIFF(DAY, comments.created_at, NOW()), ' dia')
            WHEN TIMESTAMPDIFF(DAY, comments.created_at, NOW()) < 7 THEN CONCAT('Há ', TIMESTAMPDIFF(DAY, comments.created_at, NOW()), ' dias')
            WHEN TIMESTAMPDIFF(WEEK, comments.created_at, NOW()) < 4 THEN CONCAT('Há ', TIMESTAMPDIFF(WEEK, comments.created_at, NOW()), ' semanas')
            WHEN TIMESTAMPDIFF(MONTH, comments.created_at, NOW()) < 12 THEN CONCAT('Há ', TIMESTAMPDIFF(MONTH, comments.created_at, NOW()), ' meses')
            ELSE CONCAT('Há ', TIMESTAMPDIFF(YEAR, comments.created_at, NOW()), ' anos')
        END AS time_relative
        FROM users
        JOIN comments ON users.user_id = comments.fk_user_id
        JOIN animes ON animes.anime_id = comments.fk_anime_id
        ORDER BY comments.created_at DESC;`
  await client.query(queryToCreateViewCommentsUses)

  const queryToCreateViewRecommendationsLastWeekUsers = `CREATE VIEW users_recommendations_last_week AS SELECT quiz_result.fk_user_id AS 'user_id',COUNT(fk_user_id) AS 'quantity', DAY(quiz_result.created_at) AS 'date' FROM quiz_result GROUP BY quiz_result.fk_user_id, DAY(quiz_result.created_at);`
  await client.query(queryToCreateViewRecommendationsLastWeekUsers)

  const queryToCreateViewRecommendationsUsers = `CREATE VIEW users_recommendations AS SELECT 
    quiz_result.fk_user_id as user_id,
    title,
    image_url,
    quiz_result.created_at ,
    anime_id,
    animes.gender
  FROM quiz_result 
  JOIN animes 
  ON quiz_result.fk_anime_id = animes.anime_id
  ORDER BY created_at DESC;`
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
  console.log("disconnection mysql ✅");
}


seedInDatabase();