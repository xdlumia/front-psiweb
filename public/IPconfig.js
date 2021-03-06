/*
 * @Author: web.王晓冬
 * @Date: 2019-09-23 10:45:29
 * @LastEditors  : web.王晓冬
 * @LastEditTime : 2019-12-27 10:40:34
 * @Description: ip配置文件
 */
const apiUrl = '/apis/'
// 这里必须定义为apiUrl
// apiUrl = 'http://testjxc.515md.com/'

// 以后新项目不用在此引入api
const baseURL = {
  login: apiUrl + 'system-service',
  systemService: apiUrl + 'system-service', // 角色，员工，部门
  seeContractService: apiUrl + 'see-baseinfo-service', // 合同服务韩延峰
  seeOaService: apiUrl + 'see-oa-service', // OA

  //   companyInitService: apiUrl + 'company-init-service',
  //   resourceService: apiUrl + 'resource-service', // 9013
  // //   bizSystemService: apiUrl + 'biz-system-service', // 角色 ，员工，部门8011
  //   seeBaseHouseService: apiUrl + 'see-base-house-service', // 楼盘配置
  //   seeDataDictionaryService: apiUrl + 'see-data-dictionary-service', // 字典服务
  seeHouseConfigService: apiUrl + 'see-baseinfo-service', // 在这个项目里 seeHouseConfigService 的公共部分都转移到 see-baseinfo-service服务里
  seeBaseinfoService: apiUrl + 'see-baseinfo-service', // 基础服务
  seePsiCommonService: apiUrl + 'see-psi-common-service',
  // seePsiCommonService: 'http://10.168.1.130:9201',
  seeExternService: apiUrl + 'see-extern-service', // 9024 see-extern-service
  seeGoodsService: apiUrl + 'see-goods-service', //
  seePsiWmsService: apiUrl + 'see-psi-wms-service',
  seePsiReportService: apiUrl + 'see-psi-report-service',
  // seePsiFinanceService: 'http://10.168.1.230:9215', // 欢欢本地
  seePsiFinanceService: apiUrl + 'see-psi-finance-service', // 财务
  seePsiSaleService: apiUrl + 'see-psi-sale-service' // 销售
  // seePsiSaleService: 'http://10.168.1.230:9209' // 销售 欢欢本地
}
window.g = {
  ApiUrl: baseURL
}
