const mongoose = require('mongoose');

let dictionaryData;

mongoose.connect('mongodb://' + process.env.IP + '/dictionary', { useNewUrlParser: true });
var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function() {
    connection.db.collection("newdictionary", function(err, collection) {
        if (err) { throw err }
        dictionaryData = collection;
    });
});

function spellCheckBackend(inputString) {
    var stringOutput = "";
    var inputArray = inputString.input.split(" ");
    for (var i = 0; i < inputArray.length; i++) {
        var newWord = inputArray[i];
        let filteredWord = inputArray[i].replace(/[^A-Za-z]/g, "");
        // let lowerCaseWord = filteredWord.toLowerCase();
        dictionaryData.findOne({ word: filteredWord }).then(function(data) {
            stringOutput += outputChecked(newWord, data);
            console.log(stringOutput);
            if (i === (inputArray.length - 1)) {
                let api = {
                    string: stringOutput
                };
                console.log(api);
                return api;
            }
        });
    }
}

function outputChecked(word, data) {
    if (data === null) {
        var stringNull = ('<span id="incorrect">' + word + ' </span>');
        return (stringNull);
    }
    else {
        var string = (word + " ");
        return (string);
    }
}

module.exports = spellCheckBackend;
