'use strict';

var app = angular.module("crowFlies", ["ngRoute", "ui.bootstrap", "ngCordova"]);

app.config(function($routeProvider){
    $routeProvider
        .when("/main", {
            templateUrl: "partials/main.html",
            controller: "MainController"
        })
        .when("/setup", {
            templateUrl: "partials/setup.html",
            controller: "SetupController"
        })
        .when("/crowflies", {
            templateUrl: "partials/crowflies.html",
            controller: "CrowFliesController"
        })
        .otherwise({redirectTo:"/main"});
});