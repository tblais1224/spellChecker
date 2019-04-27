$(document).ready(function(){
    const url = `https://tomblais1224-tblais1224.c9users.io/data`;
    $("#submit").click(function(){
        const input = document.getElementById("user-input").value;
        $.ajax({
            url: url,
            type: "GET",
            success: function(result){
                 console.log(result[input])
                if (result[input]){
                    $( "#checked" ).append( "<p>"+input+"</p>" );
                }else{
                    $( "#checked" ).append( "<p>"+input+", does not exist as spelt</p>" );
                }
            },
            error: function(error){
                console.log(error)
            }
        })
    })
})


