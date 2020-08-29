

function createMessage() {
  let title = document.getElementById("title-message").value;
  let message = document.getElementById("new-message").value;
  let creatorFirstname = localStorage.getItem("firstname");
  let creatorLastname = localStorage.getItem("lastname");
  let imageUrl = document.getElementById("imageUrl").files[0];

  const formDataMessage = new FormData();
  formDataMessage.append("user_id", id);
  formDataMessage.append("title", title);
  formDataMessage.append("message", message);
  formDataMessage.append("image", imageUrl);
  formDataMessage.append("firstname", creatorFirstname);
  formDataMessage.append("lastname", creatorLastname);

  fetch(url + "api/message", {
    method: "POST",
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    body: formDataMessage,
  })
    .then(function (response) {
      return response.json();
    })
    .then(
      (window.location = "../html/post.html"),
      alert("Message ajouté")
    )
    .catch((error) => {
      console.log(error);
    });
}

let submitMessage = document.getElementById("form-network");
submitMessage.addEventListener("submit", ($event) => {
  $event.preventDefault();
  createMessage();
});
