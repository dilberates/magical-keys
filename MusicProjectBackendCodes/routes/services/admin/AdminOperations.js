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

require("../../../models/Level");

const Level = mongoose.model("Level");

router.post("/add-level",async function(req,res){
    const { level_title, level_description} = req.body;

  console.log("level title "+level_title);
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

module.exports=router;