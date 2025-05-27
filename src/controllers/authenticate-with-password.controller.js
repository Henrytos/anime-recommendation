const userModel = require("../models/user.model.js");

async function authenticateWithPasswordController(request, response) {
  const email = request.body.email;
  const password = request.body.password;

  if (!email || !password) {
    return response.status(400).send({
      message: "invalid credentials",
    });
  }
  const userExistsWithEmail = await userModel.findByEmail(email)
  if (userExistsWithEmail.length == 0) {
    return response.status(404).json({
      message: 'not found user'
    })
  }

  const user = await userModel.auth(email, password)

  if (user.length == 0) {
    return response.status(400).json({
      message: 'bad request'
    })
  }

  return response.status(200).json({
    user_id: user[0].user_id,
    username: user[0].username,
    email: user[0].email,
    avatar_url: user[0].avatar_url,
  });
}

module.exports = {
  authenticateWithPasswordController,
};
