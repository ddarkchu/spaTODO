const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCSS = new ExtractTextPlugin('[name].bundle.css')

function pugPage(name) {
  return new HtmlWebpackPlugin({
    filename: name + '.html',
    template: __dirname + '/src/pug/' + name + '.pug',
    inject: false
  })
}


const PATHS = {
  entries: __dirname + '/src/script/',
  css: __dirname + '/src/style/',
  output: __dirname + '/dist/',
  pug: __dirname + '/src/pug/'
}


module.exports = {
  devtool: 'sourcemaps',
  entry: {
    main: PATHS.entries + 'main.js',
    // about: PATHS.entries + 'about.js'
  },
  output: {
    path: PATHS.output,
    filename: 'js/[name].js'
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.pug$/,
        exclude: /node_modules/,
        loader: 'pug-loader'
      },
      {
        test: /\.css$/,
        loader: extractCSS.extract(['css-loader', 'sass-loader'])
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: true
    }),
    // extractCSS,
    pugPage('index')
  ]
}
