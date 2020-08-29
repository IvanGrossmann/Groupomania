const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const messageCtrl = require("../controllers/message");

router.post("/", auth, multer, messageCtrl.createMessage);
router.get("/", auth, messageCtrl.getAllMessages);
router.get("/:id", auth, messageCtrl.getOneMessage);
router.patch("/:id", auth, multer, messageCtrl.updateOneMessage);
router.delete("/:id", auth, messageCtrl.deleteMessage);


module.exports = router;
