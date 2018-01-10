/*
JS-SF-9
Maddy Gordon
  Please add all Javascript code to this file.
*/

var api = {
  "Wall Street Journal": "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=cb1fcee69e7c4224ace797ed0a7783da",
  "Bitcoin": "https://newsapi.org/v2/everything?q=bitcoin&sortBy=publishedAt&apiKey=cb1fcee69e7c4224ace797ed0a7783da",
  "TechCrunch": "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=cb1fcee69e7c4224ace797ed0a7783da"
};
var currentSource = "Wall Street Journal";

$(function() {
  // DOM is now ready

  $("#popUp").hide();
  getArticles(api["Wall Street Journal"]);

  $(".closePopUp").click(function() {
    $("#popUp").hide();
  })

})

function getArticles(url) {
  $.get(url, function(results) {

    for (var i=0; i<4; i++ ) {
      var article = results.articles[i];
      showArticleDetails(article);
    }
  
  });
}

function showArticleDetails(article) {
  var f = 'javascript:showPopUp("' + article.title + '","' + article.description + '","' + article.url + '");';
  var count = article.description.split(" ").length;

  var a = $('<article>').addClass('article');
  var s1 = $('<section>').addClass('featuredImage').append($('<img>').attr('src', article.urlToImage).attr('alt', ''));
  var s2 = $('<section>').addClass('articleContent').append($('<a>').attr('onclick', f).html('<h3>'+article.title+'</h3>').append($('<h6>').html(article.description)));
  var s3 = $('<section>').addClass('impressions').html(count);
  var d = $('<div>').addClass('clearfix');

  a.append(s1);
  a.append(s2);
  a.append(s3);
  a.append(d);
  $("#main").append(a);
}

function showPopUp(title, description, url) {
  $("#popUp").show();
  $("#articleTitle").html(title);
  $("#articleDescription").html(description);
  $(".popUpAction").attr('href', url);
}

function selectSource(source) {
  if (source != currentSource) {
    currentSource = source;
    $("#main").empty();
    $("#newsSource").html(source);
    var url = api[source];
    getArticles(url);
  }
  
}