"use strict";

const app = angular.module("instagramApp", ["ui.router"]);

app.config(function ($stateProvider) {
    const indexState = {
        name: "index",
        url: "",
        templateUrl: "views/login.html",
    };
    $stateProvider.state(indexState);

    const loginState = {
        name: "login",
        url: "/login",
        templateUrl: "views/login.html",
    };
    $stateProvider.state(loginState);

    const signUpState = {
        name: "signup",
        url: "/signup",
        templateUrl: "views/signup.html",
    };
    $stateProvider.state(signUpState);

    const homeState = {
        name: "home",
        url: "/home",
        templateUrl: "views/home.html",
    };
    $stateProvider.state(homeState);

    const profileState = {
        name: "profile",
        url: "/profile",
        templateUrl: "views/profile.html",
    };
    $stateProvider.state(profileState);

    $stateProvider.state("otherwise", {
        url: "*path",
        templateUrl: "views/error-not-found.html",
    });
});
