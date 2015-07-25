'use strict';

var app = angular.module("crowFlies");

app.service('aviaryService',['$filter','haversine', 'apiAviaryRepository', 'Aviary', 'Nest', 'Coordinates', function ($filter, haversine, apiAviaryRepository, Aviary, Nest, Coordinates) {
	var aviary;
	var currentPosition;
	var recentAviaries=[];
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
	this.getRecent = function(){
		return recentAviaries;
	}
	var addRecent = function(aviary){
		//delete previous record in aviary
		var found = $filter('filter')(recentAviaries, {id: aviary.id}, true);
		if (found.length){
			found[0].lastAccessed = Date();
		}else{
			aviary.lastAccessed = Date();
			recentAviaries.push(aviary);			
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
		var promise = apiAviaryRepository.getAviary(aviaryid)
			.then(function(apiAviary){
				var nests = [];
				angular.forEach(apiAviary.data.nests, function(nest){
					var newNest = new Nest(nest.id, nest.name, nest.description, nest.image, nest.lat, nest.lng);
					nests.push(newNest);
				})
				aviary = new Aviary(apiAviary.data.slug, apiAviary.data.name, apiAviary.data.description, apiAviary.data.image, nests);	
				addRecent(aviary);
		});
		return promise;
	}
}]);