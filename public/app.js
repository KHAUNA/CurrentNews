$(document).ready(function () {
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


  $(".fav-button").on("click", function () {
    var clickedButton = $(this).attr("id")
    $.ajax({
      method: "GET",
      url: "/markfavorited/" + clickedButton
    }).then(function () {
      alert("added to favorites j")
    });
  });

  $("#all-favs").on("click", function () {
    $.ajax({
      method: "GET",
      url: "/favorited"
    }).then(function () {
    });
  });

  // $("#return-btn").on("click", function(){
  //   $.ajax({
  //     method: "GET",
  //     url: "/"
  //   }).then(function(){

  //   });
  // });

  $(".note-button").on("click", function () {
    var articleID = "";
    let newNote = "";
    $.ajax({
      method: "POST",
      url: "/addnote",
      data: {
        artID: $(this).attr("id"),
        newNote: prompt("Enter your note for this article")
      }
    }).then(function (data) {
        
    });
  });

});