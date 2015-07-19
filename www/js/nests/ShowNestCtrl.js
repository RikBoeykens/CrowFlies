'use strict';

var app = angular.module("crowFlies");

app.controller('ShowNestCtrl',['$scope', '$routeParams', 'aviaryService', function ($scope, $routeParams, aviaryService) {
  $scope.nest = aviaryService.getNest(parseInt($routeParams.nestId));  
}]);