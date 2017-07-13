// import ko
var ko = require('knockout');

// initalize vars
var map;

// load map
initMap = function() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: -34.397, lng: 150.644},
		zoom: 8
	});
}

// places stores the list of places one can visit in Patna
var places = [
	{
		name: 'Gol Ghar'
	},
	{
		name: 'Museum'
	},
	{
		name: 'Zoo'
	}
];

// setup our ViewModel
var viewModel = {
	places: places
};

// apply KO bindings
ko.applyBindings(viewModel);
