angular.module("crowFlies")
.directive('map', ['$timeout', 'geolocate', function($timeout, geolocate) {
	return {
		restrict: 'E',
		replace: true,
		template: '<div></div>',
		scope:{
			control: '='
		},
		link: function(scope, element, attrs) {
			scope.internalControl = scope.control || {};
			
			var currentPositionMarker;
			
			scope.internalControl.initMap = function(){
				var centreCoords = scope.internalControl.options.startCentreCoords || getLatLng({lat: 0, lng: 0});
				var zoom = scope.internalControl.options.zoom || 13;
				var map_options = {
					zoom: zoom,
					center: centreCoords
				};

				// create map
				scope.internalControl.map = new google.maps.Map(document.getElementById(attrs.id), map_options);
				
				if(!geolocate.getCurrentPosition()){
					geolocate.updatePosition()
						.then(function (position) {
							displayOnMap(position);
					}, function(err) {
						console.log(err);
					});            
				}else{
					displayOnMap(geolocate.getCurrentPosition());
					updateCurrentPositionMarker(position);
				};
				
				if (scope.internalControl.options.nests){
					if (scope.internalControl.options.nests.length>0){
						scope.internalControl.addMarkers(scope.internalControl.options.nests);
					}
					else
						centreOnLocation();					
				}
				if (scope.internalControl.options.nest){
					scope.internalControl.addMarker(scope.internalControl.options.nest);
				}
				if(scope.internalControl.options.newNest){
					scope.internalControl.addMarker();
				}
				
				function centreOnLocation(){
					if(navigator.geolocation)
						navigator.geolocation.getCurrentPosition(displayOnMap);
				}

				function displayOnMap(position){
					centreCoords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
					scope.internalControl.map.setCenter(centreCoords);
				};
			}

			scope.markers=[];

			scope.internalControl.addMarkers = function(nests){
				angular.forEach(nests, function(nest){
					var coords = getLatLng(nest.coordinates);
					var marker = new google.maps.Marker({
						position:coords,
						map:scope.internalControl.map,
						title:nest.name
					 });
					scope.markers.push(marker);
				})
			}

			scope.internalControl.updateCurrentPositionMarker=function(position){
				var positionCoords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				if (!currentPositionMarker){
					currentPositionMarker = new google.maps.Marker({
						position: positionCoords,
						map: scope.internalControl.map,
						icon:'img/green-dot.png'
					});
					currentPositionMarker.circle= new google.maps.Circle({
						map: scope.internalControl.map,
						center: positionCoords,
						radius: position.coords.accuracy,
						fillColor: '#6666ff',
						strokeColor: '#00004c'
					})
				}
				currentPositionMarker.setPosition(positionCoords);
				currentPositionMarker.circle.setCenter(positionCoords);
				currentPositionMarker.circle.setRadius(position.coords.accuracy);
			}

		}
	}
}]);

var getLatLng = function(coords){
    return new google.maps.LatLng(coords.lat, coords.lng);
};
var getCoords = function(position){
    return {lat:position.A, lng:position.F};
};