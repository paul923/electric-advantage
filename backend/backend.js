var pool = require("./database").pool;

const express = require("express");
const cors = require("cors");
const app = express();

var userRouter = require("./routes/user");
var makeRouter = require("./routes/make");
var vehicleRouter = require("./routes/vehicle");
var inventoryRouter = require("./routes/inventory");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.options("*", cors());

app.use(function (req, res, next) {
  console.log("Request Incoming: ");
  console.log(req.protocol + "://" + req.get("host") + req.originalUrl);
  next();
});

app.use("/users", userRouter);
app.use("/vehicles", vehicleRouter);
app.use("/makes", makeRouter);
app.use("/inventories", inventoryRouter);

// Starting our server.
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
