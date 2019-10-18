/**
 * @author 吴森
 * @description seeHouseConfigService的url
 * @date 2018/7/7
 * @host 8118
 */

import {Api} from 'see-web-basic'
let baseURL = window.g.ApiUrl

const apiURL = {
  /**
   * @description  标签管理
   */
  // 获取标签管理列表
  getTagList: '/labelmanage/list',
  // 获取标签值列表
  getTagValueList: '/labelmanage/valueList',
  // 删除标签
  delTag: '/labelmanage/delete/',
  // 编辑标签
  editTag: '/labelmanage/edit',

  /**
   * @description  业务设置公共
   */
  // 获取省份列表
  getProvinces: '/common/getProvinces',
  // 获取区域列表
  getArea: '/common/getArea',
  // 获取商圈列表
  getBusiness: '/common/getBusiness',
  // 获取商圈列表
  editBusiness: '/common/editBusiness',
  // 查看商圈详情
  getBusinessDetail: '/common/getBusinessDetail',
  // 删除商圈列表
  deleteBusiness: '/common/deleteBusiness',

  // 删除商圈列表
  getInfrastructure: '/common/getInfrastructure',
  // 同步配套列表
  sycFacilities: '/common/sycFacilities',
  // 删除配套
  delInfrastructure: '/common/deleteInfrastructure',
  // 获取城市列表
  getCityList: '/common/getAllCity',
  // 获取当前用户的默认城市
  getDefaultCity: '/cfgcitysetting/getDefaultCity',
  // 保存当前选中城市
  updateCityInfo: '/cfgcitysetting/save',

  /**
   * @description  业务设置楼盘
   */

  // 获取房间状态配置列表
  getHouseConfig: '/houses/getHousesTypeConfig',
  // 编辑房间状态配置
  editHouseConfig: '/houses/editHousesTypeConfig',
  // 删除房态配置
  deleteHousesConfig: '/houses/deleteHousesTypeConfig',

  // 获取楼盘电话配置列表
  getHousesPhoneConfig: '/houses/getHousesPhoneConfig',
  // 编辑楼盘电话配置
  editHousesPhoneConfig: '/houses/updateHousesConfig',
  // 恢复默认楼盘电话配置
  recoverHousesPhoneDefault: '/houses/recoverDefaultValue',

  /**
   * @description  业务设置房态
   */

  // 获取房态配置列表
  getHouseTypeConfig: '/houseType/getHouseTypeConfig',
  // 修改房态配置
  updateHouseTypeConfig: '/houseType/updateHouseTypeConfig',
  // 恢复房态配置
  recoverHouseDefault: '/houseType/recoverDefaultValue',
  // 获取付款账期最多提前天数
  getPaymentDaysMaxAdvance: '/houseType/getPaymentDaysMaxAdvance',
  // 获取房态配置详情
  getHouseTypeConfigDetail: '/houseType/getHouseTypeDetail',
  /**
   * @description  业务设置流程
   */
  // 获取业务设置流程配置列表
  getProcessDefinitionList: '/processdefinition/list',
  // 保存业务设置流程配置
  saveProcessDefinition: '/processdefinition/update',

  /**
   * @description  业务设置图片
   */
  // 获取业务设置图片
  getPicConfig: '/pic/getPicConfig',
  // 修改业务设置图片
  recoverPicDefault: '/pic/recoverDefaultValue',
  // 恢复默认值
  updatePicConfig: '/pic/updatePicConfig',

  /**
   * @description  业务设置客户
   */
  // 获取业务设置客户配置
  getCustomerConfig: '/customer/getCustomerConfig',
  // 修改业务设置客户配置
  updateCustomerConfig: '/customer/updateCustomerConfig',
  // 恢复业务设置客户配置
  recoverCustomerDefault: '/customer/recoverDefaultValue',

  /**
   * @description  物品类目
   */
  decorategoodsclass: '/decorategoodsclass/tree',
  // 获取楼盘列表
  cfgBuildingList: '/cfgbuildinglist/list',
  // 页面关系列表
  cfgPageAuth: '/cfgpageobjauth/list',
  cfgObjectDataAuthList: '/cfgobjectdataauth/list',
  cfgObjectDataAuthSave: '/cfgobjectdataauth/save',
  queryUserListByRightCode: '/rmsource/queryUserListByRightCode'
}

export default {

  /**
   * @description  获取流程节点
   */
  getSubTask (params) {
    return Api.get(baseURL.seeHouseConfigService + '/processdefinition/queryProcessDefinitionSubTask', params)
  },

  /**
   * @description  标签管理
   */
  getTagList (params) {
    return Api.get(baseURL.seeHouseConfigService + apiURL.getTagList, params)
  },
  getTagValueList (params) {
    return Api.get(baseURL.seeHouseConfigService + apiURL.getTagValueList, params)
  },
  delTag (params) {
    return Api.del(baseURL.seeHouseConfigService + apiURL.delTag + params)
  },
  editTag (params) {
    return Api.post(baseURL.seeHouseConfigService + apiURL.editTag, params)
  },
  // 修改标签上限
  updateLabelToplimit (params) {
    return Api.post(baseURL.seeHouseConfigService + '/labelmanage/updateLabelToplimit', params)
  },
  // 获取标签上限
  getLabelToplimit (params) {
    return Api.get(baseURL.seeHouseConfigService + '/labelmanage/queryLabelToplimit/' + params)
  },
  /**
   * @description  客户管理对外接口
   */
  // 获取配套设施
  getSupportingFacility (params) {
    return Api.get(baseURL.seeHouseConfigService + '/customer/getMating', params)
  },

  /**
   * @description  业务公共设置
   */

  // 获取省份列表
  getProvinces (params) {
    return Api.get(baseURL.seeHouseConfigService + apiURL.getProvinces, params)
  },
  // 获取区域列表
  getArea (params) {
    return Api.get(baseURL.seeHouseConfigService + apiURL.getArea, params)
  },
  // 获取商圈列表
  getBusiness (params) {
    return Api.get(baseURL.seeHouseConfigService + apiURL.getBusiness, params)
  },
  // 编辑新增商圈列表
  editBusiness (params) {
    return Api.post(baseURL.seeHouseConfigService + apiURL.editBusiness, params)
  },
  // 查看商圈详情
  getBusinessDetail (params) {
    return Api.get(baseURL.seeHouseConfigService + apiURL.getBusinessDetail, params)
  },
  // 删除商圈列表
  deleteBusiness (params) {
    return Api.del(baseURL.seeHouseConfigService + apiURL.deleteBusiness, params)
  },

  // 获取配套列表
  getInfrastructure (params) {
    return Api.get(baseURL.seeHouseConfigService + apiURL.getInfrastructure, params)
  },
  // 同步配套列表
  sycFacilities (params) {
    return Api.post(baseURL.seeHouseConfigService + apiURL.sycFacilities + params)
  },
  // 删除配套
  delInfrastructure (params) {
    return Api.del(baseURL.seeHouseConfigService + apiURL.delInfrastructure, params)
  },
  // 获取城市列表
  getCityList (params) {
    return Api.get(baseURL.seeHouseConfigService + apiURL.getCityList, params)
  },
  // 获取当前用户的默认城市
  getDefaultCity (params) {
    return Api.get(baseURL.seeHouseConfigService + apiURL.getDefaultCity, params)
  },
  // 保存当前选中城市
  updateCityInfo (params) {
    return Api.post(baseURL.seeHouseConfigService + apiURL.updateCityInfo, params)
  },

  // 获取房间状态配置列表
  getHouseConfig (params) {
    return Api.get(baseURL.seeHouseConfigService + apiURL.getHouseConfig, params)
  },
  // 编辑房间状态配置
  editHouseConfig (params) {
    return Api.post(baseURL.seeHouseConfigService + apiURL.editHouseConfig, params)
  },
  // 删除房态配置
  deleteHousesConfig (params) {
    return Api.del(baseURL.seeHouseConfigService + apiURL.deleteHousesConfig, params)
  },

  // 获取楼盘电话配置列表
  getHousesPhoneConfig (params) {
    return Api.get(baseURL.seeHouseConfigService + apiURL.getHousesPhoneConfig, params)
  },
  // 编辑楼盘电话配置
  editHousesPhoneConfig (params) {
    return Api.post(baseURL.seeHouseConfigService + apiURL.editHousesPhoneConfig, params)
  },
  // 恢复默认楼盘电话配置
  recoverHousesPhoneDefault (params) {
    return Api.post(baseURL.seeHouseConfigService + apiURL.recoverHousesPhoneDefault, params)
  },
  // 对口学校列表
  getSchools (params) {
    return Api.get(baseURL.seeHouseConfigService + '/common/getSchools', params)
  },
  /**
   * @description  业务设置房态
   */
  // 获取房态配置列表
  getHouseTypeConfig (params) {
    return Api.get(baseURL.seeHouseConfigService + apiURL.getHouseTypeConfig, params)
  },
  // 修改房态配置
  updateHouseTypeConfig (params) {
    return Api.post(baseURL.seeHouseConfigService + apiURL.updateHouseTypeConfig, params)
  },
  // 恢复房态配置
  recoverHouseDefault (params) {
    return Api.post(baseURL.seeHouseConfigService + apiURL.recoverHouseDefault, params)
  },
  getPaymentDaysMaxAdvance (params) {
    return Api.get(baseURL.seeHouseConfigService + apiURL.getPaymentDaysMaxAdvance, params)
  },
  // 获取房态配置详情
  getHouseTypeConfigDetail (params) {
    return Api.get(baseURL.seeHouseConfigService + apiURL.getHouseTypeConfigDetail, params)
  },
  /**
   * @description  业务设置 公共 学校
   */
  // 获取学校列表
  getSchool (params) {
    return Api.get(baseURL.seeHouseConfigService + '/common/getSchools', params)
  },
  // 新增 | 更新学校
  updateSchool (params) {
    return Api.post(baseURL.seeHouseConfigService + '/common/editSchool', params)
  },
  // 删除学校列表
  delSchool (params) {
    return Api.del(baseURL.seeHouseConfigService + '/common/deleteSchool', params)
  },
  // 根据区域ID获取城市ID
  getCityIdByAreaId (params) {
    return Api.get(baseURL.seeHouseConfigService + '/common/getCityIdByAreaId', params)
  },
  /**
   * @description  业务设置流程
   */
  // 获取业务设置流程配置
  getProcessDefinitionList (params) {
    return Api.get(baseURL.seeHouseConfigService + apiURL.getProcessDefinitionList, params)
  },
  // 保存业务设置流程配置
  saveProcessDefinition (params) {
    return Api.post(baseURL.seeHouseConfigService + apiURL.saveProcessDefinition, params)
  },
  // 获取当前流程设置
  queryProcessSet(params) {
    return Api.get(baseURL.seeHouseConfigService + '/processSet/queryProcessSet/'+ params);
  },
  // 更新当前流程设置
  updateProcessSet(params) {
    return Api.post(baseURL.seeHouseConfigService + '/processSet/updateProcessSet', params);
  },

  /**
   * @description  业务设置图片
   */
  // 获取业务设置图片
  getPicConfig (params) {
    return Api.get(baseURL.seeHouseConfigService + apiURL.getPicConfig, params)
  },
  // 修改业务设置图片
  updatePicConfig (params) {
    return Api.post(baseURL.seeHouseConfigService + apiURL.updatePicConfig, params)
  },
  // 恢复业务图片默认
  recoverPicDefault (params) {
    return Api.post(baseURL.seeHouseConfigService + apiURL.recoverPicDefault, params)
  },
  // 获取单个图片配置信息
  getSinglePicConfig (params) {
    return Api.get(baseURL.seeHouseConfigService + '/pic/getSinglePicConfig', params)
  },

  /**
   * @description  业务设置客户
   */
  // 获取业务设置客户配置
  getCustomerConfig (params) {
    return Api.get(baseURL.seeHouseConfigService + apiURL.getCustomerConfig, params)
  },
  // 修改业务设置客户配置
  updateCustomerConfig (params) {
    return Api.post(baseURL.seeHouseConfigService + apiURL.updateCustomerConfig, params)
  },
  // 恢复业务设置客户配置
  recoverCustomerDefault (params) {
    return Api.post(baseURL.seeHouseConfigService + apiURL.recoverCustomerDefault, params)
  },

  /**
   * @description  物品类目
   */
  // 恢复业务设置客户配置
  decorategoodsclass () {
    return Api.get(baseURL.seeHouseConfigService + apiURL.decorategoodsclass)
  },
  /**
   * @description  产品
   */
  // 获取产品列表
  queryProduct (params) {
    return Api.get(baseURL.seeHouseConfigService + '/product/list', params)
  },
  // 产品保存
  saveProduct (params) {
    return Api.post(baseURL.seeHouseConfigService + '/product/save', params)
  },
  // 产品修改
  updateProduct (params) {
    return Api.post(baseURL.seeHouseConfigService + '/product/update', params)
  },
  // 产品删除
  delProduct (params) {
    return Api.del(baseURL.seeHouseConfigService + '/product/delete', params)
  },
  // 查看业务设置-产品项配置信息
  queryProductSet (params) {
    return Api.get(baseURL.seeHouseConfigService + '/product/queryProductSet', params)
  },
  // 修改业务设置-产品项配置信息
  updateProductSet (params) {
    return Api.post(baseURL.seeHouseConfigService + '/product/updateProductSet', params)
  },
  // 修改首页显示
  updateProductHomepage (params) {
    return Api.post(baseURL.seeHouseConfigService + '/product/updateProductHomepage', params)
  },
  getCfgBuildingList (params) {
    return Api.get(`${baseURL}${apiURL.cfgBuildingList}`, params)
  },
  // 保存企业logo
  saveCompanyLogo(params) {
    return Api.post(baseURL.seeHouseConfigService + '/logo/editCompanyLogo', params);
  },
  // 获取企业logo
  getCompanyLogo(params) {
    return Api.get(baseURL.seeHouseConfigService + '/logo/getCompanyLogo', params);
  },
  //* ********************权限设置接口开始******************************//
  getCfgPageAuth (params) {
    return Api.get(`${baseURL}${apiURL.cfgPageAuth}`, params)
  },
  getCfgObjectDataAuthList (params) {
    return Api.get(`${baseURL}${apiURL.cfgObjectDataAuthList}`, params)
  },
  getCfgObjectDataAuthSave (params) {
    return Api.post(`${baseURL}${apiURL.cfgObjectDataAuthSave}`, params)
  },
  queryUserListByRightCode (params) {
    return Api.get(`${window.g.ApiUrl.bizSystemService}${apiURL.queryUserListByRightCode}`, params)
  }
  //* ********************权限设置接口结束******************************//
}
