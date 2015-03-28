$.TweetCompose = function (el) {
  this.$el = $(el);
  this.inputHandler();
  this.handleSubmit();
  this.handleMentioned();
};

$.TweetCompose.prototype.inputHandler = function() {
  var that = this;
  $('textarea').on("keyup", function(event) {
    event.preventDefault();
    var text = $(".chars-left").html();
    $(".chars-left").html(parseInt(text) - 1);
  });
};

$.TweetCompose.prototype.handleMentioned = function() {
  $('.add-mentioned-user').on("click", function(event) {
    event.preventDefault();
    var $html = $('#mention-script').html();
    $('div.mentioned-users').append('<li>' + $html + '</li>');
  });
};

$.TweetCompose.prototype.handleSubmit = function () {
  var that = this;
  this.$el.on("submit", function (event) {
    event.preventDefault();
    var info = that.$el.serializeJSON();
    $.ajax( {
      url: "/tweets",
      method: "POST",
      data: info,
      dataType: "JSON",
      success: function(response) {
        // alert(JSON.stringify(response));
        that.handleSuccess(response);
      }
    });
  });
};

$.TweetCompose.prototype.clearInput = function() {
  var input = $("textarea");
  input.val("");
};

$.TweetCompose.prototype.handleSuccess = function(response) {
  this.clearInput();
  // tweet-ul (id)
  $('ul#feed').append("<li>"+ JSON.stringify(response.content) + "</li>");
};

$.fn.tweetCompose = function () {
  return this.each(function () {
    new $.TweetCompose(this);
  });
};

$(function () {
  $(".tweet-compose").tweetCompose();
});
