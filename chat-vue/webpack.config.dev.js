'use strict'

const { VueLoaderPlugin } = require('vue-loader')
const path = require('path')

module.exports ={
	mode: 'development',
	entry: ['./app.js'],
	output: {
		filename: "bundle.js",
		path: path.join(__dirname, 'dist')
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
