const mysql = require("mysql");

const connection = mysql.createConnection ({
    host: "localhost",
    user: "root",
    password: "2012.1876",
    database: "groupomania_intranet"
  });
  connection.connect ((err) => {
    if (err) throw err;
    console.log ('Connecté!');
  });

  module.exports = connection;