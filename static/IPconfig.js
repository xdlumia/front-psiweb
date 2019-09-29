/*
 * @Author: web.王晓冬
 * @Date: 2019-09-23 10:45:29
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-09-24 11:37:02
 * @Description: ip配置文件
 */
// let model = 'build' // dev 为开发环境 build 为测试环境  product 为生产环境
let aipUrl = '/apis/'
// let aipUrl = 'https://pmdwebset.fangmaidong.com/apis/'

// if (model === 'dev') {
//   aipUrl = 'http://10.168.1.145:7011/'
// } else if (model === 'build') {
// aipUrl = 'http://39.105.103.188:7011/'
// } else if (model === 'product') {
//   aipUrl = 'http://gy.fangmaidong.com:7011/'
// }

let baseURL = {
  systemService: aipUrl + 'system-service', // 角色，员工，部门
  companyInitService: aipUrl + 'company-init-service',
  resourceService: aipUrl + 'resource-service', // 9013
  seeExternService: aipUrl + 'see-extern-service', // 9024 see-extern-service
  bizSystemService: aipUrl + 'biz-system-service', // 角色 ，员工，部门8011
  seeBaseHouseService: aipUrl + 'see-base-house-service', // 楼盘配置
  seeDataDictionaryService: aipUrl + 'see-data-dictionary-service', // 字典服务
  seeHouseConfigService: aipUrl + 'see-baseinfo-service', // 在这个项目里 seeHouseConfigService 的公共部分都转移到 see-baseinfo-service服务里
  seeBaseinfoService: aipUrl + 'see-baseinfo-service', // 基础服务
  seePumaidongService: aipUrl + 'see-pumaidong-service', // 铺脉动
  // seePumaidongService: 'http://10.167.2.114:9539' // 铺脉动
  seePayService: aipUrl + 'see-pay-service',
  cSystemService: aipUrl + 'c-system-service'
}
window.g = {
  ApiUrl: baseURL
}
