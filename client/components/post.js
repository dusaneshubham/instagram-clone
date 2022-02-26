angular.module("instagramApp").component("post", {
    templateUrl: "partials/post.html",
    bindings: {
        likes: "@",
        username: "@",
        imageUrl: "@",
        postUrl: "@",
        description: "@",
        time: "@",
    },
});
