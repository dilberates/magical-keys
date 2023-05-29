const mongoose = require("mongoose");
const SongSchema = new mongoose.Schema(
    {
    song_name:String,
    song_description:String,
    song_status:Boolean,
    song_image:String
    
},{
    collection:"Song",
}
);

mongoose.model("Song",SongSchema);