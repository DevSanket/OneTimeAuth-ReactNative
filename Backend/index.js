require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const v1Route = require("./v1/route");

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

//connection to mongoDB
const mongodb = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URL, {
        useUnifiedTopology: true,
        dbName: "OneTimeRegistration",
        useNewUrlParser: true,
      })
      .then(() => {
        console.log("MongoDB Connected");
      })
      .catch((err) => {
        console.log("MongoDB Not Connected");
      });
  } catch (error) {
    console.error(error);
  }
};

//Middlewares
app.use(cors());
app.use(logger("dev"));
app.use("/api/v1", v1Route);
app.get("/", (req, res) => {
  res.send("Working on");
  res.err;
});

app.listen(process.env.PORT || 3001, async () => {
  console.log(`Running on:`, process.env.PORT);
  await mongodb();
  //await connection.connection.mongodb()
});
