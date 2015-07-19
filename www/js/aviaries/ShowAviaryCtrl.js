'use strict';

var app = angular.module("crowFlies");

app.controller('ShowAviaryCtrl',['$scope', '$routeParams', 'geolocate', 'haversine', 'aviaryService', function ($scope, $routeParams, geolocate, haversine, aviaryService) {
  aviaryService.fetchAviary($routeParams.aviaryId);  
	$scope.currentPosition = geolocate.getCurrentPosition;
	$scope.aviary = aviaryService.getAviary;
	$scope.showPosition = function(){
		geolocate.updatePosition();
	};
	$scope.$watch('continuousUpdates', function(newVal, oldVal){
		if (typeof newVal !== 'undefined'){
			if(newVal&&!$scope.watch){
				geolocate.startWatch();
			}else{
				geolocate.stopWatch();
			}
		}
	});
	$scope.showPosition();
}]);