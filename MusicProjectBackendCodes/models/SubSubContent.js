const mongoose = require("mongoose");
const SubSubContentSchema = new mongoose.Schema(
    {
    sub_sub_content_title:String,
    sub_sub_content_status:Boolean,
    //ilişkili tablo bu şejilde verilir
    sub_content_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubContent'
      },
      type_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ContentType'
      }
    
    
},{
    collection:"SubSubContent",
}
);

mongoose.model("SubSubContent",SubSubContentSchema);