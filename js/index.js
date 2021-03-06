// import libraries
var ko = require('knockout');
var jquery = require('jquery');
// secret stores foursquare credential
var secret = require('./secret.js');
// places stores the list of places one can visit in Patna
var places = require('./places.js');

// initalize global map var
var map;

// load map
// initMap defined globally to bypass an issue
initMap = function() {
	map = new google.maps.Map(document.getElementById('map'), {});
	panToDefault();
	loadPlaces();
};

// panToDefault pans to the default map view
function panToDefault() {
	if (map !== undefined){
		map.setZoom(14);
		map.panTo({lat: 25.619861, lng: 85.124076});
	}
}

/*
 * loadPlaces loads all the markers at places
 */
function loadPlaces() {
	places.forEach(function(place) {
		var marker = new google.maps.Marker({
			position: {lat: place.lat, lng: place.lng},
			map: map,
			title: place.name
		});
		// set info window
		var infowindow = new google.maps.InfoWindow({
			content: place.name
		});
		marker.addListener('click', function(){
			marker.setAnimation(google.maps.Animation.BOUNCE);
			closeInfoWindows(); // close old info windows
			// open infowindow
			infowindow.open(map, marker);
			setTimeout(function() {
				marker.setAnimation(null); // disable animation after some time
			}, 1400);
		});
		// save it in places
		place.marker = marker;
		place.infowindow = infowindow;
		// get foursquare data asynchronously
		getFoursquareData(place);
	});
}

/*
 * closeInfoWindows closes all info windows
 */
function closeInfoWindows() {
	places.forEach(function(place) {
		if (place.infowindow !== undefined){
			place.infowindow.close();
		}
	});
}

function getFoursquareData(place) {
	var url = 'https://api.foursquare.com/v2/venues/search?v=20161016';
	url += '&client_id=' + secret.clientID;
	url += '&client_secret=' + secret.clientSecret;
	url += '&ll=' + place.lat + ',' + place.lng;
	url += '&query=' + place.name;
	// send request
	jquery.getJSON(url)
		.done(function(data) {
			var venue = data.response.venues[0];

			var html = '<b>' + place.name + '</b><br>';
			// get category
			if (venue.categories.length > 0){
				html += '<b>Category:</b> ' + venue.categories[0].name + '<br>';
			}
			// get address
			if (venue.location.address !== undefined){
				html += '<b>Address:</b> ' + venue.location.address;
			}
			// update infowindow
			place.infowindow.setContent(html);
		})
		.fail(function(jqxhr, textStatus, error) {
			// set in infowindow as fetching foursquare data happens in the background
			place.infowindow.setContent('Error when fetching details. See console for more info.');
			console.log(textStatus + ' ' + error);
		});
}

// setup our ViewModel
function ViewModel() {
	this.searchTerm = ko.observable('');

	this.itemClick = function(place) {
		if (place.marker !== undefined) {
			google.maps.event.trigger(place.marker, 'click');
			// zoom to location (don't do it when manual click on marker)
			map.setZoom(15);
			map.panTo(place.marker.getPosition());
		}
	};

	this.places = ko.computed(function() {
		var filter = this.searchTerm().toLowerCase();
		panToDefault(); // to make sure filtered items are visible in map
		closeInfoWindows(); // doesn't look nice
		return ko.utils.arrayFilter(places, function(p) {
			var match = (p.name.toLowerCase().search(filter) > -1) || (filter === '');
			if (p.marker === undefined){
				// can't set marker now
				return match;
			}
			p.marker.setVisible(match ? true : false);
			return match;
		});
	}, this);

	// no need to keep this as observable as it is constant
	this.atrb = 'This application uses Foursquare';
}

// mapLoadError shows error when google maps failed to load
// to have this run, disconnect your internet and refresh the page
mapLoadError = function() {
	alert('Google maps failed to load. Please try reloading the page.');
};

// apply KO bindings
ko.applyBindings(new ViewModel());
