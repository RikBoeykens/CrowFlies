'use strict';

var app = angular.module("crowFlies");

app.controller('SetupController', function ($scope, $rootScope, geolocate, destinationManager) {
    $scope.destinations=destinationManager.getDestinations;
    $scope.currentPosition=geolocate.getCurrentPosition;
    var newMarker;
    
 /*   $scope.initializeMap = function() {
        var mapOptions = {
            zoom: 12
        };
        $scope.map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
        if(!geolocate.getCurrentPosition()){
            geolocate.updatePosition()
                .then(function (position) {
                  $scope.map.setCenter(getLatLng(position.coords));
                }, function(err) {
                  console.log(err);
                });            
        }else{
            $scope.map.setCenter(getLatLng(geolocate.getCurrentPosition().coords));
        };
        //create markers
        angular.forEach(destinationManager.getDestinations(), function(destination){
            createMarker(destination);
        });
    };*/
    $scope.startAdding = function(){
        $scope.selectDestination(null);
        $scope.adding=true;
        $scope.newName ="new position"
        newMarker = new google.maps.Marker({
                position:$scope.map.getCenter(),
                map:$scope.map,
                draggable:true,
                title:'new destination',
                icon:'img/green-dot.png'});
    };
    $scope.addDestination = function(){
        var newDestination = destinationManager.addDestination($scope.newName, getCoords(newMarker.position));
        $scope.createMarker(newDestination);
        //cleanup
        newMarker.setMap(null);
        newMarker=null;
        $scope.newName=null;
        $scope.adding=false;
    };
 /*   var createMarker = function(destination){
        destination.marker = new google.maps.Marker({
            position:getLatLng(destination.coords),
            map:$scope.map,
            title:destination.name,
            icon:'img/red-dot.png'
        });
        createClickEvent(destination);         
    }
    var createClickEvent = function(destination){
        google.maps.event.addListener(destination.marker, 'click', function() {
            $scope.$apply(function(){
                $scope.selectDestination(destination);
            });
        });
    };*/
    $scope.selectDestination = function(destination){
        if(!$scope.adding){
            if ($scope.selectedDest!=null){
                $scope.selectedDest.marker.setIcon('img/red-dot.png');
            }
            $scope.selectedDest = destination;
            if(destination!=null){  
                destination.marker.setIcon('img/green-dot.png');
                $scope.map.panTo(destination.marker.getPosition());
            };
        }
    };
    $scope.deleteDestination = function(destination){
        destination.marker.setMap(null);
        destinationManager.removeDestination(destination);
        $scope.selectDestination(destinationManager.getDestination(0));
    };
});

var getLatLng = function(coords){
    return new google.maps.LatLng(coords.latitude, coords.longitude);
};
var getCoords = function(position){
    return {latitude:position.A, longitude:position.F};
}
