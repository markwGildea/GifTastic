var gifs = [];

function displayGifs() {

    var giphy = $(this).data('data-name');
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function(response) {

        var giphyDiv = $('<div class="giphy">');

        var rating = response.Rated;

        var listRating = $("<p>").text( "Rating" + rating);

        giphyDiv.append(listRating);

    });
}
