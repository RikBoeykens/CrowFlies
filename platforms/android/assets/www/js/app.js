'use strict';

var app = angular.module("crowFlies", ["ngRoute", "ui.bootstrap", "ngCordova"]);

app.config(function($routeProvider){
    $routeProvider
        .when("/main", {
            templateUrl: "js/main/main.html",
            controller: "MainCtrl"
        })
        .when("/aviary/selectAviary", {
            templateUrl: "js/aviaries/selectAviary.html",
            controller: "SelectAviaryCtrl"
        })
        .when("/aviary/showAviary", {
            templateUrl: "js/aviaries/showAviary.html",
            controller: "ShowAviaryCtrl"
        })
        .when("/nest/:nestId", {
            templateUrl: "js/nests/showNest.html",
            controller: "ShowNestCtrl"
        })
        .otherwise({redirectTo:"/main"});
});