const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

  //routes
const adminRoutes = require("./routes/services/admin/AdminOperations");
app.use(adminRoutes);
const adminAuthenticationRoutes = require("./routes/services/admin/AdminAuthenticationOperations");
app.use(adminAuthenticationRoutes);
const studentAuthenticationRoutes = require("./routes/services/student/StudentAuthenticationOperations");
app.use(studentAuthenticationRoutes);
const teacherAuthenticationRoutes = require("./routes/services/teacher/TeacherAuthenticationOperations");
app.use(teacherAuthenticationRoutes);

app.listen(27017,()=>{
    console.log("Server started");
})