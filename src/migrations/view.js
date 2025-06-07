const { createConnection } = require("mysql2/promise");

async function createViews() {
  const client = await createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
  });

  console.log("connection mysql ✅");


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
    animes.gender,
    target_audience
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

  console.log("create views ✅");

  await client.end();
  console.log("disconnection mysql ✅");
}


createViews()