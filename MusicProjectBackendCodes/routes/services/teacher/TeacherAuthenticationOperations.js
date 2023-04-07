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


  require("../../../models/Teacher");

  const Teacher = mongoose.model("TeacherInfo");

  router.post("/register-teacher",async function(req,res){
    const { username, password, confirmPassword, fullname,email} = req.body;
  
    const encryptedPassword = await bcrypt.hash(password, 10);
    const encryptedConfirmPassword = await bcrypt.hash(confirmPassword, 10);
    try {
        
      const oldUser = await Teacher.findOne({ username });
  
      if (oldUser) {
        return res.json({ error: "User Exists" });
      }
      
      await Teacher.create({
        username,
        password: encryptedPassword,
        confirmPassword:encryptedConfirmPassword,
        fullname,
        email
        
      });
      res.send({ status: "ok" });
    } catch (error) {
      res.send({ status: "error" });
    }
    
  });

  router.post("/login-teacher",async function(req,res){
    const { username, password } = req.body;
  
    const user = await Teacher.findOne({ username });
    console.log(user.username);
    if (!user) {
      return res.json({ error: "User Not found" });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ username: user.username }, JWT_SECRET, {
        expiresIn: "15m",
      });
  
      if (res.status(201)) {
        return res.json({ status: "ok", data: token });
      } else {
        return res.json({ error: "error" });
      }
    }
    res.json({ status: "error", error: "InvAlid Password" });
    
  });

  const generateRandomString = (myLength) => {
    const chars =
      "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    const randomArray = Array.from(
      { length: myLength },
      (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );
  
    const randomString = randomArray.join("");
    return randomString;
  };

  router.post("/forgot-password-teacher",async function(req,res){
    const { email } = req.body;
    var nodemailer = require('nodemailer');
    var code = generateRandomString(8);
  
    const user = await Teacher.findOne({ email });
    
    if (!user) {
      return res.json({ error: "User Not found" });
    }
    try {
    
      //const query = { email: email };//güncelleme şartı
      //const update = { $set: { password: code }};//güncellenecek değerler
      //const options = {};
      //var check = User.updateOne(query,update,options);
      //console.log(check);
      const encryptedPassword = await bcrypt.hash(code, 10);
      await Teacher.updateOne(
        {
          email: email,
        },
        {
          $set: {
            password: encryptedPassword,
            confirmPassword:encryptedPassword,
          },
        }
      );
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "mmagicalkeyss@gmail.com",
          pass: "mctbpsjpuuitajiu",
        },
      });
  
      var mailOptions = {
        from: "mmagicalkeyss@gmail.com",
        to: email,
        subject: "Şifre Sıfırlama Talebi",
        text: "Magical Keys uygulama hesabınız için şifre sıfırlama talebinde bulundunuz.\n"+email+" mail adresiniz için atanan geçici şifreniz "+code+" olarak belirlenmiştir.\nGeçici şifreniz ile sisteme giriş yaptıktan sonra parolanızı değiştirmeyi unutmayın!"
      };
  
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log("Hata durumu")
          console.log(error);
          res.send({ status: "error" });
        } else {
          console.log('Email sent: ' + info.response);

          res.send({ status: "ok" });
        }
      });
      
    } catch (error) {
      console.log(error);
      
    }
    
    
  });




module.exports=router;