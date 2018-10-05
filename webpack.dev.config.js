const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin({
  filename: `${common.name}.style.css`
});

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  output: {
    filename: `${common.name}.component.js`
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'postcss-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true }
            }
          ],
          fallback: 'style-loader'
        })
      }
    ]
  },
  plugins: [extractSass]
});
