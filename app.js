const express = require("express");
const app = express();
const path = require("path");
const fs = require('fs')
const multer = require("multer");
// const rimraf = require("rimraf");
const port = 80;


// For serving static and views files
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/views', express.static(path.join(__dirname, 'views')));


// For index.html
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname + '/views/index.html'));
});


// For files storage
const fileStorageEngine = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "./uploads");
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });



// for multiple files upload
app.post("/upload", upload.array("pdfFile", 4), (req, _res, _next) => {
  console.log(req.files);
  // res.send(" multiple files uploaded successfully")
})



// for deleting uploads file.
setInterval(function() {
  walkDir('./uploads', function(filePath) {
  fs.stat(filePath, function(err, stat) {
  var now = new Date().getTime();
  var endTime = new Date(stat.ctime).getTime() + 30000;  //300000 =  5 mins in miliseconds.

  if (err) { return console.error(err); }

  if (now > endTime) {
      //console.log('DEL:', filePath);
    return fs.unlink(filePath, function(err) {
      if (err) return console.error(err);
    });
  }
})  
});
}); 


function walkDir(dir, callback) {
fs.readdirSync(dir).forEach( f => {
  let dirPath = path.join(dir, f);
  let isDirectory = fs.statSync(dirPath).isDirectory();
  isDirectory ? 
    walkDir(dirPath, callback) : callback(path.join(dir, f));
});
};





// for single file upload
// app.post("/upload", upload.single("pdfFile"), (req, res) => {
//   console.log(req.file);
//   res.send("file uploaded successfully")
// })








//   Starting the server
app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});

