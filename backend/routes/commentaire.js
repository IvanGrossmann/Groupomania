const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const commentaireCtrl = require("../controllers/commentaire");

router.post("/", auth, multer, commentaireCtrl.createCommentaire);
router.get("/", auth, commentaireCtrl.getAllCommentaires);
router.delete("/:id", auth, commentaireCtrl.deleteCommentaire);

module.exports = router;