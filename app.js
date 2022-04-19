var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var hahuRouter = require("./routes/danube");

var mongoose = require("mongoose");
const MONGODB_URI = "mongodb://127.0.0.1:27017/danubeBridges";

mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true })
    .then(console.log("Connected to MongoDB"))
    .catch((err) => {
        console.log(err);
    });

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use('/api/danube/bridges', hahuRouter);

module.exports = app;