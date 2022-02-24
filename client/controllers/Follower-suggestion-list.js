const FollowerSuggestionListCtrl = function () {
    let followerSuggestionList = this;
    this.all = followerSuggestions;
};

angular
    .module("instagramApp")
    .controller("FollowerSuggestionListCtrl", FollowerSuggestionListCtrl);

console.log("controller logged");
