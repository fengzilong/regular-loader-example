var ExtractTextPlugin = require('extract-text-webpack-plugin');
var cwd = process.cwd();

module.exports = {
	entry: './index.js',
	cwd: cwd,
	devtool: 'source-map',
	output: {
		path: './dist',
		filename: 'app.js',
		publicPath: './dist/'
	},
	module: {
		loaders: [
			{
				test: /\.rgl$/,
				loader: 'regular',
				exclude: /node_modules/
			},
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				loader: 'url-loader?limit=10240&name=images/[path][name].[ext]?[hash:16]',
				exclude: /node_modules/
			},
		]
	},
	resolve: {
		extensions: [ '', '.js', '.rgl' ]
	},
	regular: {
		loaders: {
			css: ExtractTextPlugin.extract( 'css' ),
			less: ExtractTextPlugin.extract( 'css!less' )
		}
	},
	externals: {
		'regularjs': 'Regular'
	},
	plugins: [
		new ExtractTextPlugin( 'app.css' )
	]
};
