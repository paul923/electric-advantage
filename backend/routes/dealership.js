var express = require("express");
var router = express.Router();
var pool = require("../database").pool;
var mysql = require("../database").mysql;

// GET all dealerships in database
// TODO: Cache the data
router.get("/", function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if (err) throw err; // When not connected
    var sql = `
    SELECT *
    FROM ??
    WHERE 1=1
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
        res.status(404).send({ error: "Dealerships could not be retrieved" });
      }
    });
  });
});

// GET dealership by userID
router.get("/:userID", function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if (err) throw err; // When not connected
    var userID = req.params.userID;
    var sql = `
    SELECT *
    FROM ??
    WHERE 1=1
    AND UserID = ?
    `;
    var parameters = ["ea_db.dealership", userID];
    sql = mysql.format(sql, parameters);
    console.log(sql);
    connection.query(sql, function (error, results, fields) {
      connection.release();
      if (error) {
        console.log(error);
        res.status(500).send({ error: "Database Error" });
      } else if (results.length > 0) {
        res.status(200).send({ body: results });
      } else {
        res
          .status(404)
          .send({ error: `Dealership with ${userID} could not be retrieved` });
      }
    });
  });
});

// POST dealership
router.post("/", function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if (err) throw err; // When not connected
    var dealership = req.body;
    var sql = `
    INSERT INTO ??
    SET ?
    `;
    var parameters = ["ea_db.dealership", dealership];
    sql = mysql.format(sql, parameters);
    console.log(sql);
    connection.query(sql, function (error, results, fields) {
      connection.release();
      if (error) {
        console.error(error);
        if (error.code == "ER_DUP_ENTRY") {
          res.status(400).send({
            error: error.sqlMessage,
          });
        } else {
          res.status(500).send({ error: "Database Error" });
        }
      } else if (results.affectedRows > 0) {
        res.status(201).send({
          body: `Dealership created with DealershipID: ${results.insertId}`,
        });
      }
    });
  });
});

// PUT dealership by dealershipID
router.put("/:dealershipID", function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if (err) throw err; // When not connected
    var dealershipID = req.params.dealershipID;
    var dealership = req.body;
    var sql = `
    UPDATE ?? 
    SET ?  
    WHERE 1=1
    AND DealershipID = ?
    ;
    `;
    var parameters = ["ea_db.dealership", dealership, dealershipID];
    sql = mysql.format(sql, parameters);
    console.log(sql);
    connection.query(sql, function (error, results, fields) {
      connection.release();
      if (error) {
        console.log(error);
        res.status(500).send({ error: "Database Error" });
      } else if (results.affectedRows > 0) {
        res
          .status(200)
          .send({ body: `Dealership with ID: ${dealershipID} updated.` });
      } else {
        res.status(404).send({
          error: `Dealership with ${dealershipID} could not be found`,
        });
      }
    });
  });
});

module.exports = router;
