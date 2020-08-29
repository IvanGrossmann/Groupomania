const connection = require("../phpMyAdmin"); //cherche mon fichier sql pour stockage

exports.createCommentaire = (req, res, next) => {
  const user_id = req.body.user_id;
  const commentaire = req.body.commentaire;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const message_id = req.body.message_id;

  const queryString =
    "INSERT INTO Commentaires (user_id, firstname, lastname, message_id, commentaire) VALUES (?, ?, ?, ?, ?)";
  const inserts = [user_id, firstname, lastname, message_id, commentaire];

  connection.query(queryString, inserts, (error, rows, fields) => {
    if (error) {
      return res.status(500).json({ error: "mysql" });
    }
    res.status(201).json({ message: "Commentaire ajouté !" });
  });
};

exports.getAllCommentaires = (req, res, next) => {
  const queryString =
    "SELECT id, commentaire, firstname, lastname, message_id, user_id, date_commentaire FROM Commentaires";
  connection.query(queryString, (error, rows, fields) => {
    if (error) {
      return res.status(500).json({ error: "mysql" });
    } else {
      if (rows[0]) {
        return res.status(200).json(rows);
      }
    }
  });
};

exports.deleteCommentaire = (req, res, next) => {
  const id = req.params.id;
  const queryString = "DELETE FROM Commentaires WHERE id=?";
  const inserts = [id];
  connection.query(queryString, inserts, (error, rows, fields) => {
    if (error) {
      return res.status(500).json({ error: "mysql" });
    } else {
      return res.status(200).json({ message: "Commentaire supprimé !" });
    }
  });
};
