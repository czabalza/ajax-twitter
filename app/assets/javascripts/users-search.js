
$(function () {
  $(".users-search").usersSearch();
});

$.fn.usersSearch = function() {
  return this.each(function() {
    new $.UsersSearch(this);
  });
};

$.UsersSearch = function(el) {
  this.$el = $(el);
  this.$input = $('.search');
  this.$ul = $('ul.users');
  this.handleInput();
  this.$searchList = [];
};

$.UsersSearch.prototype.handleInput = function() {
  var that = this;
  this.$input.on('keyup', function(event) {
    event.preventDefault();
    var inputData = {"query": that.$input.val()};
    // debugger
    $.ajax({
      url: "/users/search",
      method: "GET",
      data: inputData,
      dataType: 'JSON',
      success: function (response) {
        that.$searchList = response;
        that.renderResults();
      }
    });
  });
};

$.UsersSearch.prototype.renderResults = function () {
  this.$ul.empty();
  for (var i = 0; i < this.$searchList.length; i++) {
    // debugger
    this.$ul.append("<li><a href='javascript:void(0)'>" + this.$searchList[i].username + "</a> <a href='javascript:void(0)' class='follow-toggle' id=" + this.$searchList[i].id +"></a></li>");

    var followed = this.$searchList[i].followed;
    if (followed === false) {
      $('#' + this.$searchList[i].id).followToggle({"userId": this.$searchList[i].id, "followState": "unfollowed" });
    } if (followed === true) {
      $('#' + this.$searchList[i].id).followToggle({"userId": this.$searchList[i].id, "followState": "followed" });
    }

  }
};
//
// <a href="javascript:void(0)"
//    data-user-id="<%= user.id%>"
//    data-current-user="<%= current_user.id %>"
//    data-initial-follow-state="<%= followed %>"
//    class="follow-toggle">button</a>
