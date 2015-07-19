'use strict';

var app = angular.module("crowFlies");

app.service('aviaryService',['$filter','haversine', 'apiAviaryRepository', 'Aviary', 'Nest', 'Coordinates', function ($filter, haversine, apiAviaryRepository, Aviary, Nest, Coordinates) {
	var aviary;
	var currentPosition;
	this.getAviary = function(){
		if (aviary){
			return aviary;
		}else{
			return null;
		}

	};
	this.getNest = function(nestId){
		var found = $filter('filter')(aviary.nests, {id: nestId}, true);
		if (found.length) {
			 return found[0];
		} else {
			 return null;
		}
	}
	this.updatePosition=function(position){
			currentPosition=position;
			updateHaversine(position);
	}
	var updateHaversine=function(position){
			aviary.updateHaversine(position);
	};
	this.fetchAviary = function(aviaryid){
		apiAviaryRepository.getAviary(aviaryid)
			.then(function(apiAviary){
				var nests = [];
				angular.forEach(apiAviary.data.nests, function(nest){
					var newNest = new Nest(nest.id, nest.name, nest.description, nest.image, nest.lat, nest.lng);
					nests.push(newNest);
				})
				aviary = new Aviary(apiAviary.data.slug, apiAviary.data.name, apiAviary.data.description, apiAviary.data.image, nests);						
		});		
	}
}]);