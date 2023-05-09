const mongoose = require("mongoose");
const StudentLevelSchema = new mongoose.Schema(
    {
    level_priority:Number,
    content_priority:Number,
    //ilişkili tablo bu şejilde verilir
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
      }


    
},{
    collection:"StudentLevel",
}
);

mongoose.model("StudentLevel",StudentLevelSchema);