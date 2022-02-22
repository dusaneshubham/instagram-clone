(function () {
    "use strict";

    const myApp = angular.module("instagramApp", ["ui.router"]);

    myApp.config(function ($stateProvider) {
        const helloState = {
            name: "hello",
            url: "/",
            templateUrl: "helloworld.html",
        };

        const aboutState = {
            name: "about",
            url: "/about",
            template: "<h3>Its the UI-Router hello world app!</h3>",
        };

        $stateProvider.state("otherwise", { url: "/" });
        $stateProvider.state(helloState);
        $stateProvider.state(aboutState);
    });
})();
