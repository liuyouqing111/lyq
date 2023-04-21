const { resolve } = require('path')
const WebpackCleanPlugin = require('webpack-clean-plugin')
module.exports = {
	entry: './clinent/main.js',
	output: {
		filename: '[name].js',
		path: resolve(__dirname, './lib/public'),
	},
	module: {
		rules: [
			{
				test: /\.jsx?$|/,
				use: [
					{
						loader: 'babel-loader',
					},
				],
			},
		],
	},
	plugins: [new WebpackCleanPlugin()],
}
