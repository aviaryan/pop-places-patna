const webpack = require('webpack');

module.exports = {
	entry: {
		app: './js/index.js',
		vendor: ['knockout', 'jquery']
	},
	output: {
		path: __dirname + '/dist',
		publicPath: '/dist/',
		filename: 'bundle.js'
	},

	plugins: [
		// minify: https://webpack.js.org/guides/production-build/
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		}),
		new webpack.optimize.UglifyJsPlugin({
			beautify: false,
			mangle: {
				screw_ie8: true,
				keep_fnames: false
			},
			compress: {
				screw_ie8: true
			},
			comments: false
		}),
		// vendor: https://webpack.github.io/docs/code-splitting.html#split-app-and-vendor-code
		new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js'})
	]
};
