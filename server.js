const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const dictionaryData = require("./data");
const spellCheckBackend = require("./checkSpelling");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

var dictionaryData;

mongoose.connect('mongodb://localhost/newDictionary', function(err, db) {
  if (err) {
    throw err;
  }
  else {
    dictionaryData = db;
  }
});

mongoose.Promise = global.Promise;

app.get("/", function(req, res) {
  res.sendfile('index.html');
});

app.post("/checked", function(req, res) {
  res.send(spellCheckBackend(req.body, dictionaryData));
});

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
