'use strict';

var app = angular.module("crowFlies");

app.factory('Nest',['haversine', 'Coordinates',  function (haversine, Coordinates){
	function Nest(id, name, description, image, lat, lng, position){
		this.id = id;
		this.name = name;
		this.description = description;
		this.image = image;
		this.coordinates = new Coordinates(lat, lng);
		this.haversine = position?haversine.getInfo(position, this.coordinates):{angle: 0, distance: -1};
	};
	Nest.prototype.updateHaversine=function(currentcoords){
		this.haversine = haversine.getInfo(currentcoords, this.coordinates);
	}
	return Nest;
}]);