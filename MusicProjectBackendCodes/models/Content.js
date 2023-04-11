const mongoose = require("mongoose");
const ContentSchema = new mongoose.Schema(
    {
    content_title:String,
    content_description:String,
    level_id:String,
    content_status:Boolean
    
},{
    collection:"Content",
}
);

mongoose.model("Content",ContentSchema);