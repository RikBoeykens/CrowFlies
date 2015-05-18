'use strict';

var app = angular.module("crowFlies");

app.directive('setupMap', function(geolocate) {
    // directive link function
    var link = function($scope, element, attrs) {
        var initializeMap = function() {
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
            angular.forEach($scope.destinations(), function(destination){
                $scope.createMarker(destination);
            });
        };
        $scope.createMarker = function(destination){
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
        };
        initializeMap();  
    };
    return {
        restrict: 'A',
        template: '<div id="map-canvas"></div>',
        replace: true,
        link: link
    };
});

var getLatLng = function(coords){
    return new google.maps.LatLng(coords.latitude, coords.longitude);
};
var getCoords = function(position){
    return {latitude:position.A, longitude:position.F};
};