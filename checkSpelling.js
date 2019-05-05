const mongoose = require('mongoose');


function spellCheckBackend(inputString, dictionaryData) {
    var inputArray = inputString.input.split(" ");
    var dbResults = [];
    inputArray.forEach(word => {
        var filteredWord = word.replace(/[^A-Za-z]/g, "").toLowerCase();
        dbResults.push(dictionaryData.findOne({ "word": filteredWord }));
    });
    return Promise.all(dbResults);
}

function outputSpellCheck(dbResults, inputString) {
    var api = {
        string: String
    };
    var i = 0;
    var inputArray = inputString.input.split(" ");
    var stringOutput = "";
    
    dbResults.forEach(checkedWord => {
        if (checkedWord === null) {
            stringOutput += ('<span id="incorrect">' + inputArray[i] + ' </span>');
            i++;
        }
        else {
            stringOutput += (inputArray[i] + " ");
            i++;
        }
    });
    api = { string: stringOutput };
    return api;
}

module.exports = {
    method: spellCheckBackend,
    otherMethod: outputSpellCheck
};
