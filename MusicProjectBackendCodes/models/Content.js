const mongoose = require("mongoose");
const ContentSchema = new mongoose.Schema(
    {
    content_title:String,
    content_description:String,
    content_status:Boolean,
    content_priority:Number,
    completed_status:Boolean,
    //ilişkili tablo bu şejilde verilir
    level_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Level'
      }


    
},{
    collection:"Content",
}
);

mongoose.model("Content",ContentSchema);