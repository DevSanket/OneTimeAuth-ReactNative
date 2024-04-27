require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Route = require("./route");

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

//connection to mongoDB
const mongodb = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URL, {
        dbName: "OneTimeRegistration",
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

//Cors Settings
// var whitelist = ["http://localhost:3000"];
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

//Middlewares
app.use(cors());
app.use(logger("dev"));
app.use("/api", Route);
app.get("/", (req, res) => {
  res.send("Working on");
  res.err;
});

app.listen(process.env.PORT || 3001, async () => {
  console.log(`Running on:`, process.env.PORT);
  await mongodb();
  //await connection.connection.mongodb()
});
