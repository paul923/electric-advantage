var express = require("express");
var router = express.Router();
var pool = require("../database").pool;
var mysql = require("../database").mysql;

// GET vehicles in inventory.
// TODO: insert query parameter
// TODO: calculate if the user is within the range (closest 20)
router.get("/", function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if (err) throw err; // When not connected

    let makeID = req.query.makeID;
    let evRange = req.query.evRange;
    let startPrice = req.query.startPrice;
    let conditionID = req.query.conditionID;
    let lat = req.query.lat;
    let lng = req.query.lng;

    const kmFactor = 6373;
    const mileFactor = 3959;
    const defaultRadius = 50;
    const defaultNumResult = 20;
    var sql = `
    SELECT * , (
      ${kmFactor} * acos (
        cos ( radians(${lat}) )
        * cos( radians( Latitude ) )
        * cos( radians( Longitude ) - radians(${lng}) )
        + sin ( radians(${lat}) )
        * sin( radians( Latitude ) )
      )
    ) AS Distance
    FROM (SELECT VehicleID, EVRange, BatterySize, Trim, Year, vehicle.ModelID, ModelName, MakeID
          FROM ea_db.vehicle 
          JOIN ea_db.vehicle_model 
            ON vehicle.ModelID = vehicle_model.ModelID
          WHERE vehicle.IsDeleted = 0) AS vehicle
    JOIN ea_db.vehicle_inventory 
      ON vehicle.VehicleID = vehicle_inventory.VehicleID
    JOIN (SELECT DealershipID, Latitude, Longitude
      FROM ea_db.dealership) as dealership
      ON vehicle_inventory.DealershipID = dealership.DealershipID
    WHERE 1=1
    `;

    if (makeID) {
      sql += ` AND MakeID=${makeID}`;
    }
    if (evRange) {
      sql += ` AND EVRange < ${evRange}`;
    }
    if (startPrice) {
      sql += ` AND StartPrice < ${startPrice}`;
    }
    if (conditionID) {
      sql += ` AND ConditionID = ${conditionID}`;
    }

    sql += `
    AND IsDeleted = 0
    HAVING Distance < ${defaultRadius}
    ORDER BY Distance
    LIMIT 0 , ${defaultNumResult};`;
    console.log(sql);
    connection.query(sql, function (error, results, fields) {
      connection.release();
      if (error) {
        console.log(error);
        res.status(500).send({ error: "Database Error" });
      } else if (results.length > 0) {
        res.status(200).send({ body: results });
      } else {
        res.status(404).send({ error: "vehicles could not be retrieved" });
      }
    });
  });
});

module.exports = router;
