angular.module("instagramApp").component("followerSuggestion", {
    templateUrl: "partials/follower-suggestion.html",
    bindings: { id: "@", name: "@", username: "@", imageUrl: "@" },
    controller: "FollowerSuggestionCtrl",

});