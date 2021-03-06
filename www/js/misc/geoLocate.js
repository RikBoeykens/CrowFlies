'use strict';

var app = angular.module("crowFlies");

app.service('geolocate', ['$rootScope', '$cordovaGeolocation', 'Coordinates', function ($rootScope, $cordovaGeolocation, Coordinates) {
    var currentPosition;
    var setCurrentPosition = function(position){
			currentPosition = position;
			$rootScope.$broadcast('position:updated', position);
    }
    this.getCurrentPosition = function(){
        return currentPosition;
    };
    this.updatePosition = function(){
        var posOptions = {enableHighAccuracy: true};
        return $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
                setCurrentPosition(position);
                return position;
            }, function(err) {
              console.log(err);
            });
    }
    var watch;
    this.startWatch = function(){
        var watchOptions = {
            enableHighAccuracy: true // may cause errors if true
        };
        watch = $cordovaGeolocation.watchPosition(watchOptions);
        watch.then(
            null,
            function(err) {
                console.log(err);
            },
            function(position) {
                setCurrentPosition(position);
            });
        };
    this.stopWatch = function(){
        watch.clearWatch();
        watch=null;
    };  
}]);