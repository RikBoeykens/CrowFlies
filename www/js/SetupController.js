'use strict';

var app = angular.module("crowFlies");

app.controller('SetupController', function ($scope, $rootScope, $cordovaGeolocation) {
    $scope.initializeMap = function() {
        var mapOptions = {
            zoom: 12
        };
        $scope.map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
        if(!$rootScope.currentPosition){
            $cordovaGeolocation.getCurrentPosition({enableHighAccuracy: true})
                .then(function (position) {
                  $rootScope.currentPosition = position;
                  $scope.map.setCenter(getLatLng(position.coords));
                }, function(err) {
                  console.log(err);
                });            
        }else{
            $scope.map.setCenter(getLatLng($rootScope.currentPosition.coords));
        };

        var x;
        for(x in $rootScope.destinations){
            var destination = $scope.destinations[x];
            destination.marker = new google.maps.Marker({
                position:getLatLng(destination.coords),
                map:$scope.map,
                title:destination.name,
                icon:'img/red-dot.png'
            });
            createClickEvent(destination); 
        };
    };
    $scope.startAdding = function(){
        $scope.selectDestination(null);
        $scope.adding=true;
        $scope.newName ="new position"
        $scope.newMarker = new google.maps.Marker({
                position:$scope.map.getCenter(),
                map:$scope.map,
                draggable:true,
                title:'new destination',
                icon:'img/green-dot.png'});
    };
    $scope.addDestination = function(){
        var newDestination = {name:$scope.newName, 
                coords:getCoords($scope.newMarker.position),
                haversine:{distance:-1},
                marker:new google.maps.Marker({
                position:$scope.newMarker.position,
                map:$scope.map,
                title:$scope.newName,
                icon:'img/red-dot.png'})
        };
        createClickEvent(newDestination);      
        $rootScope.destinations.push(newDestination);
        $scope.selectDestination(newDestination);
        $scope.newMarker.setMap(null);
        $scope.newMarker=null;
        $scope.newName=null;
        $scope.adding=false;
    };
    var createClickEvent = function(destination){
        google.maps.event.addListener(destination.marker, 'click', function() {
            $scope.$apply(function(){
                $scope.selectDestination(destination);
            });
        });
    };
    $scope.$watch('selectedDest', function (newVal, oldVal) {
        if (typeof newVal !== 'undefined') {
            if (newVal!=null){
                newVal.marker.setIcon('img/green-dot.png');                
            };
            if (oldVal!=null){
                oldVal.marker.setIcon('img/red-dot.png');
            };
        }
    });
    $scope.selectDestination = function(destination){
        if(!$scope.adding){
            $scope.selectedDest = destination;
            if(destination!=null){  
                $scope.map.panTo(destination.marker.getPosition());
            };
        }
    };
    $scope.deleteDestination = function(destination){
        var index = $scope.destinations.indexOf(destination);
        destination.marker.setMap(null);
        $scope.destinations.splice(index,1);
        $scope.selectedDest = null;
    }
});

var getLatLng = function(coords){
    return new google.maps.LatLng(coords.latitude, coords.longitude);
};
var getCoords = function(position){
    return {latitude:position.A, longitude:position.F};
}
