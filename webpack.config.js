const path = require('path')
const srcDir = path.resolve(__dirname, 'src')
const publicDir = path.resolve(__dirname, 'public')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  context: srcDir,
  devtool: 'inline-source-map',
  entry: {
    index: './index.js'
  },
  output: {
    path: publicDir,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader'
          ],
          publicPath: './'
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css'
    }),
    new HtmlWebpackPlugin({
      template: path.join(srcDir, 'index.html'),
      title: 'Custom template'
    })
  ]
}
