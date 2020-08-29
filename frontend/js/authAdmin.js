function verifRole() {
    if (localStorage.getItem("role") === "classic") {
      window.location = "../html/accueil.html";
    }
  }
  
  verifRole();