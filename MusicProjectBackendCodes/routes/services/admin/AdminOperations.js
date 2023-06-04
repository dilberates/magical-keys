const express = require("express");
const router = express.Router();
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
const MongoClient = require('mongodb').MongoClient;

const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");

const mongoUrl = "mongodb://localhost:27017/musicprojectdb";
const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");

  })
  .catch((e) => console.log(e));


require("../../../models/Level");

const Level = mongoose.model("Level");


require("../../../models/ContentType");
const Type = mongoose.model("ContentType");
require("../../../models/Song");

const Song = mongoose.model("Song");
require("../../../models/SubContent")
const SubContent = mongoose.model("SubContent");

function getNextSequenceValue(sequenceName){
  var sequenceDocument = Level.findAndModify({
     query:{_id: sequenceName },
     update: {$inc:{sequence_value:1}},
     new:true
  });
  return sequenceDocument.sequence_value;
}

require("../../../models/Content");

const Content = mongoose.model("Content");

//veri ekleme
router.post("/add-level",async function(req,res){
    const { level_title, level_description, level_image} = req.body;

  console.log("level title "+level_title);
  const levelStatus = true;

  try {
    
    
    const oldLevel = await Level.findOne({ level_title });

    if (oldLevel) {
      return res.json({ error: "Level Exists" });
    }
    //kilit için priority değerleri
    const level_priority=1;
    var levelPriority=1;
    var completedStatus = false;
    const oldLevelPriority = await Level.findOne({ level_priority });
    console.log("Old Level Priority :"+oldLevelPriority);
    const check = oldLevelPriority==null || oldLevelPriority==true;
    console.log("Check :"+check);
    if (check) {
      levelPriority=1;
      completedStatus=true;//1.öncelikli olan ilk derece olduğu için her zaman açık
  
    }else{
      console.log("deneme priority");
      
      const lastLevelPriority2 = await Level.findOne({ level_priority: { $exists: true } }, { sort: { level_priority: -1 } },{ level_priority: 1 });

      console.log("Last Level Priority"+lastLevelPriority2);

      const levelPriorityValue = await Level.findOne({ _id: lastLevelPriority2 }, { level_priority: 1 });

      levelPriority = levelPriorityValue.level_priority +1;
      console.log("Level Priority"+levelPriority);
      completedStatus=false;

    }
    

    await Level.create({
      level_title,
      level_description,
      level_status:levelStatus,
      level_image,
      level_priority:levelPriority,
      completed_status:completedStatus
      

    });
    

    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
    
});
//şarkı ekleme
router.post("/add-song",async function(req,res){
  const { song_name, song_description, song_image} = req.body;

console.log("song title "+song_name);
const songStatus = true;

try {
  
  
  const oldSong = await Song.findOne({ song_name });

  if (oldSong) {
    return res.json({ error: "Song Exists" });
  }


  await Song.create({
    song_name,
    song_description,
    song_status:songStatus,
    song_image,
  });
  

  res.send({ status: "ok" });
} catch (error) {
  res.send({ status: "error" });
}
  
});

// Type Ekleme 
router.post("/add-type",async function(req,res){
  const { type_name} = req.body;

console.log("type name "+type_name);
const type_status = true;

try {
  
  const oldType = await Type.findOne({ type_name });

  if (oldType) {
    return res.json({ error: "Type Exists" });
  }
  
  await Type.create({
    type_name,
    type_status:type_status
  });
  

  res.send({ status: "ok" });
} catch (error) {
  res.send({ status: "error" });
}
  
});
// Veri listeleme endpoint'i
router.get('/content-levels',async (req, res) => {
  /*
  await Level.find({}).toArray((err, result) => {
    if (err) throw err;
    res.send(result);
  });
  */
  

  try {
    const result = await Level.find();
   
    //console.log("Seviyeler")
    //console.log(result);
    res.send(result);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
 
});
// Veri listeleme endpoint'i
router.get('/subcontent-contents',async (req, res) => {
  /*
  await Level.find({}).toArray((err, result) => {
    if (err) throw err;
    res.send(result);
  });
  */
  

  try {
    const result = await Content.find();
   
    //console.log("Seviyeler")
    //console.log(result);
    res.send(result);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
 
});

router.get('/sub-content-types',async (req, res) => {
  /*
  await Level.find({}).toArray((err, result) => {
    if (err) throw err;
    res.send(result);
  });
  */
  

  try {
    const result = await Type.find();
   
    console.log("Tipler")
    console.log(result);
    res.send(result);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
 
});

// Veri kaydetme endpoint'i
router.post("/add-new-content",async function(req,res){
  const { content_title, content_description,content_image,selectedValue} = req.body;
  console.log("content title "+content_title);
console.log("level id "+selectedValue);
const contentStatus = true;

try {
  
  const oldContent = await Level.findOne({ content_title });

  if (oldContent) {
    return res.json({ error: "Content Exists" });
  }
  const content_priority=1;
  var contentPriority=1;
  var completedStatus = false;
  const oldContentPriority = await Content.findOne({ content_priority });
  console.log("Old Content Priority :"+oldContentPriority);
  const check = oldContentPriority==null || oldContentPriority==true;
  console.log("Check :"+check);
  if (check) {
    contentPriority=1;
    completedStatus=true;//false olanda kilit olacak
  
  }else{
      
    const lastContentPriority2 = await Content.findOne({ content_priority: { $exists: true } }, { sort: { content_priority: -1 } },{ content_priority: 1 });

    console.log("Last Content Priority"+lastContentPriority2);

    const contentPriorityValue = await Content.findOne({ _id: lastContentPriority2 }, { content_priority: 1 });

    contentPriority = contentPriorityValue.content_priority +1;
    console.log("Content Priority"+contentPriority);
    completedStatus=false;

  }
  
  await Content.create({
    content_title,
    content_description,
    content_image,
    content_priority:contentPriority,
    level_id:selectedValue,
    content_status:contentStatus,
    completed_status:completedStatus

  });
  

  res.send({ status: "ok" });
} catch (error) {
  res.send({ status: "error" });
}
  
});

// Veri kaydetme endpoint'i
router.post("/add-new-sub-content",async function(req,res){
  const { sub_content_title,sub_content_description,sub_content_image,selectedContent,selectedContentType} = req.body;
console.log("selected content id "+selectedContent);
console.log("selected content type id "+selectedContentType);
const subContentStatus = true;

try {
  
  
  
  await SubContent.create({
    sub_content_title,
    sub_content_description,
    sub_content_image,
    type_id:selectedContentType,
    content_id:selectedContent,
    sub_content_status:subContentStatus
  });
  

  res.send({ status: "ok" });
} catch (error) {
  res.send({ status: "error" });
}
  
});
//New Content Add
//veri ekleme
router.post("/add-content",async function(req,res){
  const { content_title,content_description, level_id} = req.body;

const contentStatus = true;

try {
  
  const oldContent = await Content.findOne({ content_title });

  if (oldContent) {
    return res.json({ error: "Content Exists" });
  }
  
  await Content.create({
    content_title,
    content_description,
    level_id,
    content_status:contentStatus
  });
  

  res.send({ status: "ok" });
} catch (error) {
  res.send({ status: "error" });
}
  
});



// CREATE LEVEL
router.post("/create-level", (req, res, next) => {
  Level.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});
  
//read levels- veri listeleme
router.get('/levels', async (req, res) => {
  try {
    const levels = await Level.find();
   
    //console.log("Veriler 1")
    //console.log(levels);
    res.send(levels);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//read songs- veri listeleme
router.get('/songs', async (req, res) => {
  try {
    const songs = await Song.find();
   
    //console.log("Veriler 1")
    //console.log(levels);
    res.send(songs);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


//read types- veri listeleme
router.get('/types', async (req, res) => {
  try {
    const types = await Type.find();
   
    console.log("Veriler 1")
    console.log(types);
    res.send(types);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//read levels- veri listeleme
router.get('/contents', async (req, res) => {
  try {
    
    //ilişkili tablodan değer getirme
   const contentsValues = await Content.find().populate('level_id').exec();
   console.log("Contents Değerleri");
   console.log(contentsValues);
  
  
    res.send(contentsValues);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//read subcontents- veri listeleme
router.get('/subContents', async (req, res) => {
  try {
    
    //ilişkili tablodan değer getirme
   const subContentsValues = await SubContent.find().populate('content_id').populate('type_id').exec();
   console.log("SubContents Değerleri");
   console.log(subContentsValues);
  
  
    res.send(subContentsValues);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//UPDATE CONTENT
router
  .route("/update-content/:id")
  // Get Single Student
  .put(async (req, res) => {
    console.log("Verileri güncelle apiye girdi");
    await Content.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(content => res.json(content))
    .catch(err => res.status(500).json({ error: err.message }));
  });

  //UPDATE TYPE
  router
  .route("/update-type/:id")
  .put(async (req, res) => {
    console.log("Verileri güncelle apiye girdi");
    await Type.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(content => res.json(content))
    .catch(err => res.status(500).json({ error: err.message }));
  });

//DELETE CONTENT
router
  .route("/delete-content/:id")
  // Get Single Student
  .delete(async (req, res) => {
    console.log("Verileri sil apiye girdi");
    await Content.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'Content deleted successfully' }))
    .catch(err => res.status(500).json({ error: err.message }));
  });
// UPDATE student
router
  .route("/update-level/:id")
  // Get Single Student
  .get(async (req, res) => {
    console.log("Verileri getir apiye girdi");
    await Level.findById(
        req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    });
  })
  
  // Update Student Data
  .put(async (req, res, next) => {
    await Level.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      (error, data) => {
        if (error) {
          return next(error);
          console.log(error);
        } else {
          res.json(data);
          console.log("Student updated successfully !");
        }
      }
    );
  });
  
// Delete Level
router.delete("/delete-level/:id", async (req, res, next) => {
  try {
    console.log(req.params.id);
    const removedValue = await Level.findByIdAndRemove(req.params.id);
    console.log(removedValue);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }


});

// Delete Type
router.delete("/delete-type/:id", async (req, res, next) => {
  try {
    console.log(req.params.id);
    const removedValue = await Type.findByIdAndRemove(req.params.id);
    console.log(removedValue);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }


});

//read levels- veri listeleme
router.get('/levels', async (req, res) => {
  try {
    const levels = await Level.find();
   
    console.log("Veriler 1")
    console.log(levels);
    res.send(levels);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports=router;