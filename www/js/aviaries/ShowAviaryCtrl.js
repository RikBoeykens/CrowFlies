'use strict';

var app = angular.module("crowFlies");

app.controller('ShowAviaryCtrl',['$scope', '$routeParams', '$timeout', 'geolocate', 'haversine', 'aviaryService', function ($scope, $routeParams, $timeout, geolocate, haversine, aviaryService) {
  aviaryService.fetchAviary($routeParams.aviaryId);  
	$scope.mapsControl = {
		options:{
		}
  };
	$timeout(function(){
		$scope.mapsControl.initMap();
	})
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