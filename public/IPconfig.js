/*
 * @Author: web.王晓冬
 * @Date: 2019-09-23 10:45:29
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-24 20:04:33
 * @Description: ip配置文件
 */
// let model = 'build' // dev 为开发环境 build 为测试环境  product 为生产环境
let apisUrl = '/apis/'
// apis = 'http://39.105.103.188:7011/'

// if (model === 'dev') {
//   apis = 'http://10.168.1.145:7011'
// } else if (model === 'build') {
// apis = 'http://39.105.103.188:7011'
// } else if (model === 'product') {
//   apis = 'http://gy.fangmaidong.com:7011/'
// }

let baseURL = {
//   systemService: apisUrl + 'system-service', // 角色，员工，部门
//   companyInitService: apisUrl + 'company-init-service',
//   resourceService: apisUrl + 'resource-service', // 9013
// //   bizSystemService: apisUrl + 'biz-system-service', // 角色 ，员工，部门8011
//   seeBaseHouseService: apisUrl + 'see-base-house-service', // 楼盘配置
//   seeDataDictionaryService: apisUrl + 'see-data-dictionary-service', // 字典服务
//   seeHouseConfigService: apisUrl + 'see-baseinfo-service', // 在这个项目里 seeHouseConfigService 的公共部分都转移到 see-baseinfo-service服务里
//   seeBaseinfoService: apisUrl + 'see-baseinfo-service', // 基础服务
}
window.g = {
  ApiUrl: baseURL,
}
