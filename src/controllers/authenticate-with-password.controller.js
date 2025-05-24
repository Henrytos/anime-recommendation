const userModel = require("../models/user.model.js");

function authenticateWithPasswordController(request, response) {
  const email = request.body.email;
  const password = request.body.password;

  if (!email || !password) {
    return response.status(400).send({
      message: "invalid credentials",
    });
  }

  userModel
    .findByEmail(email)
    .then((user) => {
      if (user.length == 0) {
        return response.status(404).send({
          message: "user not found",
        });
      }

      if (user[0].password_hash != password) {
        return response.status(400).send({
          message: "invalid credentials",
        });
      }

      return response.status(200).json({
        user_id: user[0].user_id,
        username: user[0].username,
        email: user[0].email,
        avatar_url: user[0].avatar_url,
      });
    })
    .catch((error) => {
      console.error(error);
      return response.status(501);
    });
}

module.exports = {
  authenticateWithPasswordController,
};
