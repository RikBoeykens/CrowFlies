'use strict';

var app = angular.module("crowFlies");

app.controller('ShowNestCtrl',['$scope', '$routeParams', '$location', 'aviaryService', function ($scope, $routeParams, $location, aviaryService) {
	if (aviaryService.getAviary()==null){
		$location.path('/aviary/selectAviary')
	}
  $scope.nest = aviaryService.getNest(parseInt($routeParams.nestId));  
}]);