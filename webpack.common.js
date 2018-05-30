const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  entry: './src/main.js',
  module:{
    rules:[
      {
        test: /\.less$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader", options: {
                sourceMap: true
            }
        }, {
            loader: "less-loader", options: {
                sourceMap: true
            }
        }]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
           'file-loader'
         ]
       },
       {
         test: /\.(woff|woff2|eot|ttf|otf)$/,
         use: [
           'file-loader'
         ]
       },
       {
         test: /\.(csv|tsv)$/,
         use: [
           'csv-loader'
         ]
       },
       {
         test: /\.xml$/,
         use: [
           'xml-loader'
         ]
       },
       {
          test:/\.vue$/,
          use: [
            'vue-loader'
          ]
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
    ]
  },
  //
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
    }
  },
  plugins: [
    // 清理文件
    new CleanWebpackPlugin(['dist']),
    // HtmlWebpackPlugin 创建了一个全新的文件，所有的 bundle 会自动添加到 html 中
    new HtmlWebpackPlugin({
      // Required
      inject: false,
      template: require('html-webpack-template'),

      // Optional
      appMountId: 'app',
      title: '丫丫1'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.SplitChunksPlugin({
      cacheGroups: {
          default: {
              minChunks: 2,//最小chunk，默认1
              priority: -20,//缓存组优先级
              reuseExistingChunk: true//可设置是否重用该chunk
          },
          //打包重复出现的代码
          vendor: {
              chunks: 'initial',
              minChunks: 2,
              maxInitialRequests: 5, // The default limit is too small to showcase the effect
              minSize: 0, // This is example is too small to create commons chunks
              name: 'vendor'
          },
          //打包第三方类库
          commons: {
              name: 'commons',// 指定公共 bundle 的名称。
              chunks: 'initial',
              minChunks: Infinity
          }
      }
    })
  ],
  output: {
    // filename: '[name].[chunkhash].js',
    filename: '[name].[hash].js',
    // chunkFilename: '[name].bundle.js',其他的js文件
    path: path.resolve(__dirname, 'dist')
  }
}
