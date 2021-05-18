var express = require("express");
var router = express.Router();
var pool = require("../database").pool;
var mysql = require("../database").mysql;

// GET makes listing.
// TODO: Cache the data
router.get("/", function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if (err) throw err; // When not connected
    var sql = `
    SELECT *
    FROM ??
    WHERE 1=1
    AND IsDeleted = 0
    `;
    var parameters = ["ea_db.dealership"];
    sql = mysql.format(sql, parameters);
    connection.query(sql, function (error, results, fields) {
      connection.release();
      if (error) {
        console.log(error);
        res.status(500).send({ error: "Database Error" });
      } else if (results.length > 0) {
        res.status(200).send({ body: results });
      } else {
        res.status(404).send({ error: "Makes could not be retrieved" });
      }
    });
  });
});

module.exports = router;
