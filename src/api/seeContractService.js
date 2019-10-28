/**
 * @author yanchao
 * @description  see-bill-service 的url
 * @date 2018/7/30
 * @host 8120
 */

import { Api } from 'see-web-basic'
const baseURL = window.g.ApiUrl

const apiURL = {
  // 获取合同模板列表
  getTemplateList: '/template/list/',
  // 获取合同模板信息
  getTemplateInfo: '/template/info/',
  // 获取合同模板类型+列表
  getTemplatecategoryList: '/templatecategory/list',
  // 保存模板类别
  saveTemplatecategory: '/templatecategory/save',
  // 删除模板类别
  delTemplatecategory: '/templatecategory/delete',

  /**
   * @description  合同模板管理
   */

  // 保存新建模板
  saveTemplate: '/template/save',
  // 保存新建模板
  updateTemplate: '/template/update',
  // 删除模板
  delTemplate: '/template/delete',
  // 根据合同类型获取表单列表
  getFormList: '/form/list/',

  /**
   * @description  字段管理
   */
  deleteFormFields: '/formfields/deleteFormFields',
  insertFormFields: '/formfields/saveFormFields',
  queryFormFields: '/formfields/queryFieldsTypeList'

}

export default {

  /**
   * @description  合同管理已成交
   */
  // 获取已成交合同列表
  getContractList(params) {
    return Api.get(baseURL.seeContractService + '/ccontract/list', params)
  },
  filter(params) {
    return Api.get(baseURL.seeContractService + '/ccontract/filter', params)
  },
  // 获取合同详细信息
  getContractInfo(params) {
    return Api.get(baseURL.seeContractService + '/ccontract/info/' + params)
  },
  // 删除合同
  delContract(params) {
    return Api.del(baseURL.seeContractService + '/ccontract/delete', params)
  },
  // 保存合同
  saveContract(params) {
    return Api.del(baseURL.seeContractService + '/ccontract/save', params)
  },
  // 更新合同
  updateContract(params) {
    return Api.del(baseURL.seeContractService + '/ccontract/update', params)
  },

  /**
   * @description  合同管理未成交
   */
  // 获取未成交合同列表
  getContracttempList(params) {
    return Api.get(baseURL.seeContractService + '/ccontracttemp/list', params)
  },
  // 获取合同详细信息
  getContracttempInfo(params) {
    return Api.get(baseURL.seeContractService + '/ccontracttemp/info/' + params)
  },
  // 删除合同
  delContracttemp(params) {
    return Api.del(baseURL.seeContractService + '/ccontracttemp/delete', params)
  },
  // 保存合同
  saveContracttemp(params) {
    return Api.del(baseURL.seeContractService + '/ccontracttemp/save', params)
  },
  // 更新合同
  updateContracttemp(params) {
    return Api.del(baseURL.seeContractService + '/ccontracttemp/update', params)
  },

  /**
   * @description  合同字段管理
   */

  getFormfields(params) {
    return Api.get(baseURL.seeContractService + '/formfields/list/' + params)
  },

  /**
   * @description  合同模板分类管理
   */

  // 获取合同模板列表
  getTemplateList(params) {
    return Api.get(baseURL.seeContractService + apiURL.getTemplateList + params)
  },
  // 获取合同模板列表详情
  getTemplateInfo(params) {
    return Api.get(baseURL.seeContractService + apiURL.getTemplateInfo + params)
  },
  // 获取合同模板分类+列表
  getTemplatecategoryList(params) {
    return Api.get(baseURL.seeContractService + apiURL.getTemplatecategoryList, params)
  },
  // 保存模板类别
  saveTemplatecategory(params) {
    return Api.post(baseURL.seeContractService + apiURL.saveTemplatecategory, params)
  },
  // 删除模板类别
  delTemplatecategory(params) {
    return Api.del(baseURL.seeContractService + apiURL.delTemplatecategory, params)
  },

  /**
   * @description  合同模板管理
   */
  // 保存模板
  saveTemplate(params) {
    return Api.post(baseURL.seeContractService + apiURL.saveTemplate, params)
  },
  // 修改模板
  updateTemplate(params) {
    return Api.post(baseURL.seeContractService + apiURL.updateTemplate, params)
  },
  // 删除模板
  delTemplate(params) {
    return Api.del(baseURL.seeContractService + apiURL.delTemplate, params)
  },
  // 获取表单列表
  getFormList(params) {
    return Api.get(baseURL.seeContractService + apiURL.getFormList + params)
  },
  // 根据合同编号查询合同catract_content字段
  queryContractContentByCode(params) {
    return Api.get(baseURL.seeContractService + '/ccontract/queryContractContentByCode', params)
  },
  // 租住合同详情查询
  queryRentContractContentByCode(params) {
    return Api.get(baseURL.seeContractService + '/ccontract/queryRentContractContentByCode', params)
  },
  /**
   * @description  字段管理
   */
  deleteFormFields(params) {
    return Api.del(baseURL.seeContractService + apiURL.deleteFormFields, params)
  },
  insertFormFields(params) {
    return Api.post(baseURL.seeContractService + apiURL.insertFormFields, params)
  },
  queryFormFields(params) {
    return Api.get(baseURL.seeContractService + apiURL.queryFormFields, params)
  },
  /**
   * @description  获取表单列表
   */
  getCatagoryCodeForm(params) {
    return Api.get(baseURL.seeContractService + '/form/queryCatagoryCodeForm', params)
  },
  // 判断当前合同是否续约
  getContractExtension(params) {
    return Api.get(baseURL.seeContractService + '/ccontracttemp/queryContractExtension', params)
  }

}
