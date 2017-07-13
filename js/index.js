// import ko
var ko = require('knockout');

// initalize vars
var map;

// places stores the list of places one can visit in Patna
var places = [
	{
		name: 'Gol Ghar',
		lat: 25.620589,
		lng: 85.139459
	},
	{
		name: 'Patna Museum',
		lat: 25.612672,
		lng: 85.133243
	},
	{
		name: 'Patna Zoo',
		lat: 25.597420,
		lng: 85.100288
	},
	{
		name: 'Buddha Smriti Park',
		lat: 25.606386,
		lng: 85.137062
	},
	{
		name: 'Pind Balluchi',
		lat: 25.617460,
		lng: 85.140837
	},
	{
		name: 'Gandhi Maidan',
		lat: 25.618783,
		lng: 85.145060
	},
	{
		name: 'P & M Mall',
		lat: 25.634139,
		lng: 85.106177
	}
];

// load map
// initMap defined globally to bypass an issue
initMap = function() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 25.613861, lng: 85.124076},
		zoom: 14
	});

	places.forEach(function(place) {
		var marker = new google.maps.Marker({
			position: {lat: place.lat, lng: place.lng},
			map: map,
			title: place.name
		});
		marker.addListener('click', function(){
			marker.setAnimation(google.maps.Animation.BOUNCE);
			setTimeout(function() {
				marker.setAnimation(null);
			}, 1400);
		});
		// save it in places
		place.marker = marker;
	});
}

// setup our ViewModel
function ViewModel() {
	this.searchTerm = ko.observable('');

	this.places = ko.computed(function() {
		var filter = this.searchTerm().toLowerCase();
		return ko.utils.arrayFilter(places, function(p) {
			var match = (p.name.toLowerCase().search(filter) > -1) || (filter == '');
			if (p.marker === undefined){
				return match;
			}
			if (match){
				p.marker.setMap(map);
			} else {
				p.marker.setMap(null);
			}
			return match;
		});
	}, this);

};

// apply KO bindings
ko.applyBindings(new ViewModel());
