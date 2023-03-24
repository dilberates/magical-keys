const mongoose = require("mongoose");
const TeacherSchema = new mongoose.Schema(
    {
    username:String,
    password:String,
    confirmPassword:String,
    fullname:String,
    
},{
    collection:"TeacherInfo",
}
);
mongoose.model("TeacherInfo",TeacherSchema);

