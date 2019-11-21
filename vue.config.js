/*
 * @Author: web.王晓冬
 * @Date: 2019-06-13 17:33:33
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-21 10:52:42
 * @Description: 配置文件
 */
module.exports = {
  // cli3 代理是从指定的target后面开始匹配的，不是任意位置；配置pathRewrite可以做替换
  devServer: {
    proxy: {
      '/apis': {
        target: 'http://39.99.132.95:7011/',
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          '^/apis': ''
        }
      },
      '/mock': {
        target: 'http://10.168.1.145:7300/', // 接口的域名
        changeOrigin: true // 如果接口跨域，需要进行这个参数配置
      }
    }
  },

  //   build输出文件
  outputDir: 'dist',

  //   是否生成map文件
  productionSourceMap: true,

  lintOnSave: false,
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  }
}
