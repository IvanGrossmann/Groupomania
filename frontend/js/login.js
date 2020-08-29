let url = "http://localhost:3000/";

//login function

function loginUser() {
  fetch(url + "api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: document.getElementById("email-login").value,
      password: document.getElementById("pass-login").value,
    }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (userData) {
      if (!userData.id) {
        alert("email ou password invalide");
      } else {
        localStorage.setItem("id", userData.id);
        localStorage.setItem("token", userData.token);

        console.log(userData.token);
        let appUrl = "../html/accueil.html?userId=" + userData.id;
        window.location = appUrl;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

//trigg the login function

let submitLogin = document.getElementById("form_login");
submitLogin.addEventListener("submit", ($event) => {
  $event.preventDefault();
  loginUser();
});
