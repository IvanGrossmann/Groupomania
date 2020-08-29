//////// AFFICHAGE MESSAGES /////////

function getAllMessages() {
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
    .then(function (message) {
      getMessages(message);
      console.log(message);
      return message;
    })
    .catch((error) => {
      console.log(error);
    });
}

function getMessages(message) {
  console.log(message);

  let listeNetworkPost = document.getElementById("liste-message");

  message.reverse(message.date_post).forEach((message) => {
    let networkPostContenant = document.createElement("a");
    let networkPostInformation = document.createElement("div");
    let networkPostUserName = document.createElement("div");
    let networkPostDate = document.createElement("div");
    let networkPostElement = document.createElement("div");
    let networkPostTitle = document.createElement("p");
    let networkPostMessage = document.createElement("p");
    let networkPostIllustration = document.createElement("div");
    let networkPostPhoto = document.createElement("img");
    let btnCommenter = document.createElement("button");

    /*Ajout des attributs au balise index HTML */
    networkPostContenant.setAttribute("class", "message");
    networkPostContenant.setAttribute("href", "commentaire.html?id=" + message.id);
    networkPostInformation.setAttribute("class", "information_message");
    networkPostUserName.setAttribute("class", "user_name");
    networkPostDate.setAttribute("class", "post_date");
    networkPostElement.setAttribute("class", "zone_message");
    networkPostMessage.setAttribute("class", "zone_texte");
    networkPostTitle.setAttribute("class", "zone_title");
    networkPostIllustration.setAttribute("class", "zone_image");
    btnCommenter.setAttribute("class", "btn-commenter");

    if (message.Message_image_url != undefined) {
      networkPostPhoto.setAttribute("class", "image-network");
      networkPostPhoto.setAttribute("src", message.Message_image_url);
      networkPostPhoto.setAttribute("alt", "Photo du message");
    } else {
    }

    /* Agencement des éléments index HTML */
    listeNetworkPost.appendChild(networkPostContenant);
    networkPostContenant.appendChild(networkPostInformation);
    networkPostContenant.appendChild(networkPostElement);
    networkPostInformation.appendChild(networkPostUserName);
    networkPostInformation.appendChild(networkPostDate);
    networkPostElement.appendChild(networkPostTitle);
    networkPostElement.appendChild(networkPostMessage);
    networkPostElement.appendChild(networkPostIllustration);
    networkPostIllustration.appendChild(networkPostPhoto);
    networkPostContenant.appendChild(btnCommenter);

    /* Contenu des balises index HTML */
    let date = new Date(message.date_post);
    let dateMessage =
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      " à " +
      date.getHours() +
      ":" +
      ("0" + date.getMinutes()).slice(-2);

    networkPostUserName.textContent =
      message.firstname + " " + message.lastname;
    networkPostDate.textContent = dateMessage;
    networkPostTitle.textContent = message.title;
    networkPostMessage.textContent = message.message;
    btnCommenter.textContent = "Commenter";
  });
}

let idMessage = "";

function getOneMessage() {
  idMessage = location.search.substring(4);
  fetch(url + "api/message/" + idMessage, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (oneMessage) {
      getMessage(oneMessage);
      console.log(oneMessage);
      return oneMessage;
    })
    .catch((error) => {
      console.log(error);
    });
}

function getMessage(oneMessage) {
  console.log(oneMessage);
  let userSingleMessage = document.getElementById("user-single-message");
  let dateSingleMessage = document.getElementById("date-single-message");
  let titreSingleMessage = document.getElementById("titre-single-message");
  let texteSingleMessage = document.getElementById("texte-single-message");
  let imageSingleMessage = document.getElementById("image-single-message");
  let photoSingleMessage = document.createElement("img");
  let actionButtonMessage = document.getElementById("action-button-message");
  let btnRetourMessage = document.createElement("button");

  btnRetourMessage.setAttribute("class", "btn-retour-message");
  btnRetourMessage.setAttribute("type", "button");
  btnRetourMessage.setAttribute("name", "retour-message");
  btnRetourMessage.setAttribute(
    "onclick",
    "window.location.href='../html/post.html'"
  );

  if (oneMessage.Message_image_url != undefined) {
    photoSingleMessage.setAttribute("src", oneMessage.Message_image_url);
    photoSingleMessage.setAttribute("alt", "Photo du message");
    imageSingleMessage.appendChild(photoSingleMessage);
  } else {
  }

  actionButtonMessage.appendChild(btnRetourMessage);

  /* Contenu des balises index HTML */
  let date = new Date(oneMessage.date_post);
  let dateMessage =
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear() +
    " à " +
    date.getHours() +
    ":" +
    ("0" + date.getMinutes()).slice(-2);

  userSingleMessage.textContent =
    oneMessage.firstname + " " + oneMessage.lastname;
  dateSingleMessage.textContent = dateMessage;
  btnRetourMessage.textContent = "Retour";
  titreSingleMessage.textContent = oneMessage.title;
  texteSingleMessage.textContent = oneMessage.message;

  if (oneMessage.user_id == id || role == "admin") {
    let btnModifyMessage = document.createElement("a");
    let modifyMessage = document.createElement("button");
    btnModifyMessage.setAttribute("id", "btn-modify-message");
    modifyMessage.setAttribute("type", "button");
    btnModifyMessage.setAttribute(
      "href",
      "modif-post.html?id=" + oneMessage.id
    );
    btnModifyMessage.appendChild(modifyMessage);
    let btnDeleteMessage = document.createElement("button");
    btnDeleteMessage.setAttribute("id", "btn-delete-message");
    btnDeleteMessage.setAttribute("type", "button");
    btnDeleteMessage.setAttribute("name", "btn-delete-message");
    actionButtonMessage.appendChild(btnModifyMessage);
    actionButtonMessage.appendChild(btnDeleteMessage);
    modifyMessage.textContent = "Modifier";
    btnDeleteMessage.textContent = "Supprimer message";
  } else {
  }

  function deleteMessage() {
    idMessage = location.search.substring(4);
    fetch(url + "api/message/" + idMessage, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(
        (window.location = "../html/post.html"),
        alert("Message supprimé")
      )
      .catch((error) => {
        console.log(error);
      });
  }

  let removeMessage = document.getElementById("btn-delete-message");
  removeMessage.addEventListener("click", ($event) => {
    $event.preventDefault();
    deleteMessage();
  });
}
