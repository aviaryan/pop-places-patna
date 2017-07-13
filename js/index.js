// import ko
var ko = require('knockout');

// places stores the list of places one can visit in Patna
places = [
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
