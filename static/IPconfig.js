var aipUrl = '/apis/'

var baseURL = {
  systemService: aipUrl + 'system-service', // 登录
  resourceService: aipUrl + 'resource-service', // 9013
  bizSystemService: aipUrl + 'biz-system-service', // 角色 ，员工，部门
  seeDataDictionaryService: aipUrl + 'see-data-dictionary-service', // 字典服务
  seeHouseConfigService: aipUrl + 'see-house-config-service', // 8118
  seeGoodsService: aipUrl + 'see-goods-service', // 8132
  seeBaseHouseService: aipUrl + 'see-base-house-service', // 楼盘字典
  seeExternService: aipUrl + 'see-extern-service', // 9024 see-extern-service
  seeBaseinfoService: aipUrl + 'see-baseinfo-service', //公司设置

}

window.g = {
  ApiUrl: baseURL
}
