   var path = require('path');

var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var PROD = JSON.parse(process.env.PROD_DEV || "0");

module.exports = {
    entry: [
      	"babel-polyfill",
    	"./less/main.less",
    	"./resources/js/game.js"
   	],
    output: {
        path: __dirname + "/build/",
        filename: PROD ? "bundle.min.js" : "bundle.js"
    },
    module: {
        loaders: [
         	{
         		test: /\.js$/, 
         		loader: "babel-loader",
                query: {
                  presets: 'es2015',
                },      		

         	},
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            }
        ]
    },
  	plugins: PROD ? [
  		new ExtractTextPlugin("main.css"),
    	new webpack.optimize.UglifyJsPlugin({minimize: true})
  	] : [
		new ExtractTextPlugin("main.css"),
  	],
	stats: {		
		colors: true
	},
    // Create Sourcemaps for the bundle
    devtool: 'source-map',    
};