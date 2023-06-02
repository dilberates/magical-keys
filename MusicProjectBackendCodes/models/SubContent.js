const mongoose = require("mongoose");
const SubContentSchema = new mongoose.Schema(
    {
    sub_content_title:String,
    sub_content_status:Boolean,
    sub_content_image:String,
    sub_content_description:String,
    //ilişkili tablo bu şejilde verilir
    content_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content'
      },
      type_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ContentType'
      }
    
    
},{
    collection:"SubContent",
}
);

mongoose.model("SubContent",SubContentSchema);