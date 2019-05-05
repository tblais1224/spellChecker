const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MyMethods = require("./checkSpelling");
var spellCheckBackend = MyMethods.method;
var outputSpellCheck = MyMethods.otherMethod;

let dictionaryData;

mongoose.connect('mongodb://' + process.env.IP + '/dictionary', { useNewUrlParser: true });
var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function() {
    connection.db.collection("newdictionary", (err, collection) => {
        if (err) { throw err }
        dictionaryData = collection;
    });
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get("/", function(req, res) {
  res.sendfile('index.html');
});

app.post("/checked", function(req, res) {
  spellCheckBackend(req.body, dictionaryData).then((result) => {
    res.send(outputSpellCheck(result, req.body));
  });
});

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
