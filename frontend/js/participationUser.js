
let idUser = location.search.substring(4);

//////// AFFICHAGE MESSAGES /////////

function getAllMessagesUser() {
  fetch(url + "api/message", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (messagesUser) {
      getMessagesUser(messagesUser);
      console.log(messagesUser);
      return messagesUser;
    })
    .catch((error) => {
      console.log(error);
    });
}

function getMessagesUser(messagesUser) {
  console.log(messagesUser);

  let listeUserPost = document.getElementById("liste-message-user");

  messagesUser
    .filter(function (messageUser) {
      return messageUser.user_id == idUser;
    })
    .reverse(messagesUser.date_post)
    .forEach((messagesUser) => {
      let userPostContenant = document.createElement("a");
      let userPostInformation = document.createElement("div");
      let userPostUserName = document.createElement("div");
      let userPostDate = document.createElement("div");
      let userPostElement = document.createElement("div");
      let userPostTitle = document.createElement("p");
      let userPostMessage = document.createElement("p");
      let userPostIllustration = document.createElement("div");
      let userPostPhoto = document.createElement("img");

      /*Ajout des attributs au balise index HTML */
      userPostContenant.setAttribute("class", "message");
      userPostContenant.setAttribute(
        "href",
        "post.html?id=" + messagesUser.id
      );
      userPostInformation.setAttribute("class", "information_message");
      userPostUserName.setAttribute("class", "user_name");
      userPostDate.setAttribute("class", "post_date");
      userPostElement.setAttribute("class", "zone_message");
      userPostMessage.setAttribute("class", "zone_texte");
      userPostTitle.setAttribute("class", "zone_title");
      userPostIllustration.setAttribute("class", "zone_image");
      if (messagesUser.Message_image_url !== undefined) {
        userPostPhoto.setAttribute("class", "image-network");
        userPostPhoto.setAttribute("src", messagesUser.Message_image_url);
        userPostPhoto.setAttribute("alt", "Photo du message");
      } else {
      }

      /* Agencement des éléments index HTML */
      listeUserPost.appendChild(userPostContenant);
      userPostContenant.appendChild(userPostInformation);
      userPostContenant.appendChild(userPostElement);
      userPostInformation.appendChild(userPostUserName);
      userPostInformation.appendChild(userPostDate);
      userPostElement.appendChild(userPostTitle);
      userPostElement.appendChild(userPostMessage);
      userPostElement.appendChild(userPostIllustration);
      userPostIllustration.appendChild(userPostPhoto);

      /* Contenu des balises index HTML */
      let date = new Date(messagesUser.date_post);
      let dateMessageUser =
        date.getDate() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getFullYear() +
        " à " +
        date.getHours() +
        ":" +
        ("0" + date.getMinutes()).slice(-2);
      userPostUserName.textContent =
        messagesUser.firstname + " " + messagesUser.lastname;
      userPostDate.textContent = dateMessageUser;
      userPostTitle.textContent = messagesUser.title;
      userPostMessage.textContent = messagesUser.message;
    });
}