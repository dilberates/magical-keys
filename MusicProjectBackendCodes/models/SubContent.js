const mongoose = require("mongoose");
const SubContentSchema = new mongoose.Schema(
    {
    sub_content_title:String,
    sub_content_status:Boolean,
    //ilişkili tablo bu şejilde verilir
    content_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content'
      }
    
    
},{
    collection:"SubContent",
}
);

mongoose.model("SubContent",SubContentSchema);