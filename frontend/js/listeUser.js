
//////// AFFICHAGE USERS /////////

function getAllUsers() {
  fetch(url + "api/profil", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (user) {
      getUsers(user);
      console.log(user);
      return user;
    })
    .catch((error) => {
      console.log(error);
    });
}

function getUsers(user) {
  console.log(user);

  let listeUser = document.getElementById("liste-user");

  user.sort(user.lastname).forEach((user) => {

    let userContenant = document.createElement("a");
    let userElement = document.createElement("div");
    let userNom = document.createElement("p");
    let userPrenom = document.createElement("p");
    let userMail = document.createElement("p");
    let userRole = document.createElement("p");

    /*Ajout des attributs au balise index HTML */
    userContenant.setAttribute("class", "user");
    userContenant.setAttribute("href", "admin-participation.html?id=" + user.id);
    userElement.setAttribute("class", "user_element");
    userNom.setAttribute("class", "user-nom");
    userPrenom.setAttribute("class", "user-prenom");
    userMail.setAttribute("class", "user-mail");
    userMail.setAttribute("class", "user-role");

    /* Agencement des éléments index HTML */
    listeUser.appendChild(userContenant);
    userContenant.appendChild(userElement);
    userElement.appendChild(userNom);
    userElement.appendChild(userPrenom);
    userElement.appendChild(userMail);
    userElement.appendChild(userRole);

    /* Contenu des balises index HTML */
    userNom.textContent = user.lastname;
    userPrenom.textContent = user.firstname;
    userMail.textContent = user.email;
    userRole.textContent = user.role;

  });
}