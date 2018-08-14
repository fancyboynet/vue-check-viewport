const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const pkgJson = require('./package')
const basic = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].min.js',
    libraryTarget: 'umd',
    library: 'vue-check-viewport'
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                '@babel/plugin-transform-runtime'
              ]
            }
          },
          {
            loader: 'eslint-loader'
          }
        ],
        exclude: /node_modules/
      }
    ]
  }
}

if (process.env.NODE_ENV !== 'production') {
  module.exports = merge(basic, {
    mode: 'development',
    entry: {
      'demo': './demo/index.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'demo/index.html')
      })
    ],
    devtool: 'inline-source-map',
    devServer: {}
  })
} else {
  module.exports = merge(basic, {
    mode: 'production',
    entry: {
      'vue-check-viewport': './src/vue-check-viewport.js'
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.BannerPlugin(`vue-check-viewport v${pkgJson.version}`)
    ]
  })
}
