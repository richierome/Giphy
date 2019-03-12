 // This waits for the page to load before calling our jQuery
 $( document ).ready(function(){
  $(".buttons2").on("click", function() {
    var person = $(this).attr("data-person");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      person + "&api_key=dVJP0CdMogu2llnS67Y7GCZtHubYUCHr&limit=10";
      
    $.ajax({
      url: queryURL,
      method: "GET"
    })
   
      .then(function(response) {
        var results = response.data;
        var gifs = '';
        console.log(response);
        for (var i = 0; i < results.length; i++) {
        gifs += '<img src="' + response.data[i].images.original.url + '">'
        var rating = results[i].rating;
          var rating = $("#rating").text("Rating: " + rating);
        }
        $("#images").append(gifs);
        $("#rating").text(response.rating);
        console.log(rating);
      });
  });

  // Part 1 - Collect User Input Using jQuery Click Listener note we use the class (.) of search_button
  $('.search_button').on('click', function(){

    // Collect user by grabbing the input form's value via id (#)
    var userInput = $('#form-value').val().trim();
    
    // Change the input to suit the API (ie change spaces to +)
    userInput = userInput.replace(/ /g, "+");
    console.log(userInput);
    // Create the Giphy API URL
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + userInput + '&api_key=dVJP0CdMogu2llnS67Y7GCZtHubYUCHr';

    // Part 2 - Use AJAX to call GIPHY API (note that the .done() function waits for the API to respond)
    $.ajax({url: queryURL, method: 'GET'}).done(function(response){

      // This is the API response data. It's a JSON object of 25 gifs
      console.log(response.data);

      // For simplicity, we will take the first gif (ie. at postion 0)
      var giphyURL = response.data[10].images.fixed_height.url;
      console.log(giphyURL)

      // Now you can pass that into your "here_is_gif" <img> tag using its id (#)
      $('#here_is_gif').attr('src', giphyURL);

    });

    // Part 3 - Clear the Gif using the reset_button id (#)
    $('#reset_button').on('click', function(){
      // Grab the img using the id and change the src to empty to remove the image
      $('#here_is_gif').attr("src",'');
    })


    // If using a jQuery click listner on a Submit button, you need to return false to prevent the default page refresh
    return false;
  })
  

});
