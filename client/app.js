"use strict";

const app = angular.module("instagramApp", ["ui.router"]);

app.config(function ($stateProvider) {
    const loginState = {
        name: "login",
        url: "",
        templateUrl: "views/login.html",
    };

    const homeState = {
        name: "home",
        url: "/home",
        templateUrl: "views/home.html",
    };

    $stateProvider.state("otherwise", { url: "/" });
    $stateProvider.state(loginState);
    $stateProvider.state(homeState);
});
