'use strict';

var app = angular.module("crowFlies");

app.factory('haversine', function () {
  return {
    getInfo: function(fromCoord, toCoord){
        return{angle:this.getAngle(fromCoord, toCoord),
               distance:this.getDistance(fromCoord, toCoord)};
    },
    getAngle: function(fromCoord, toCoord){
        var φ1 = fromCoord.lat.toRadians();
        var φ2 = toCoord.lat.toRadians();
        var Δλ = (toCoord.lng-fromCoord.lng).toRadians();

        var y = Math.sin(Δλ) * Math.cos(φ2);
        var x = Math.cos(φ1)*Math.sin(φ2) -
                Math.sin(φ1)*Math.cos(φ2)*Math.cos(Δλ);
        var θ = Math.atan2(y, x);

        return (θ.toDegrees()+360) % 360;
    },
    getDistance: function(fromCoord, toCoord){
        var R = 6371e3;
        var φ1 = fromCoord.lat.toRadians(),  λ1 = fromCoord.lng.toRadians();
        var φ2 = toCoord.lat.toRadians(), λ2 = toCoord.lng.toRadians();
        var Δφ = φ2 - φ1;
        var Δλ = λ2 - λ1;

        var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;

        return d;
    }
  }
});

if (Number.prototype.toRadians === undefined) {
    Number.prototype.toRadians = function() { return this * Math.PI / 180; };
}
/** Extend Number object with method to convert radians to numeric (signed) degrees */
if (Number.prototype.toDegrees === undefined) {
    Number.prototype.toDegrees = function() { return this * 180 / Math.PI; };
}