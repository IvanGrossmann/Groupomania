

//////// AFFICHAGE MESSAGES /////////



function getAllCommentaires() {
  fetch(url + "api/commentaire", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (commentaire) {
      getCommentaires(commentaire);
      console.log(commentaire);
      return commentaire;
    })
    .catch((error) => {
      console.log(error);
    });
}



function getCommentaires(commentaire) {
  console.log(commentaire);

  let listeCommentaire= document.getElementById("info_commentaire");
  let idMessage = location.search.substring(4);
  let nombreCommentaire = document.getElementById("nbr-commentaires");
  nombreCommentaire.setAttribute("id", "commentMessageId" + idMessage);
  nombreCommentaire.textContent = (commentaire.filter(function(commentaire) {return commentaire.message_id==idMessage})).length;

  commentaire.filter(function(commentaire) {return commentaire.message_id==idMessage}).reverse(commentaire.date_commentaire).forEach((commentaire) => {
   let commentaireContenant = document.createElement("div");
    let infoSingleCommentaire = document.createElement("div");
    let userSingleCommentaire = document.createElement("p");
  let dateSingleCommentaire = document.createElement("p");
  let texteSingleCommentaire = document.createElement("p");

  commentaireContenant.setAttribute("class", "commentaire");
  infoSingleCommentaire.setAttribute("class", "info-single-commentaire");
  userSingleCommentaire.setAttribute("class", "user-single-commentaire");
  dateSingleCommentaire.setAttribute("class", "date-single-commentaire");
  texteSingleCommentaire.setAttribute("class", "texte-single-commentaire");

listeCommentaire.appendChild(commentaireContenant)
commentaireContenant.appendChild(infoSingleCommentaire);
commentaireContenant.appendChild(texteSingleCommentaire);
infoSingleCommentaire.appendChild(userSingleCommentaire);
infoSingleCommentaire.appendChild(dateSingleCommentaire);

  /* Contenu des balises index HTML */
  let date= new Date(commentaire.date_commentaire);
  let dateCommentaire = date.getDate() +
  "/" +
  (date.getMonth() + 1) +
  "/" +
  date.getFullYear() +
  " à " +
  date.getHours() +
  ":" +
  ("0" + date.getMinutes()).slice(-2);

  userSingleCommentaire.textContent =
    commentaire.firstname + " " + commentaire.lastname;
  dateSingleCommentaire.textContent = dateCommentaire;
 
  texteSingleCommentaire.textContent = commentaire.commentaire;

  if (commentaire.user_id == id || role == "admin") {
    let actionButtonCommentaire = document.createElement("div");
    actionButtonCommentaire.setAttribute("class", "action-button-commentaire");
    let btnDeleteCommentaire = document.createElement("button");
    btnDeleteCommentaire.setAttribute("id", "btn-delete-commentaire"+commentaire.id);
    btnDeleteCommentaire.setAttribute("type", "button");
    btnDeleteCommentaire.setAttribute("name", "btn-delete-commentaire");
   
    commentaireContenant.appendChild(actionButtonCommentaire);
    actionButtonCommentaire.appendChild(btnDeleteCommentaire);
    btnDeleteCommentaire.textContent = "Supprimer commentaire";


    let idCommentaire = commentaire.id;


 function deleteCommentaire() {
    fetch(url + "api/commentaire/" + idCommentaire, {
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
        location.reload(),
        alert("Commentaire supprimé")
      )
      .catch((error) => {
        console.log(error);
      });
  }

  let removeCommentaire= document.getElementById("btn-delete-commentaire"+idCommentaire);
  removeCommentaire.addEventListener("click", ($event) => {
    $event.preventDefault();
    deleteCommentaire();
  });
  } else {
  }
})
}


