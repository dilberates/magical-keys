const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const mongoUrl = "mongodb://localhost:27017/musicprojectdb";

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

app.post("/register", async (req, res) => {
    const { username, password, confirmPassword, fullname} = req.body;
  
    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        /*
      const oldUser = await User.findOne({ email });
  
      if (oldUser) {
        return res.json({ error: "User Exists" });
      }
      */
      await User.create({
        username,
        password: encryptedPassword,
        confirmPassword:encryptedPassword,
        fullname
      });
      res.send({ status: "ok" });
    } catch (error) {
      res.send({ status: "error" });
    }
  });

app.post("/register",async(req,res)=>{
    const {username,password,confirmPassword,fullname} = req.body;
    try {
        await User.create({
            username,
            password,
            confirmPassword,
            fullname
        });
        res.send({status:"ok"});
    } catch (error) {

        res.send({status:"error"});
    }
})

app.listen(5000,()=>{
    console.log("Server started");
})