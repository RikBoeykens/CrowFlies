'use strict';

var app = angular.module("crowFlies");

app.service('apiAviaryRepository', function ($http) {
	this.getAviary = function(aviaryid){
		return $http.get('https://frozen-tor-7116.herokuapp.com/api/v1/aviaries/'+ aviaryid + '.json')
	}
});