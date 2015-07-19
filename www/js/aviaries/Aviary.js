'use strict';

var app = angular.module("crowFlies");

app.factory('Aviary', ['Nest', function (Nest){
	function Aviary(id, name, description, image, nests){
		this.id = id;
		this.name = name;
		this.descripton = description;
		this.image = image;
		this.nests = nests;
	};
	Aviary.prototype.addNest=function(nest){
		this.nests.push(nest);
	}
	Aviary.prototype.updateHaversine=function(coordinates){
		angular.forEach(this.nests, function(nest){
			nest.updateHaversine(coordinates);
		})
	}
	return Aviary;
}]);