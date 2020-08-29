

function profilInformation() {
  fetch(url + "api/profil/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (profilData) {
      let profilName = document.getElementById("profil_nom");
      let profilFirstName = document.getElementById("profil_prenom");
      let profilRole = document.getElementById("profil_role");
      let profilEmail = document.getElementById("profil_email");
      profilName.textContent = profilData.lastname;
      profilFirstName.textContent = profilData.firstname;
      profilRole.textContent = profilData.role;
      profilEmail.textContent = profilData.email;
      localStorage.setItem("lastname", profilData.lastname);
      localStorage.setItem("firstname", profilData.firstname);
      localStorage.setItem("role", profilData.role);
      localStorage.setItem("email", profilData.email);
    if ( profilData.role == "admin"){
      let profilButton = document.getElementById("profil-button");
      let btnAdmin = document.createElement("button");
      btnAdmin.setAttribute("id", "menu-admin");
      btnAdmin.setAttribute("type", "button");
      btnAdmin.setAttribute("name", "menu-admin");
      btnAdmin.setAttribute(
        "onclick",
        "window.location.href='../html/admin.html'"
      );
  
      profilButton.appendChild(btnAdmin);
      btnAdmin.textContent = "Menu Administrateur";
    }})
    .catch((error) => {
      console.log(error);
    });
}

profilInformation();

