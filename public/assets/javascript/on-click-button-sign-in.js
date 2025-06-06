import { SetStorage } from "./manege-storage-session.js";

const buttonSignIn = document.getElementById("button-sign-in");

buttonSignIn.addEventListener("click", () => {
  const email = input_email.value;
  const password = input_password.value;

  let fields = "";

  if (!email) {
    fields = "email";
  }
  if (!password) {
    fields += " senha ";
  }

  if (fields) {
    alert(`ops , parece houve um erro no campo(${fields})`);
    return;
  }

  fetchSignUser(email, password);
});

async function fetchSignUser(email, password) {
  const data = await fetch("/users/auth", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const isRequestSuccess = data.ok;
  if (isRequestSuccess) {
    const response = await data.json();

    SetStorage("user_id", response.user_id);
    SetStorage("username", response.username);
    SetStorage("email", response.email);
    SetStorage("avatar_url", response.avatar_url);

    window.location.assign("index.html");
  }

  const isBadRequest = data.status == "400";
  if (isBadRequest) {
    alert("senha incorreta");
    input_password.type = "text";
  }

  const isNotFoundUser = data.status == "404";
  if (isNotFoundUser) {
    alert("este usuario não existe");
    input_email.value = "";
    input_password.value = "";
  }
}
