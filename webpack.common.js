const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  entry: './src/main.js',
  plugins: [
    // 清理文件
    new CleanWebpackPlugin(['dist']),
    // HtmlWebpackPlugin 创建了一个全新的文件，所有的 bundle 会自动添加到 html 中
    new HtmlWebpackPlugin({
      title: '丫丫1'
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common' // 指定公共 bundle 的名称。
    // })
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
    filename: '[name].[chunkhash].js',
    // chunkFilename: '[name].bundle.js',其他的js文件
    path: path.resolve(__dirname, 'dist')
  }
}
