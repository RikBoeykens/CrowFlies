'use strict';

var app = angular.module("crowFlies");

app.directive('destination', function () {
    return {
        restrict: "E",
        replace: true,
        templateUrl: 'partials/directives/destination.html',
        scope: {
            destination: "=",
            accuracy: "="
        }
    };
});
