'use strict';

var app = angular.module("crowFlies");

app.controller('ShowAviaryCtrl',['$scope', '$location', '$timeout', 'geolocate', 'aviaryService', function ($scope, $location, $timeout, geolocate, aviaryService) {
	if (aviaryService.getAviary()==null){
		$location.path('/aviary/selectAviary')
	}
	$scope.mapsControl = {
		options:{
			nests: aviaryService.getAviary().nests
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