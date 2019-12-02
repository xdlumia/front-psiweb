/*
 * @Author: web.王晓冬
 * @Date: 2019-11-05 18:57:05
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-02 18:26:11
 * @Description: 本项目用到的工具集合
 */
const utils = {
  /**
   * 深拷贝数据
   * @param {Array,Object} 数据对象
   */
  deepCopy(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = typeof obj[key] === 'object' ? this.deepCopy(obj[key]) : obj[key];
      }
    }
    return newObj
  },
  /**
   * 扁平化json数组数据
   * @param {Array} data  数组数据
   * @param {String} children 子项名称  String
   */
  jsonFlatten(data, children = 'children') {
    let dataArr = this.deepCopy(data)
    let parentData = dataArr.map(item => {
      let chilData = item[children] ? [...item[children]] : []
      delete delete item[children]
      return [item].concat(chilData)
    })
    let newArr = []
    parentData.forEach(item => {
      newArr = newArr.concat(item)
    })
    return newArr
  },

  /**
   * 平级数据里的某相同项格式化成树级对象
   * 根据关键字把 相同类型的数据 放在此类型第一个数据的子项里.
   * @param {Array} data 数据对象
   * @param {String} key 
   */
  formatChildren(data, key = 'id') {
    let newArr = []
    data.forEach((item, index) => {
      // 判断当前项有没有在新数组里出现
      let newIndex = newArr.findIndex(v => v[key] == item[key])
      // 如果新数组里没有当前类型 那就把当前项目放到新数组里 充当父级
      if (newIndex == -1) {
        newArr.push(item)
      } else {
        // 如果新数据里已经有了当前类型 那把当前数据充当此类型的子级 children
        if (newArr[newIndex].children) {
          // 如果之前已经存在过子级children 直接push
          newArr[newIndex].children.push(item)
        } else {
          // 否则创建children 字段 为数组格式
          newArr[newIndex].children = [item]
        }
      }
    })
    return newArr
  },
  // 格式化商品信息
  formatCommodity(data, children = 'children') {
    let newArr = data.filter(v => !v.parCode)
    newArr.forEach(item => {
      newArr['children'] = data.filter(v => item.commodityCode = v.parentCommodityCode)
    })
    return newArr
  }

}
import Vue from 'vue'
Vue.prototype.$$util = utils

