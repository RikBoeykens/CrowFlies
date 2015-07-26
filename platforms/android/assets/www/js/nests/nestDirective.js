'use strict';

var app = angular.module("crowFlies");

app.directive('nestDirective', function () {
    return {
        restrict: "E",
        replace: true,
        templateUrl: 'js/nests/nestDirective.html',
        scope: {
            nest: "=",
            accuracy: "="
        }
    };
});
