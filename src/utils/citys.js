/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-24 18:53:10
 * @Description: file content
 */
/* eslint-disable no-mixed-operators */
/**
* @desc 公共验证方法
* @author web-王晓冬
* @date 2018年9月18号
* @example 调用示例
*          :rules="{ type:'phone',message:'请输入正确的手机号'}"
 * @deprecated yanchao 2018年11月22日 大部分校验已经移至基础包中
**/
// 验证正则
import Vue from 'vue'
import { Api } from 'see-web-basic'
const baseURL = window.g && window.g.ApiUrl ? window.g.ApiUrl : {}
if (!baseURL.seeBaseinfoService) {
  baseURL.seeBaseinfoService = '/apis/' + 'see-baseinfo-service'
}
// 存放城市缓存
var cityCache = {}
var getCityArr = function(type) {
  var cityArr = cityCache['city']
  if (!cityArr) {
    Vue.util.defineReactive(cityCache, 'city', [])
    cityArr = cityCache['city']
    var success = false
    Api.get(baseURL.seeBaseinfoService + '/common/getAllCity')
      .then(function(res) {
        const data = res.data || {}
        cityCache['city'] = Object.values(data).reduce((total, item) => {
          total = [...total, ...item]
          return total
        }, [])
        success = true
      }).finally(function() {
        // 简单处理下，如果没加载成功，下次重新加载
        !success && delete cityCache['city']
      })
  }
  return cityArr
}
const city = {
  methods: {
    citys() {
      return getCityArr()
    }
  }}
export default {
  install: function install(vm) {
    vm.mixin(city)
  }
}
