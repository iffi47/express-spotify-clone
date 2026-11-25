const multer = require("multer");
const path = require("path");

//Configure storage for multer
const storage = multer.diskStorage({
  destination: path.resolve(__dirname, "../../uploads"),
  filename: function(req,file,cb) {
    cb(null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  }
});
//file filter only allow audio and image files
const fileFilter= (req, file, cb)=>{
  //accept audio and  .mp3 files
  if(file.mimetype==='audio/mpeg' || file.mimetype==='audio/wav'){
    cb(null, true)
  }
  else if(file.mimetype==='image/jpeg' || file.mimetype==='image/png' || file.mimetype==='image/jpg'){
    cb(null, true)
  }else{
    cb(new Error("Unsupported file format only audio and image files are acceptable1", false))
  }
}
//Initialize multer Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 10*1024*1024}, //10MB max file size
  fileFilter
});

module.exports = upload