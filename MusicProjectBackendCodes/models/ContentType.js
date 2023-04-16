const mongoose = require("mongoose");
const ContentTypeSchema = new mongoose.Schema(
    {
    type_name:String,
    type_status:Boolean,
    
},{
    collection:"ContentType",
}
);

mongoose.model("ContentType",ContentTypeSchema);