const path = require('path')
const srcDir = path.resolve(__dirname, 'src')
const publicDir = path.resolve(__dirname, 'public')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')

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
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        use: [
          'file-loader?name=[path][name].[ext]',
          'image-webpack-loader?bypassOnDebug'
        ]
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
      title: 'Notas',
      favicon: './assets/favicon.ico'
    }),
    new WebpackPwaManifest({
      name: 'NOTES',
      short_name: 'NOTES',
      description: 'Aplicación Web Progresiva',
      orientation: 'portrait',
      display: 'standalone',
      start_url: 'index.html?utm=homescreen',
      scope: './',
      lang: 'es',
      background_color: '#007BDF',
      theme_color: '#FF3C32',
      icons: [
        {
          src: path.resolve('src/assets/calendar.png'),
          sizes: [16, 32, 64, 96, 128, 192, 256, 384, 512, 1024],
          type: 'image/png'
        }
      ],
      fingerprints: false
    }),
    new CopyWebpackPlugin([
      { from: 'sw.js' }
    ])
  ]
}
