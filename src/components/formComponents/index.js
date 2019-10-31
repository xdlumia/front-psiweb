/*
 * @Author: web.王晓冬
 * @Date: 2019-10-30 10:27:10
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-31 10:59:19
 * @Description: 全局引入form表单组件 自动将当前文件夹下的vue文件全局引入
 */

const files = require.context('.', true, /\.vue$/)
export default {
  install(vm) {
    files.keys().map(key => {
      var name = key.replace(/-[a-z]/g, a => a[1].toUpperCase()).split(/[.\/.]/).slice(-2)[0]
      vm.component(name, files(key).default)
    })
  }
}


