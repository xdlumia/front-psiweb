/*
 * @Author: web.王晓冬
 * @Date: 2019-09-23 10:45:29
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-04 17:11:53
 * @Description: ip配置文件
 */
// let model = 'build' // dev 为开发环境 build 为测试环境  product 为生产环境
const apisUrl = '/apis/'
// apis = 'http://39.99.132.95:7011/'
// const apis = 'http://10.168.1.145:7011/'
// apis = 'http://39.105.103.188:7011/'

// if (model === 'dev') {
//   apis = 'http://10.168.1.145:7011'
// } else if (model === 'build') {
// apis = 'http://39.99.132.95:8080:7011'
// } else if (model === 'product') {
//   apis = 'http://gy.fangmaidong.com:7011/'
// }

// 以后新项目不用在此引入api
const baseURL = {
  systemService: apisUrl + 'system-service', // 角色，员工，部门
  seeContractService: apisUrl + 'see-baseinfo-service', // 合同服务韩延峰

  //   companyInitService: apisUrl + 'company-init-service',
  //   resourceService: apisUrl + 'resource-service', // 9013
  // //   bizSystemService: apisUrl + 'biz-system-service', // 角色 ，员工，部门8011
  //   seeBaseHouseService: apisUrl + 'see-base-house-service', // 楼盘配置
  //   seeDataDictionaryService: apisUrl + 'see-data-dictionary-service', // 字典服务
  seeHouseConfigService: apisUrl + 'see-baseinfo-service', // 在这个项目里 seeHouseConfigService 的公共部分都转移到 see-baseinfo-service服务里
  seeBaseinfoService: apisUrl + 'see-baseinfo-service', // 基础服务
  seePsiCommonService: apisUrl + 'see-psi-common-service',
  // seePsiCommonService: 'http://10.168.1.130:9201',
  seeExternService: apisUrl + 'see-extern-service', // 9024 see-extern-service
  seeGoodsService: apisUrl + 'see-goods-service', // 物品服务
  seePsiWmsService: apisUrl + 'see-psi-wms-service' // 物品服务
}
window.g = {
  ApiUrl: baseURL
}
