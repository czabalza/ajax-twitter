$.FollowToggle = function (el, options) {
  this.$el = $(el);
  this.$userId = this.$el.data("user-id") || options.userId;
  this.$followState = this.$el.data("initial-follow-state") || options.followState;
  this.render();
  this.handleClick();

};

$.FollowToggle.prototype.method1 = function () {

};

$.fn.followToggle = function (options) {
  return this.each(function () {
    new $.FollowToggle(this, options);
  });
};

$.FollowToggle.prototype.render = function() {

  if (this.$followState === "unfollowed") {
    this.$el.html("Follow!");
  } else if (this.$followState === "following") {
    this.$el.prop("disabled", true);
  } else if (this.$followState === "unfollowing") {
    this.$el.prop("disabled", true);
  } else {
    this.$el.html("Unfollow!");
  }
};

$.FollowToggle.prototype.handleClick = function () {
  var fn = this;
  fn.$el.on("click", function (event) {
    event.preventDefault();
    if (fn.$followState === "unfollowed") {
      fn.$el.data("initial-follow-state", "following");
      fn.$followState = fn.$el.data("initial-follow-state");
      fn.render();
      var userData = {"followee_id": fn.$userId };
      $.ajax({
        url: "/users/" + fn.$userId +"/follow",
        method: "POST",
        data: userData,
        dataType: "JSON",
        success: function(response) {
          fn.$el.data("initial-follow-state", "followed");
          fn.$followState = fn.$el.data("initial-follow-state");
          fn.render();
        },
        // error: function () {
        //   debugger;
        // }
      });
    }
    else if (fn.$followState === "followed") {
      fn.$el.data("initial-follow-state", "unfollowing");
      fn.$followState = fn.$el.data("initial-follow-state");
      fn.render();
      var user1Data = { "followee_id": fn.$userId };
      $.ajax({
        url: "/users/" + fn.$userId +"/follow",
        method: "DELETE",
        data: user1Data,
        dataType: "JSON",
        success: function(response) {
          fn.$el.data("initial-follow-state", "unfollowed");
          fn.$followState = fn.$el.data("initial-follow-state");
          fn.render();
        },
        // error: function () {
        //   debugger;
        // }
      });

    }
  });
};

$(function () {
  $(".follow-toggle").followToggle();
});
