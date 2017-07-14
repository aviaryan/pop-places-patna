const webpack = require('webpack');

module.exports = {
	entry: {
		app: './js/index.js',
		vendor: ['knockout', 'jquery']
	},
	output: {
		filename: "dist/bundle.js"
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'dist/vendor.bundle.js'})
	]
};
