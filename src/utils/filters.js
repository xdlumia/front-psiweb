/*
 * @Author: web.王晓冬
 * @Date: 2020-01-02 17:42:35
 * @LastEditors  : web.王晓冬
 * @LastEditTime : 2020-01-02 17:58:47
 * @Description: file content
 */
import Vue from 'vue'
const filters = {
  codeSlice: (val) => {
    // 如果编码值为空则返回原来的值
    if (!val) return val
    // 获取编码首字母
    let first = val.substring(0, 1)
    if (first == 'Z') {
      //如果首字母为Z 则去掉前10位
      return val.slice(10)
    } else {
      //否则去掉前6位
      return val.slice(6)
    }

  }
}
for (let key in filters) {
  Vue.filter(key, filters[key])
}

