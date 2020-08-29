///// SUPPRESSION DU COMPTE /////


function deleteUser() {
  fetch(url + "api/profil/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function () {
      alert("Le compte a été supprimé");
      window.location = "../html/login.html";
    });
}

//button for cancel account

let btnDeleteAccount = document.getElementById("suppression-compte");
btnDeleteAccount.addEventListener("click", ($event) => {
  deleteUser();
});
