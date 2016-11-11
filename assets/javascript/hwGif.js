$(document).ready(function(){
// Array of gifs
var animalS = [];

//displayGifs function now displays the appropriate gifs
function displayGifs() {

    var giphy = $(this).data('animal');
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Creates AJAX call for the specific gif being
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function(response) {
        console.log(response);

        var results = response.data;

        // var giphyDiv = $('<div class="giphy">');

        // var ratings = response.rating;

        // var displayRating = $('<p>').text("Rating: " + ratings);

        // giphyDiv.append(displayRating);

        // var image = $('<img>').attr("src", response.Poster);

        // //appends the giphy
        // giphyDiv.append(image);

        // //puts the entire giphy above the previous ones
        // $('#animals').prepend(giphyDiv);

        for (var i = 0; i < results.length; i++) {

            var giphyDiv = $('<div class="giphy">');
            var rating = results[i].rating;
            var p = $('<p>').text("Rating :" + rating);
            var giphyImge = $('<img>');

            giphyImge.attr('src', results[i].images.fixed_height_still.url);

            giphyImge.attr('data-still', results[i].images.fixed_height_still.url);
            giphyImge.attr('data-animate', results[i].images.fixed_height.url);
            giphyImge.attr('class', 'gif');

            giphyDiv.append(p);
            giphyDiv.append(giphyImge);

            $('#animalView').prepend(giphyDiv);
        }
    });

}

function renderButtons() {

    // deletes the giphys prior to adding new ones
    $('#animalButtons').empty();

    for (var i = 0; i < animalS.length; i++) {

        var a = $('<button>');
        a.addClass('giphy');
        a.attr('data-name', animalS[i]);
        a.text(animalS[i]);
        $('#animalButtons').append(a);
    }
}

$('#addAnimal').on('click', function() {

    var giphy = $('#animal-input').val().trim();
    // var state = $(this).data('state');

    animalS.push(giphy);

    renderButtons();

    return false;
});

$(document).on('click', '.giphy', displayGifs);

renderButtons();

});
