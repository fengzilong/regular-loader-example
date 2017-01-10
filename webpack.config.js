const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require( 'path' );

const _ = {
	cwd: function ( p ) {
		const cwd = process.cwd();
		return path.resolve( cwd, p );
	},
	dir: function () {
		return path.resolve( __dirname, p );
	},
};

module.exports = {
	entry: _.cwd( 'src/index.js' ),
	devtool: 'source-map',
	output: {
		path: 'dist',
		filename: 'app-[chunkhash:8].js',
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
	plugins: [
		new ExtractTextPlugin( 'app-[contenthash:8].css' ),
		new HtmlWebpackPlugin( {
			template: _.cwd( 'src/index.html' ),
			filename: _.cwd( 'dist/index.html' ),
		} ),
	]
};
