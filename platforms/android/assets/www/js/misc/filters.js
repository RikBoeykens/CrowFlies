'use strict';

var app = angular.module("crowFlies");

app.filter('windDirection', function(){
    return function(degrees){
        degrees = (degrees +360) % 360;
        if (degrees<11.25){
            return 'N';
        }else if (degrees<33.75){
            return 'NNE';
        }else if (degrees<56.25){
            return 'NE';
        }else if (degrees<78.75){
            return 'ENE';
        }else if (degrees<101.25){
            return 'E';
        }else if (degrees<123.75){
            return 'ESE';
        }else if (degrees<146.25){
            return 'SE';
        }else if (degrees<168.75){
            return 'SSE';
        }else if (degrees<191.25){
            return 'S';
        }else if (degrees<213.75){
            return 'SSW';
        }else if (degrees<236.25){
            return 'SW';
        }else if (degrees<258.75){
            return 'WSW';
        }else if (degrees<281.25){
            return 'W';
        }else if (degrees<303.75){
            return 'WNW';
        }else if (degrees<326.25){
            return 'NW';
        }else if (degrees<348.75){
            return 'NNW';
        }else{
            return 'N';
        }
    }
})

app.filter('distanceFilter', function(){
    return function(distance){
        if(distance<1000){
            return (distance.toFixed(0) + " m");
        }else{
            return (distance/1000).toFixed(2) + "km";        
        }
    }
});

app.filter('distanceColour', function(){
    return function(distance){
        if(distance<100){
            return 'red';
        }else if(distance<500){
            return 'orange';        
        }else if(distance<1000){
            return 'green';
        }else if(distance<5000){
            return 'blue';
        }else{
            return 'purple';
        }
    }
});