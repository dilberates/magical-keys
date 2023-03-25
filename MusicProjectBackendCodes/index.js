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

require("./models/Teacher");

const User = mongoose.model("TeacherInfo");

app.post("/register-teacher", async (req, res) => {
    const { username, password, confirmPassword, fullname,email} = req.body;
  
    const encryptedPassword = await bcrypt.hash(password, 10);
    const encryptedConfirmPassword = await bcrypt.hash(confirmPassword, 10);
    try {
        
      const oldUser = await User.findOne({ username });
  
      if (oldUser) {
        return res.json({ error: "User Exists" });
      }
      
      await User.create({
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

  app.post("/login-teacher", async (req, res) => {
    const { username, password } = req.body;
  
    const user = await User.findOne({ username });
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



app.listen(5000,()=>{
    console.log("Server started");
})