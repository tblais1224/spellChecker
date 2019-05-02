function spellCheckBackend(inputString, dictionaryData) {
    var collection = dictionaryData.collection("dictV2");
    var inputArray = inputString.input.split(" ");
    var stringOutput = "";
    var api = {
        string: stringOutput
    };

    for (var i = 0; i < inputArray.length; i++) {
        //filters out any non alphabetical chars
        var filteredWord = inputArray[i].replace(/[^A-Za-z]/g, "");
        var lowerCaseWord = filteredWord.toLowerCase();
        //if (dictionaryData[filteredWord] || dictionaryData[filteredWord.toLowerCase()]) {
        var testWord = false;

        var myData = collection.find({
            [filteredWord]: 1
        });
        myData.forEach((doc, err) => {
            if (err) {
                throw err;
            }
            testWord = true;
            console.log(testWord);
        });
        if (testWord === true) {
            //adds word without formating to output string with space at end
            stringOutput += (inputArray[i] + " ");
        }
        //if the word doesnt exist it adds the word in a span with highlighting styles to the paragraph
        else {
            stringOutput += ('<span id="incorrect">' + inputArray[i] + ' </span>');
        }
    }
    console.log(api);
    return api;
}

module.exports = spellCheckBackend;
