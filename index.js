var express = require('express');
var cors = require('cors');
require('dotenv').config()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const createNewFile = require('./schema').createNewFile;

var app = express();
mongoose.connect(`mongodb+srv://alialghanay:03541514@cluster.qdcdggp.mongodb.net/metadata?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// You can submit a form that includes a file upload.
// The form file input field has the name attribute set to upfile.
// When you submit a file, you receive the file name, type, and size in bytes within the JSON response.
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  console.log(req.file, req.body);
  var { originalname } = req.file;
  var { mimetype } = req.file;
  var { size } = req.file;
  createNewFile(originalname, mimetype, size, (err, d) => {
    if(err) {
      console.error(err);
      res.send("someting went wrong!");
    }else {
      res.json({
        name: d.name,
        type: d.type,
        size: d.size
      })
    }
  });
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
