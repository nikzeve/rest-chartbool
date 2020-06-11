$(document).ready(function() {

    var url_chiamata = "http://157.230.17.132:4034/sales";



    $.ajax ({
        url: url_chiamata,
        method: 'GET',
        success: function(data) {
            console.log(data);
        },
        error: function() {
            alert('si è verificato un errore');
        }
    });
})
