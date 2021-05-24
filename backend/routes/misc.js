var express = require("express");
var router = express.Router();
var pool = require("../database").pool;
var mysql = require("../database").mysql;

// GET users listing.
router.get("/colors", function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if (err) throw err; // When not connected
    var sql = `
    SELECT *
    FROM ??
    `;
    var parameters = ["ea_db.color"];
    sql = mysql.format(sql, parameters);
    connection.query(sql, function (error, results, fields) {
      connection.release();
      if (error) {
        console.log(error);
        res.status(500).send({ body: "Database Error" });
      } else if (results.length > 0) {
        res.status(200).send({ body: results });
      } else {
        res.status(404).send({ body: "Colors could not be retrieved" });
      }
    });
  });
});

// GET all model listing.
router.get("/models", function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if (err) throw err; // When not connected
    var sql = `
    SELECT *
    FROM ??
    JOIN ea_db.vehicle_make
      ON vehicle_model.MakeID = vehicle_make.MakeID
    `;
    var parameters = ["ea_db.vehicle_model"];
    sql = mysql.format(sql, parameters);
    connection.query(sql, function (error, results, fields) {
      connection.release();
      if (error) {
        console.log(error);
        res.status(500).send({ body: "Database Error" });
      } else if (results.length > 0) {
        res.status(200).send({ body: results });
      } else {
        res.status(404).send({ body: "Models could not be retrieved" });
      }
    });
  });
});

module.exports = router;
