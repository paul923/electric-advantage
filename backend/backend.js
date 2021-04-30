const express = require("express");
const app = express();

const mysql = require("mysql");
const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "elecdev",
  password: "develop@919ctric",
  connectionLimit: 5,
});

pool.getConnection(function (err, connection) {
  if (err) throw err; // not connected!
  connection.query(
    "SELECT * FROM electric_advantage.vehicle_info;",
    function (err, rows, fields) {
      if (!err) {
        console.log(JSON.stringify(rows, null, 4));
      } else {
        console.log("query error: " + err);
      }
    }
  );
});

// Starting our server.
app.listen(3000, () => {
  console.log("Listening on Port 3000");
});
