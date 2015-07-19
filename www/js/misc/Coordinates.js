'use strict';

var app = angular.module("crowFlies");

app.factory('Coordinates', function (){
	function Coordinates(lat, lng){
		this.lat = parseFloat(lat);
		this.lng = parseFloat(lng);
	};
	Coordinates.prototype.getCoordinates=function(){
		return {lat: this.lat, lng: this.lng};
	}
	Coordinates.prototype.getLatLng=function(){
		return new google.maps.LatLng(this.lat, this.lng);
	}
	return Coordinates;
});