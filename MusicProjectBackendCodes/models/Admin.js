const mongoose = require("mongoose");
const AdminSchema = new mongoose.Schema(
    {
    username:String,
    password:String,
    
},{
    collection:"Admin",
}
);
mongoose.model("Admin",AdminSchema);