'use strict';

var app = angular.module("crowFlies");

app.controller('SelectAviaryCtrl',['$scope', '$location', 'aviaryService', '$cordovaBarcodeScanner', function ($scope, $location, aviaryService, $cordovaBarcodeScanner) {
	$scope.scanAviary = function(){
		$cordovaBarcodeScanner
			.scan()
			.then(function(barcodeData) {
				$scope.aviaryid = barcodeData.text;
				$scope.getAviary(barcodeData.text);
			}, function(error) {
				$scope.error = error;
			});


	}
	$scope.getAviary = function(aviaryid){
		$scope.error = "";
		if (aviaryService.getAviary()&&aviaryService.getAviary().id==aviaryid){
			$location.path('/aviary/showAviary');
		}
		aviaryService.fetchAviary(aviaryid).then(function(){
			$location.path('/aviary/showAviary');
		}, function(errors){
			$scope.error = "An error occurred while trying to retrieve the aviary.";
		})
	}
	$scope.recentAviaries = aviaryService.getRecent;
	
}]);