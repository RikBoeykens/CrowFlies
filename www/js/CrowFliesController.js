'use strict';

var app = angular.module("crowFlies");

app.controller('CrowFliesController', function ($scope, $rootScope, geolocate, haversine, aviaryService) {
    $scope.currentPosition = geolocate.getCurrentPosition;
    $scope.nests = aviaryService.getNests;
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
});