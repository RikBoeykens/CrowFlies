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
        .when("/aviary/:aviaryId", {
            templateUrl: "js/aviaries/showAviary.html",
            controller: "ShowAviaryCtrl"
        })
        .when("/nest/:nestId", {
            templateUrl: "js/nests/showNest.html",
            controller: "ShowNestCtrl"
        })
        .otherwise({redirectTo:"/main"});
});