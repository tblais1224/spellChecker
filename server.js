const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const spellCheckBackend = require("./checkSpelling");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get("/", function(req, res) {
  res.sendfile('index.html');
});

app.post("/checked", function(req, res) {
  res.send(spellCheckBackend(req.body));
});

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
