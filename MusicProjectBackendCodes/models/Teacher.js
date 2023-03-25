const mongoose = require("mongoose");
const TeacherSchema = new mongoose.Schema(
    {
    username:String,
    password:String,
    confirmPassword:String,
    fullname:String,
    email:String
    
},{
    collection:"TeacherInfo",
}
);
mongoose.model("TeacherInfo",TeacherSchema);

