
let idMessage = "";

function getUpdateMessage() {
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
    .then(function (updateMessage) {
      getMessageToDisplay(updateMessage);
      console.log(updateMessage);
      return updateMessage;
    })
    .catch((error) => {
      console.log(error);
    });
}

function getMessageToDisplay(updateMessage) {
  console.log(updateMessage);
  let titleUpdateMessage = document.getElementById("title-update-message");
  let textUpdateMessage = document.getElementById("update-message");

  if (updateMessage.imageUrl !== undefined) {
    let imageUpdateMessage = document.getElementById("image-update-message");
    let photoUpdateMessage = document.createElement("img");
    photoUpdateMessage.setAttribute("id", "img-update-message");
    photoUpdateMessage.setAttribute("src", updateMessage.Message_image_url);
    photoUpdateMessage.setAttribute("alt", "Photo du message");
    imageUpdateMessage.appendChild(photoUpdateMessage);
  } else {
  }

  let actionButtonUpdate = document.getElementById("btn-update-message");
  let btnRetourUpdate = document.createElement("button");
  btnRetourUpdate.setAttribute("id", "btn-retour-message-update");
  btnRetourUpdate.setAttribute("type", "button");
  btnRetourUpdate.setAttribute("name", "retour-update-message");
  btnRetourUpdate.setAttribute(
    "onclick",
    "window.location.href='../html/post.html'"
  );

  actionButtonUpdate.appendChild(btnRetourUpdate);

  /* Contenu des balises  HTML */
  titleUpdateMessage.value = updateMessage.title;
  textUpdateMessage.value = updateMessage.message;
  btnRetourUpdate.textContent = "Retour";
}

function updateMessage() {
  let messageTitle = document.getElementById("title-update-message").value;
  let messageText = document.getElementById("update-message").value;

  const formDataMessage = new FormData();
  formDataMessage.append("userId", id);
  formDataMessage.append("title", messageTitle);
  formDataMessage.append("message", messageText);

  fetch(url + "api/message/" + idMessage, {
    method: "PATCH",
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    body: formDataMessage,
  })
    .then(function (response) {
      return response.json();
    })
    .then(
      (window.location = "../html/post.html"),
      alert("Message modifié")
    )
    .catch((error) => {
      console.log(error);
    });
}

let modifMessage = document.getElementById("form-update-network");
modifMessage.addEventListener("submit", ($event) => {
  $event.preventDefault();
  updateMessage();
});
