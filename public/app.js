// $.getJSON("/articles", function(data) {
//     console.log(data)
//     for (var i = 0; i < data.length; i++) {
//       // Display the apropos information on the page
//       $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
//     }
//   });

// $.ajax({
//     method: get,
//     url: "/aricles"
// }).then(function(dbData){
// })

$(document).on("click", "button", function() {
  var clickedButton = $(this).attr("id")
  console.log(clickedButton)
  $.ajax({
    method: "GET",
    url: "/markfavorited/" + clickedButton
  }).then(function(){
  });
});

function addFavorite() {
  $("#table-body").empty();
  $.ajax({
    method: "GET",
    url: "/favorited"
  }).then(function(data){
    for (let i in data){
      
    }
  })
} 