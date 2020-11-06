const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const name = 'tourguide';

module.exports = {
  name: name,
  entry: [`./src/${name}.ts`],
  output: {
    filename: `${name}.js`,
    library: 'TourGuide',
    libraryExport: 'TourGuide',
    libraryTarget: 'umd',
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
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `tourguide.css`
    })
  ],
  devServer: {
    contentBase: [path.join(__dirname, 'examples'), path.join(__dirname, 'dist')],
    port: '8000'
  }
};
