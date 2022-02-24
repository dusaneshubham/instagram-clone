angular.module("instagramApp").component("followerSuggestion", {
    templateUrl: "partials/follower-suggestion.html",
    bindings: { name: "@", username: "@", imageUrl: "@" },
});
