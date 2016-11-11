$(document).ready(function() {
    // Array of gifs
    var animals = [];

    //displayGifs function now displays the appropriate gifs
    function displayGifs() {

        var giphy = $(this).data('name');
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Creates AJAX call for the specific gif being
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response) {
            console.log(response);

            var results = response.data;

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

            $('.gif').on('click', function() {


                var state = $(this).attr('data-state');

                if (state == 'still') {
                    $(this).attr('src', $(this).data('animate'));
                    $(this).attr('data-state', 'animate');
                } else {
                    $(this).attr('src', $(this).data('still'));
                    $(this).attr('data-state', 'still');
                }

            });

        });

    }

    function renderButtons() {

        // deletes the giphys prior to adding new ones
        $('#animalButtons').empty();


        for (var i = 0; i < animals.length; i++) {

            var a = $('<button>');
            a.addClass('giphy');
            a.attr('data-name', animals[i]);
            a.text(animals[i]);
            $('#animalButtons').append(a);
        }
    }



    $(document).on('click', '.giphy', displayGifs);

    $('#addAnimal').on('click', function() {
        var animalInput = $('#animal-input').val().trim();

        animals.push(animalInput);

        $('#animal-input').val('');

        renderButtons();

        return false;
    });


    renderButtons();


});
