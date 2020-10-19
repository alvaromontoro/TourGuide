const path = require('path');
const name = 'tourguide';

module.exports = {
  name: name,
  entry: [`./src/${name}.js`],
  output: {
    filename: `${name}.js`,
    library: 'TourGuide',
    libraryTarget: 'umd',
    libraryExport: 'TourGuide',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    modules: [path.resolve(), path.resolve('./src'), 'node_modules'],
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'ts-loader',
        test: /\.tsx?$/
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components|coverage)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      }
    ]
  },
  plugins: [],
  devServer: {
    contentBase: [path.join(__dirname, 'examples'), path.join(__dirname, 'dist')],
    port: '8000'
  }
};
