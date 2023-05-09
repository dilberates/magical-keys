const mongoose = require("mongoose");
const LevelSchema = new mongoose.Schema(
    {
    level_title:String,
    level_description:String,
    level_status:Boolean,
    level_image:String,
    level_priority:Number,
    completed_status:Boolean//bir seviyeyi tamamlama durumunu tutar
    
},{
    collection:"Level",
}
);

mongoose.model("Level",LevelSchema);
