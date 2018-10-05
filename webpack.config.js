const path = require('path');
const name = 'spotlightjs';

module.exports = {
  name: name,
  entry: [`./src/${name}.js`],
  output: {
    filename: `${name}.js`,
    library: 'SpotlightJS',
    libraryTarget: 'umd',
    libraryExport: 'default',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    modules: [
      path.resolve(),
      path.resolve('./src'),
      'node_modules'
    ]
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /(node_modules|bower_components|coverage)/,
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components|coverage)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [ '@babel/preset-env' ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
  ]
};
