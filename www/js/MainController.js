'use strict';

var app = angular.module("crowFlies");

app.controller('MainController', function ($scope, $rootScope, $location) {
    if($rootScope.destinations==null){
        $rootScope.destinations =[];
    }
});