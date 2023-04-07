const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");

const mongoUrl = "mongodb://localhost:27017/musicprojectdb";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database for admin");
  })
  .catch((e) => console.log(e));

require("./models/Level");

const Level = mongoose.model("Level");

app.post("/add-level", async (req, res) => {
  const { level_title, level_description, level_status} = req.body;

  const levelStatus = true;
  try {
      
    const oldLevel = await Level.findOne({ level_title });

    if (oldLevel) {
      return res.json({ error: "Level Exists" });
    }
    
    await Level.create({
      level_title,
      level_description,
      level_status:levelStatus
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});
