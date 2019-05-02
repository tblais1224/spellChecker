const express = require("express");
const app = express();

const bodyParser = require('body-parser');
const dictionaryData = require("./data");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get("/", function(req, res) {
  res.sendfile('index.html');
});

app.post("/", function(req, res) {
  var inputArray = req.body.input.split(" ");
  var stringOutput = "";
  for (var i = 0; i < inputArray.length; i++) {
    //filters out any non alphabetical chars
    var filteredWord = inputArray[i].replace(/[^A-Za-z]/g, "");
    if (dictionaryData[filteredWord] || dictionaryData[filteredWord.toLowerCase()]) {
      //adds word without formating to output string with space at end
      stringOutput += (inputArray[i] + " ");
    }
    //if the word doesnt exist it adds the word in a span with highlighting styles to the paragraph
    else {
      stringOutput += ('<span id="incorrect">' + inputArray[i] + ' </span>');
    }
  }
  var api = {
    string: stringOutput
  }
  res.send(api);
});

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
