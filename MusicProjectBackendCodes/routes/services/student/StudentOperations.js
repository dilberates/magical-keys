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

router.get('/student-levels-by-id/:studentId', async (req, res) => {
  console.log("istek kontrol");
  const studentId = req.params.studentId;
  console.log("istek kontrol id değeri"+studentId);
  try {
    //const studentLevels = await StudentLevel.findOne(studentId);
    //const filteredLevels = StudentLevel.filter(level => level.student_id === studentId);
    const filteredLevels2 = await StudentLevel.find({ student_id: studentId });
    console.log("Student Levels By Logged User")
    console.log(filteredLevels2);
    res.json(filteredLevels2);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

});
module.exports=router;