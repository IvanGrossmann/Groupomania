const express = require("express");
const router = express.Router();  

const auth = require("../middleware/auth");

const profilCtrl = require("../controllers/profil");

router.get("/", auth, profilCtrl.getAllUsers);
router.get("/:id", auth, profilCtrl.getProfil);
router.delete("/:id", auth, profilCtrl.deleteProfil);

module.exports = router;