// import ko
var ko = require('knockout');

// initalize vars
var map;

// load map
initMap = function() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 25.602961, lng: 85.158076},
		zoom: 14
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
function ViewModel() {
	this.searchTerm = ko.observable('');

	this.places = ko.computed(function() {
		if (!this.searchTerm()) {
			return places;
		}
		var filter = this.searchTerm().toLowerCase();
		return ko.utils.arrayFilter(places, function(p) {
      return p.name.toLowerCase().search(filter) > -1;
    });
	}, this);

};

// apply KO bindings
ko.applyBindings(new ViewModel());
