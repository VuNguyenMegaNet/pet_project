'use strict';
// Modules
import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
const ENV = process.env.npm_lifecycle_event;
const isProd = ENV === 'build' || process.env.NODE_ENV == 'production';

const client = `${__dirname}/client`;
const clientHost = process.env.HOST || '127.0.0.1';
const clientPort = process.env.PORT || 8083;

function resolve(dir) {
	return path.join(__dirname, dir);
}

module.exports = (() => {
	const config = {};

	config.module = {
		rules: [
			{
				test: /\.(js|vue)$/,
				exclude: /node_modules/,
				enforce: 'pre',
				loader: 'eslint-loader',
				include: [resolve('client')],
				options: {
					formatter: require('eslint-friendly-formatter')
				}
			},
			{
				test: /\.vue$/,
				exclude: /node_modules/,
				loader: 'vue-loader'
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['ng-annotate-loader', 'babel-loader']
			},
			{
				test: /\.json$/,
				exclude: /node_modules/,
				use: 'json-loader'
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader'
				})
			},
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract(['css-loader', 'less-loader'])
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: 'file-loader'
			},
			{
				test: /\.html$/,
				use: 'html-loader'
			},
			{
				test: /\.jade$/,
				exclude: [
					/\.template\.jade/
				],
				use: ['html-loader', 'pug-html-loader']
			},
			{
				test: /\.template\.jade$/,
				use: ['ngtemplate-loader?relativeTo=client/app/components/', 'html-loader', 'pug-html-loader']
			}
		]
	};

	config.entry = {
		'app': `${client}/js/app.js`
	};

	config.resolve = {
		modules: [
			path.join(__dirname, 'client'),
			'node_modules'
		],
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': './client'
		}
	};

	config.node = {
		console: true,
		fs: 'empty'
	};

	config.output = {
		path: path.resolve('./dist/client'),
		publicPath: isProd ? '/' : `http://${clientHost}:${clientPort}/`,
		filename: isProd ? '[name].[chunkhash].bundle.js' : '[name].bundle.js',
		chunkFilename: isProd ? '[name].[chunkhash].js' : '[name].bundle.js'
	};

	if (isProd) {
		config.devtool = 'nosources-source-map';
	} else {
		config.devtool = 'eval';
	}

	config.plugins = [
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [autoprefixer]
			}
		}),
		new HtmlWebpackPlugin({
			template: `!!html-loader!${client}/index.html`,
			inject: 'body'
		}),
		new ExtractTextPlugin({ filename: '[name].[chunkhash].bundle.css', disable: !isProd }),
		new FriendlyErrorsPlugin()
	];

	// Add build specific plugins
	if (isProd) {
		config.plugins.push(
			new webpack.optimize.CommonsChunkPlugin({
				names: ['manifest'],
				minChunks: Infinity
			}),
			new webpack.optimize.UglifyJsPlugin({
				sourceMap: true
			})
		);
	} else {
		config.plugins.push(
			new webpack.HotModuleReplacementPlugin()
		);
	}

	config.devServer = {
		inline: true,
		hot: true,
		open: true,
		port: clientPort,
		host: clientHost,
		stats: 'verbose'
	};

	return config;
})();
