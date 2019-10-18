var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
	entry: './src/scene.js',
	output: {
		filename: './build.js'
  },
  mode: 'development',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          },
        },
      },
      {
        test: /\.(js)$/,
        use: ['source-map-loader'],
        enforce: 'pre'
      },
    ]
  },
	watch: true,
	plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['dist'] }
    })
	]
}
