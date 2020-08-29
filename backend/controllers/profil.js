const connection = require('../phpMyAdmin');

exports.getProfil = (req, res, next) => {
  
    const id = req.params.id;
    const inserts = [id]
    const queryString = "SELECT id, firstname, lastname, email, password, role FROM Users WHERE id=?";
 
    connection.query(queryString, inserts, (error, rows, fields) => {
      if(error) { 
          return res.status(500).json({ error: "mysql" });
      }
      else {
          if(rows[0]) {
              return res.status(200).json(rows[0]);
          }
          else {
              return res.status(404).json({ error: "Utilisateur non trouvé"});
          }
      }
  });
};


exports.deleteProfil = (req, res, next) => {
 const id = req.params.id;
 const queryString = "DELETE FROM Users WHERE id=?"
 const inserts = [id];
 connection.query(queryString, inserts, (error, rows, fields) => {
     if(error) {
         return res.status(500).json({ error: "mysql" });
     }
     else {
         return res.status(200).json({ message: "Utilisateur supprimé !"});
     }
 });
}

exports.getAllUsers = (req, res, next) => {
    const queryString = "SELECT id, firstname, lastname, email, role FROM Users";
 
    connection.query(queryString, (error, rows, fields) => {
      if(error) { 
          return res.status(500).json({ error: "mysql" });
      }
      else  {
        if(rows[0]) {
            return res.status(200).json(rows);
        }
          }
          
          }
    );
};
