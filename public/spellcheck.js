//on submission of the text this is called
$(document).ready(function() {
    $('#submit').on('click', function() {
        var userInput = document.getElementById("user-input").value;
        //makes api call and gets response
        $.post("/", { input: userInput }, function(result){
            console.log(result)
            $("#checkedPar").remove();
            $("#checked").append("<p id='checkedPar'>" + result.string + "</p>")
        })
    })
});