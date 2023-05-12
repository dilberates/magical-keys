const express = require("express");
const router = express.Router();
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
const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

  require("../../../models/StudentLevel");

const StudentLevel = mongoose.model("StudentLevel");

//öğrencinin son seviye durumunu göstermek için giriş yapan öğrencinin student-level değerlerini getirir
router
  .route("/student-levels/:id")
  // Get Single Student
  .get(async (req, res) => {
    const student_id = req.params.id;
  try {
    const studentLevels = await StudentLevel.findOne(student_id);
   
    console.log("Student Levels By Logged User")
    console.log(studentLevels);
    res.send(studentLevels);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
    
  });