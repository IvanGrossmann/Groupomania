let url = "http://localhost:3000/";
let id = localStorage.getItem("id");
let role = localStorage.getItem("role");
let emailContact = localStorage.getItem("email");

function verifConnect() {
  if (localStorage.getItem("token") === null) {
    window.location = "../html/login.html";
  }
}

verifConnect();
