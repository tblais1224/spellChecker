
$(document).ready(function() {
    //handles submit button click event
    $('#submit').on('click', function() {
        //sets the users text input to userInput
        var userInput = document.getElementById("user-input").value;
        //makes post request to /checked and sends the userInput
        //the function then handles the result of the post
        $.post("/checked", { input: userInput }, function(result){
            //removes any old spellchecks
            $("#checkedPar").remove();
            //appends the result data to the checked div
            $("#checked").append("<p id='checkedPar'>" + result.string + "</p>")
        });
    });
});