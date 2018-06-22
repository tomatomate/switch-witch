module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    js: './src/index.js',
    // ts: './src/js/main.ts'
  },
  output: {
    filename: 'index.js'
  },
  resolve: {
    extensions: [ '.js', '.jsx', '.ts', '.tsx' ]
  },
  module: {
    rules: [{
      test: /\.ts(x)?$/,
      exclude: /node_modules/,
      loader: 'ts-loader',
    }, {
      test: /\.js(x)?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }]
  },
  performance: {
    hints: false
  }
}