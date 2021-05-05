var pool = require("./database").pool;

const express = require("express");
const app = express();

var userRouter = require("./routes/user");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("Request Incoming: ");
  console.log(req.protocol + "://" + req.get("host") + req.originalUrl);
  next();
});

app.use("/users", userRouter);

// Starting our server.
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
