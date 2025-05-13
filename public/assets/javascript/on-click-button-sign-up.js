const buttonSignUp = document.getElementById("button-sign-up");

buttonSignUp.addEventListener("click", () => {
  const username = input_username.value;
  const email = input_email.value;
  const password = input_password.value;
  const passwordRepeat = input_password_repeat.value;
  const avatarUrl = input_avatar_url.files[0];

  var fields = "";
  if (!username) {
    fields += "nome";
  }

  if (!email) {
    fields += " email ";
  }

  if (!password) {
    fields += " senha ";
  }

  if (!avatarUrl) {
    fields += " foto ";
  }

  if (fields) {
    alert(`parece que não foi preenchido os campos(${fields})`);
  }

  if (password !== passwordRepeat) {
    alert("as senha não são iguais.");
    return;
  }

  const form = new FormData();

  form.append("username", username);
  form.append("email", email);
  form.append("password", password);
  form.append("avatarUrl", avatarUrl);

  fetchSignUpUser(form);
});

async function fetchSignUpUser(form) {
  const data = await fetch("http://localhost:3333/users/", {
    method: "POST",
    body: form,
  });

  const isBadRequest = data.status === 400;
  if (isBadRequest) {
    alert("erro no formulario");
  }

  const isEmailAlreadyExits = data.status === 409;
  if (isEmailAlreadyExits) {
    alert("existe um usuario com este email");
  }

  const isRequestSuccess = data.ok;
  if (isRequestSuccess) {
    alert("usuario criado com sucesso");
    window.location.assign("sign-in.html");
  }
}
