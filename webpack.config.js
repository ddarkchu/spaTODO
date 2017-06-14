const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
    filename: 'js/[name].js',
    // publicPath: "/assets/",
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
        // use: ExtractTextPlugin.extract({
        //   fallback: "style-loader",
        //   use: {
        //     loader: "css-loader",
        //     options: {
        //       sourceMap: true,
        //       minimize:true
        //     }
        //   },
        //   publicPath: "../"
        // })
        // use: [
        //   {
        //     loader: "style-loader/useable",
        //     insertInto:"head"
        //   },
        // ]
        use: [{
            loader: "style-loader/url"
          },
          {
            loader: "file-loader"
          }
        ]
        // { loader: "css-loader" },
      },
      {
        test: /\.jpg$/,
        loader: "file-loader"
      }
    ]
  },
  plugins: [
    // new ExtractTextPlugin({
    //   filename: '[name].css'
    // }),

    // new webpack.optimize.UglifyJsPlugin({
    //   compress: false
    // }),
    // new ExtractTextPlugin("dist/stylesheets/bundle/[name].css"),

    pugPage('index')
  ]
}
