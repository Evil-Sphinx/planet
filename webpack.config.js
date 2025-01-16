// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js', // 入口文件
  output: {
    filename: 'bundle.js', // 输出文件
    path: path.resolve(__dirname, 'dist') // 输出路径
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  module: {
    rules: [
      {
        test: /\.less$/, // 匹配所有less文件
        use: [
          'style-loader', // 将CSS注入到DOM中
          'css-loader', // 解析CSS文件
          'less-loader' // 编译Less到CSS
        ]
      },
      {
        test: /\.css$/, // 匹配所有css文件
        use: ['style-loader', 'css-loader']
      }
      // 其他加载器配置...
    ]
  }
  // 其他Webpack配置...
};
