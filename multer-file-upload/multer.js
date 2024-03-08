const path = require("path");
const express = require('express');
const multer = require('multer')
const app = express();
port = 5000;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(__dirname,"1")
      cb(null, __dirname + '/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

app.post('/upload', upload.single('file'), function (req, res) {
    console.log(req.file, req.body)
});
  
app.listen(port, () => console.log(`Server is running on port ${port}`));
