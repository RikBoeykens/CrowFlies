'use strict';

var app = angular.module("crowFlies");

app.controller('CrowFliesController', function ($scope, $rootScope, geolocate, haversine, destinationManager) {
    $scope.currentPosition = geolocate.getCurrentPosition;
    $scope.destinations = destinationManager.getDestinations;
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