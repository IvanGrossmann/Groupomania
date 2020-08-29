const connection = require("../phpMyAdmin");
const fs = require("fs");

exports.createMessage = (req, res, next) => {
  if (req.file) {
    const title = req.body.title;
    const message = req.body.message;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const user_id = req.body.user_id;
    const Message_image_url = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;

    const queryString =
      "INSERT INTO Messages (title, message, firstname, lastname, user_id, Message_image_url) VALUES (?, ?, ?, ?, ?, ?)";
    const inserts = [
      title,
      message,
      firstname,
      lastname,
      user_id,
      Message_image_url,
    ];
    
    connection.query(queryString, inserts, (error, rows, fields) => {
      
      if (error) {
        return res.status(500).json({ error: "mysql" });
      }
      res.status(201).json({ message: "Le message est ajouté avec succes !" });
    });
  } else {
    const title = req.body.title;
    const message = req.body.message;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const user_id = req.body.user_id;

    const queryString =
      "INSERT INTO Messages (title, message, firstname, lastname, user_id) VALUES (?, ?, ?, ?, ?)";
    const inserts = [title, message, firstname, lastname, user_id];
    connection.query(queryString, inserts, (error, rows, fields) => {
      if (error) {
        return res.status(500).json({ error: "mysql" });
      }
      res.status(201).json({ message: "Le message est ajouté avec succes !" });
    });
  }
};

exports.getAllMessages = (req, res, next) => {
  const queryString =
    "SELECT id, title, message, firstname, lastname, user_id, Message_image_url, date_post  FROM Messages";
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

exports.getOneMessage = (req, res, next) => {
  const id = req.params.id;
  const inserts = [id];
  const queryString =
    "SELECT id, title, message, firstname, lastname, user_id, Message_image_url, date_post FROM Messages WHERE id=?";

  connection.query(queryString, inserts, (error, rows, fields) => {
    if (error) {
      return res.status(500).json({ error: "mysql" });
    } else {
      if (rows[0]) {
        return res.status(200).json(rows[0]);
      } else {
        return res.status(404).json({ error: "Le message n'a pas été trouvé !" });
      }
    }
  });
};

exports.deleteMessage = (req, res, next) => {
  const id = req.params.id;
  const inserts = [id]
  const queryString = "SELECT id, title, message, firstname, lastname, user_id, date_post, Message_image_url FROM Messages WHERE id=?";
  

  connection.query(queryString, inserts, (error, rows, fields) => {
    if(error) { 
      return res.status(500).json({ error: "mysql" });
  }
  else {
      if(rows[0].Message_image_url) {const filename = rows[0].Message_image_url.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
  const id = req.params.id;
  const queryString = "DELETE FROM Messages WHERE id=?"
  const inserts = [id];
  connection.query(queryString, inserts, (error, rows, fields) => {
      if(error) {
          return res.status(500).json({ error: "mysql image" });
      }
      else {
        
          return res.status(200).json({ message: "Le message a été supprimé !"});
      };
    })
  })
} else{
  const id = req.params.id;
  const queryString = "DELETE FROM Messages WHERE id=?"
  const inserts = [id];
  connection.query(queryString, inserts, (error, rows, fields) => {
      if(error) {
          return res.status(500).json({ error: "Il n'y a pas d'image !" });
      }
      else {
        
          return res.status(200).json({ message: "Le message a été supprimé !"});
      };
    })
  }

}
})
}

exports.updateOneMessage = (req, res, next) => {
  const id = req.params.id;
  
  const title= req.body.title;
  const message = req.body.message;
  const queryString = "UPDATE Messages SET title = ?, message = ? WHERE id = ?";
  const inserts = [title, message, id];
  connection.query(queryString, inserts, (error, rows, fields) =>
  {
    
    if(error)
    {
        return res.status(500).json({ error: "mysql" });
    }
    
      
    res.status(200).json({ message: 'Message modifié !'});
  }
);
};
