const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack')

const config = {
  mode: 'development',
  // 入口
  // entry:  path.join(__dirname, '/src/login/index.js'),
  entry: {
    'login' : path.join(__dirname, 'src/login/index.js'),
    'content' : path.join(__dirname, 'src/content/index.js'),
    'publish' : path.join(__dirname, 'src/publish/index.js')
  },
  // 出口
  output: {
    path: path.join(__dirname, 'dist'),
    filename: './[name]/index.js',
    clean: true
  },
  // 插件 给webpack提供更多功能
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/login.html'), // 模板文件
      filename: path.join(__dirname, 'dist/login/index.html'), // 输出路径
      useCdn: process.env.NODE_ENV === 'production',
      chunks: ['login'] // 引入哪些打包之后的模块
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/content.html'), // 模板文件
      filename: path.join(__dirname, 'dist/content/index.html'), // 输出路径
      useCdn: process.env.NODE_ENV === 'production',
      chunks: ['content'] // 引入哪些打包之后的模块
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/publish.html'), // 模板文件
      filename: path.join(__dirname, 'dist/publish/index.html'), // 输出路径
      useCdn: process.env.NODE_ENV === 'production',
      chunks: ['publish'] // 引入哪些打包之后的模块
    }),
    new MiniCssExtractPlugin({ // 只能传入相对路径
      filename: './[name]/index.css' // 输出路径
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  // 加载器
  module: {
    rules: [
      {
        test: /\.css$/i,
        // use: ['style-loader', 'css-loader'],
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.less$/i, // 匹配 .less文件
        use: [
          // compiles Less to CSS
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/[hash][ext][query]'
        }
      }
    ],
  },
  // 优化
  optimization: {
    // 代码分割
    splitChunks: {
      chunks: 'all', // 所有模块动态非动态移入的都分割分析
      cacheGroups: { // 分隔组
        commons: { // 抽取公共模块
          minSize: 0, // 抽取的chunk最小大小字节
          minChunks: 2, // 最小引用数
          reuseExistingChunk: true, // 当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用
          name(module, chunks, cacheGroupKey) { // 分离出模块文件名
            const allChunksNames = chunks.map((item) => item.name).join('~') // 模块名1~模块名2
            return `./js/${allChunksNames}` // 输出到 dist 目录下位置
          }
        }
      }
    },
    // nodeEnv: false,
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      `...`, // 保证JS代码还可以压缩
      new CssMinimizerPlugin(),
    ],
  },
  // 解析别名
  resolve: {
    alias: {
      '@' :path.join(__dirname, 'src')
    }
  }
};

// 开发环境下可以定位错误 sourcemap选项
if (process.env.NODE_ENV === 'development') {
  config.devtool = 'inline-source-map'
} 

// 生产环境下使用相关配置
if(process.env.NODE_ENV === 'production') {
  // 外部扩展（让 webpack防止 import的包被打包进来）I
  config.externals = {
    'bootstrap/dist/css/bootstrap.min.css':'bootstrap',
    'axios':'axios',
    'form-serialize': 'serialize',
    '@wangeditor/editor': 'wangEditor'
  }
}

module.exports = config