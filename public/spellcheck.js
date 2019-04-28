//on submission of the text this is called
$(document).ready(function() {
    //url for the dictionary route
    const url = `https://tomblais1224-tblais1224.c9users.io/data`;
    $("#submit").click(function() {
        $("#checkedPar").remove();
        //sets user input to input
        const input = document.getElementById("user-input").value;
        $.ajax({
            url: url,
            type: "GET",
            success: function(result) {
                console.log(result[input]);
                checkWords(result, input);
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
});


function checkWords(result, input) {
    var inputArray = input.split(" ");
    const dictionaryObj = result;
    var stringOutput = "";
    // word.replace(/[^A-Za-z]/g, "")
    for (var i = 0; i < inputArray.length; i++) {
        var filteredWord = inputArray[i].replace(/[^A-Za-z]/g, "");
        if (dictionaryObj[filteredWord] || dictionaryObj[filteredWord.toLowerCase()]) {
            stringOutput += (inputArray[i] + " ");
        }
        else {
            stringOutput += ('<span id="incorrect">' + inputArray[i] + ' </span>');
        }
    }
    $("#checked").append("<p id='checkedPar'>" + stringOutput + "</p>");
}

// if (result[input]){
//                     $( "#checked" ).append( "<p>"+input+"</p>" );
//                 }else{
//                     $( "#checked" ).append( "<p>"+input+", does not exist as spelt</p>" );
//                 }

// <p class="intro">
//     Highlighting text on a web page can help bring important information immediately to the reader's attention. For example, 
//     <span id="incorrect "style="background-color: #FFFF00">this text is highlighted in yellow and probably caught your eye first.
//     </span> There are several methods for highlighting text. To proceed, select a method from the list below and follow the instructions.
//     </p>
