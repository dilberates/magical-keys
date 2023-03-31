const mongoose = require("mongoose");
const StudentSchema = new mongoose.Schema(
    {
    username:String,
    password:String,
    confirmPassword:String,
    fullname:String,
    email:String
    
},{
    collection:"StudentInfo",
}
);
mongoose.model("StudentInfo",StudentSchema);