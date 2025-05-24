const userModel = require("../models/user.model.js");

function createUserController(request, response) {
  const username = request.body.username;
  const email = request.body.email;
  const password = request.body.password;
  const avatar = request.file?.filename;

  if (!username || !email || !password || !avatar) {
    return response.status(400).send({
      message: "invalid credentials",
    });
  }

  userModel.findByEmail(email).then((user) => {
    if (user.length != 0) {
      return response.status(409).send({
        message: "use with this email already exist",
      });
    } else {
      userModel
        .create(username, email, password, avatar)
        .then(() => {
          response.json(200);
        })
        .catch((error) => {
          response.status(500).json(error.sqlMessage);
        });
    }
  });
}

module.exports = {
  createUserController,
};
