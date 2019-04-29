//on submission of the text this is called
$(document).ready(function() {
    //url for the dictionary api route
    const url = "https://tomblais1224-tblais1224.c9users.io/data";
    // `https://tomblais1224-tblais1224.c9users.io/data`
    // https://tb-spellchecker.herokuapp.com/data
    
    //runs on #submit click
    $("#submit").click(function() {
        //removes any old spellchecks
        $("#checkedPar").remove();
        //sets user input to input
        const input = document.getElementById("user-input").value;
        
        //uses ajax to call api 
        $.ajax({
            url: url,
            type: "GET",
            
            //on successful load runs checkwords()
            success: function(result) {
                console.log(result[input]);
                checkWords(result, input);
            },
            //handles error
            error: function(error) {
                console.log("An error occurred when accessing api " + error);
            }
        });
    });
});

//checking the spelling function
function checkWords(result, input) {
    // replace - with space
    var inputFilterDash = input.replace("-", " ");
    //splits the input into array of words
    var inputArray = inputFilterDash.split(" ");
    //sets api result to dictionaryObj
    const dictionaryObj = result;
    //creates empty output string
    var stringOutput = "";
    //loops through entire input array
    for (var i = 0; i < inputArray.length; i++) {
        //filters out any non alphabetical chars
        var filteredWord = inputArray[i].replace(/[^A-Za-z]/g, "");
        //checks if word exists in dictionary (with or without caps)
        if (dictionaryObj[filteredWord] || dictionaryObj[filteredWord.toLowerCase()]) {
            //adds word without formating to output string with space at end
            stringOutput += (inputArray[i] + " ");
        }
        //if the word doesnt exist it adds the word in a span with highlighting styles to the paragraph
        else {
            stringOutput += ('<span id="incorrect">' + inputArray[i] + ' </span>');
        }
    }
    //appends paragraph to output div
    $("#checked").append("<p id='checkedPar'>" + stringOutput + "</p>");
}

