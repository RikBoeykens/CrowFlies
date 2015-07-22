'use strict';

var app = angular.module("crowFlies");

app.controller('SelectAviaryCtrl',['$scope', '$location', 'aviaryService', function ($scope, $location, aviaryService) {
	$scope.getAviary = function(){
		$scope.error = "";
		if (aviaryService.getAviary()&&aviaryService.getAviary().id==$scope.aviaryid){
			$location.path('/aviary/showAviary');
		}
		aviaryService.fetchAviary($scope.aviaryid).then(function(){
			$location.path('/aviary/showAviary');
		}, function(errors){
			$scope.error = "An error occurred while trying to retrieve the aviary.";
		})
	}
	
}]);