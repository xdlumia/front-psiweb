/*
 * @Author: web.王晓冬
 * @Date: 2019-09-23 10:45:29
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-09-30 11:50:42
 * @Description: ip配置文件
 */
// let model = 'build' // dev 为开发环境 build 为测试环境  product 为生产环境
let apis = '/apis/'
apis = 'http://39.105.103.188:7011/'

// if (model === 'dev') {
//   apis = 'http://10.168.1.145:7011/'
// } else if (model === 'build') {
// apis = 'http://39.105.103.188:7011/'
// } else if (model === 'product') {
//   apis = 'http://gy.fangmaidong.com:7011/'
// }

let baseURL = {
  systemService: apis + 'system-service', // 角色，员工，部门
  companyInitService: apis + 'company-init-service',
  resourceService: apis + 'resource-service', // 9013
  seeExternService: apis + 'see-extern-service', // 9024 see-extern-service
  bizSystemService: apis + 'biz-system-service', // 角色 ，员工，部门8011
  seeBaseHouseService: apis + 'see-base-house-service', // 楼盘配置
  seeDataDictionaryService: apis + 'see-data-dictionary-service', // 字典服务
  seeHouseConfigService: apis + 'see-baseinfo-service', // 在这个项目里 seeHouseConfigService 的公共部分都转移到 see-baseinfo-service服务里
  seeBaseinfoService: apis + 'see-baseinfo-service', // 基础服务
  seePumaidongService: apis + 'see-pumaidong-service', // 铺脉动
  // seePumaidongService: 'http://10.167.2.114:9539' // 铺脉动
  seePayService: apis + 'see-pay-service',
  cSystemService: apis + 'c-system-service'
}
window.g = {
  ApiUrl: baseURL
}
