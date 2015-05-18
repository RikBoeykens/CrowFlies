'use strict';

var app = angular.module("crowFlies");

app.service('destinationManager', function (haversine) {
    var destinations =[];
    var currentPosition;
    this.getDestinations = function(){
        return destinations;
    };
    this.getDestination = function(id){
        return destinations[id];
    };
    this.addDestination = function(newName, newCoords){
        var newDestination = {name:newName, 
            coords:newCoords,
            haversine:haversine.getInfo(currentPosition.coords, newCoords)
        };
        destinations.push(newDestination);
        return newDestination;
    };
    this.removeDestination = function(destination){
        var index = destinations.indexOf(destination);
        destinations.splice(index,1);
    };
    this.updatePosition=function(position){
        currentPosition=position;
        updateHaversine(position);
    }
    var updateHaversine=function(position){
        angular.forEach(destinations, function(destination){
            destination.haversine = haversine.getInfo(position.coords, destination.coords);
        })
       /* var x;
        for(x in destinations){
            destinations[x].haversine = haversine.getInfo(position.coords, destinations[x].coords);
        }; */
    };
});