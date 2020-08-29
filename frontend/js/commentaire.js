

function createCommentaire() {
  let idMessage = location.search.substring(4);

  
  let firstname = localStorage.getItem("firstname");
  let lastname = localStorage.getItem("lastname");
let commentaire = document.getElementById("new-commentaire").value;

  const formDataCommentaire = new FormData();
  formDataCommentaire.append("user_id", id);
  formDataCommentaire.append("commentaire", commentaire);
  formDataCommentaire.append("firstname", firstname);
  formDataCommentaire.append("lastname", lastname);
  formDataCommentaire.append("message_id", idMessage);

  console.log(id);
  fetch(url + "api/commentaire", {
    method: "POST",
    headers: { Authorization: "Bearer " + localStorage.getItem("token"), },
    body: formDataCommentaire,
  })
    .then(function (response) {
      return response.json();
    })
    .then(
      location.reload(),
      alert("Commentaire ajouté")
    )
    .catch((error) => {
      console.log(error);
    });
}

let submitCommentaire = document.getElementById("form-commentaire");
submitCommentaire.addEventListener("submit", ($event) => {
  $event.preventDefault();
  createCommentaire();
});
