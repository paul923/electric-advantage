var express = require("express");
var router = express.Router();
var pool = require("../database").pool;
var mysql = require("../database").mysql;

// GET users listing.
router.get("/", function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if (err) throw err; // When not connected
    var sql = `
    SELECT *
    FROM ??
    `;
    var parameters = ["electric_advantage.user"];
    sql = mysql.format(sql, parameters);
    connection.query(sql, function (error, results, fields) {
      connection.release();
      if (error) {
        console.log(error);
        res.status(500).send({ body: "Database Error" });
      } else if (results.length > 0) {
        res.status(200).send({ body: results });
      } else {
        res.status(404).send({ body: "Users could not be retrieved" });
      }
    });
  });
});

// GET a single user by ID.
router.get("/:userId", function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if (err) throw err; // When not connected
    var sql = `
    SELECT *
    FROM ??
    WHERE userId = ?
    `;
    var parameters = ["electric_advantage.user", req.params.userId];
    sql = mysql.format(sql, parameters);
    connection.query(sql, function (error, results, fields) {
      connection.release();
      if (error) {
        console.log(error);
        res.status(500).send({ body: "Database Error" });
      } else if (results.length > 0) {
        res.status(200).send({ body: results });
      } else {
        res.status(404).send({ body: "Users could not be retrieved" });
      }
    });
  });
});

// POST user
router.post("/", function (req, res, next) {
  // Connecting to the database.
  pool.getConnection(function (err, connection) {
    if (err) throw err; // not connected!
    var user = req.body;
    var sql = "INSERT INTO electric_advantage.user SET ?";
    sql = mysql.format(sql, user);
    console.log(sql);
    connection.query(sql, function (error, results, fields) {
      connection.release();
      if (error) {
        if (error.code == "ER_DUP_ENTRY") {
          res.status(400).send({
            body: error.sqlMessage,
          });
        } else {
          res.status(500).send({ body: "Database Error" });
        }
      } else if (results.affectedRows > 0) {
        res.status(201).send({
          body: `User Created with UserId: ${user.UserID}`,
        });
      }
    });
  });
});

module.exports = router;
