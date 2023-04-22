const mongoose = require("mongoose");
const LevelSchema = new mongoose.Schema(
    {
    level_title:String,
    level_description:String,
    level_status:Boolean
    
},{
    collection:"Level",
}
);

mongoose.model("Level",LevelSchema);
