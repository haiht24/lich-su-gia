$(document).ready(function () {
    $('#search').click(function () {
        $.get('http://localhost:3333/product/5108109', function( data ) {
            console.log(data);
        });
    })
})