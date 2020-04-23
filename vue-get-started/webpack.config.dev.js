'use strict'

const { VueLoaderPlugin } = require('vue-loader')
const path = require('path')

module.exports ={
	mode: 'development',
	entry: ['./app.js'],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'build')
	},
	module: {
		rules: [{
			test: /\.vue$/,
			use: 'vue-loader'
		}]
	},
	plugins: [
		new VueLoaderPlugin()
	]
}
