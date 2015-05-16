'use strict';

var app = angular.module("crowFlies");

app.controller('CrowFliesController', function ($scope, $rootScope, $cordovaGeolocation, haversine) {
    $scope.showPosition = function(){
        var posOptions = {enableHighAccuracy: true};
          $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
              $rootScope.currentPosition = position;
            }, function(err) {
              console.log(err);
            });
    };
    $scope.$watch('continuousUpdates', function(newVal, oldVal){
        if (typeof newVal !== 'undefined'){
            if(newVal&&!$scope.watch){
                startWatch();
            }else{
                stopWatch();
            }
        }
    });
    var startWatch = function(){
      var watchOptions = {
        enableHighAccuracy: true // may cause errors if true
      };
        
      $scope.watch = $cordovaGeolocation.watchPosition(watchOptions);
      $scope.watch.then(
        null,
        function(err) {
          console.log(err);
        },
        function(position) {
          $rootScope.currentPosition = position;
      });
    };
    var stopWatch = function(){
        $scope.watch.clearWatch();
        $scope.watch=null;
    };
    
    $scope.$watch('currentPosition', function (newVal, oldVal) {
        if (typeof newVal !== 'undefined') {
            updateInfo();
        }
    });
    var updateInfo = function(){
        var x;
        for(x in $rootScope.destinations){
            var destination = $rootScope.destinations[x];
            destination.haversine = haversine.getInfo($rootScope.currentPosition.coords, destination.coords);
        }; 
    };
    $scope.showPosition();
});