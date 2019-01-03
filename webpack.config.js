const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const pkgJson = require('./package')
const name = pkgJson.name
const isDevMode = process.env.NODE_ENV !== 'production'
const basic = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].min.js',
    libraryTarget: 'umd',
    library: name
  },
  resolve: {
    alias: {
      vue: isDevMode ? 'vue/dist/vue.js' : 'vue/dist/vue.min.js'
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
        exclude: [
          /node_modules/,
          path.resolve(__dirname, 'dist')
        ]
      }
    ]
  }
}

if (isDevMode) {
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
      'index': `./src/index.js`
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.BannerPlugin(`${name} v${pkgJson.version}`)
    ]
  })
}
