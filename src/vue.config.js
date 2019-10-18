/*
 * @Author: web.王晓冬
 * @Date: 2019-06-13 17:33:33
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-09-30 11:39:18
 * @Description: 配置文件
 */
module.exports = {
  // cli3 代理是从指定的target后面开始匹配的，不是任意位置；配置pathRewrite可以做替换
  devServer: {
    proxy: {
      '/apis': {
        target: 'http://39.105.103.188:7011/',
        changeOrigin: true,
        pathRewrite: { }
      },
      '/mock': {
        target: 'http://10.168.1.145:7300/', // 接口的域名
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
      }
    }
  }
}