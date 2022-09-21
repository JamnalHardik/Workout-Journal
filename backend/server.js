require("dotenv").config();

const express = require("express");
const workoutRoute = require("./routes/workout");
const mongoose = require("mongoose");
const app = express();

app.get("/test-route", (req, res) => {
  res.send("Success!!");
});

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/workouts", workoutRoute);
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to db and listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
