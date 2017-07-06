const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function getDate() {
  let date = new Date();
  return "" + date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
}

function pugPage(name) {
  return new HtmlWebpackPlugin({
    filename: name + '.html',
    template: PATHS.pug + name + '.pug',
    date: getDate(),
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
    blog: PATHS.entries + 'blog.js'
  },
  output: {
    path: PATHS.output,
    filename: 'js/[name].js',
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
        loader: 'pug-loader',
      },
      {
        test: /\.css$/,
        use: [{
            loader: "style-loader/useable",
          },
          {
            loader: "css-loader",
            options: {
              minimize: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    pugPage('index'),
    pugPage('blog'),
    new CopyWebpackPlugin([{
      from: "src/plugin/contentTools",
      to: "contentTools/"
    }])
  ]
}
