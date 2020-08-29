let url = "http://localhost:3000/";

//vérifie les inputs du formulaire
checkInput = () => {
  //Controle Regex
  let checkNumber = /[0-9]/;
  let checkMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let checkSpecialCharacter = /[§!@#$%^&*().?":{}|<>]/;

  //message fin de controle
  let checkMessage = "";

  //Récupération des inputs

  let nom = document.getElementById("nom").value;
  let prenom = document.getElementById("prenom").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  //tests des différents input du formulaire
  //Test du nom
  if (
    checkNumber.test(nom) == true ||
    checkSpecialCharacter.test(nom) == true ||
    nom == ""
  ) {
    checkMessage = "Veuillez vérifier les informations concernant votre nom. Les caractères spéciaux ou les chiffres ne sont pas autorisés";
  } else {
    console.log("Nom accepté");
  }
  //Test du prénom
  if (
    checkNumber.test(prenom) == true ||
    checkSpecialCharacter.test(prenom) == true ||
    prenom == ""
  ) {
    checkMessage = checkMessage + "\n" + "Veuillez vérifier les informations concernant votre prénom. Les caractères spéciaux ou les chiffres ne sont pas autorisés";
  } else {
    console.log("Prénom accepté");
  }
  //Test du mail
  if (checkMail.test(email) == false) {
    checkMessage = checkMessage + "\n" + "Veuillez vérifier les informations concernant votre email. Les caractères spéciaux ne sont pas autorisés";
  } else {
    console.log("Adresse mail acceptée");
  }

  //Si un des champs n'est pas bon => message d'alert avec la raison
  if (checkMessage != "") {
    alert("Il est nécessaire de :" + "\n" + checkMessage);
  }
  //Si le formulaire est validé => construction de l'objet contact
  else {
    user = {
      lastName: nom,
      firstName: prenom,
      email: email,
      password: password,
    };
    return user;
  }
};

//sign up function

function signup() {
  if (checkInput() != null) {
    fetch(url + "api/auth/signup", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer <token>",
      },
      body: JSON.stringify({
        lastname: document.getElementById("nom").value,
        firstname: document.getElementById("prenom").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      }),
    })
      .then(function (response) {
        status = response.status;
        if (status == 201) {
          alert("Login créé. Veuillez vous reconnecter");
          window.location = "../html/login.html";
          return response.json();
        } else {
          alert("Le compte n'a pas pu être créé. L'email est déjà existant dans notre base de données ou le mot de passe renseigné ne correspond pas au format attendu.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    console.log("erreur de formulaire");
  }
}

let signupForm = document.getElementById("form_signup");
signupForm.addEventListener("submit", ($event) => {
  $event.preventDefault();
  signup();
});
