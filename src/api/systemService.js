/**
 * @author 赵亚森
 * @description resourceService的url
 * @date 2018/7/10
 * @host 9011
 */

import { Api } from 'see-web-basic'
let baseURL = window.g.ApiUrl

export default {
  /**
     * @description 用户管理
     */
  // d登录
  // login(params) {
  //   return Api.get(baseURL.systemService + '/login/login', params)
  // },
  login (params) {
    return Api.post(baseURL.systemService + '/login/businessLogin', params)
  },
  // 获取用户列表
  getAdminList (params) {
    return Api.get(baseURL.systemService + '/admin/list', params)
  },
  // 获取用户详情
  getAdminInfo (params) {
    return Api.get(baseURL.systemService + '/admin/info/' + params)
  },
  // 更新用户
  updateAdmin (params) {
    return Api.post(baseURL.systemService + '/admin/update', params)
  },
  // 保存用户
  saveAdmin (params) {
    return Api.post(baseURL.systemService + '/admin/save', params)
  },

  /**
     * @description 公司管理
     */
  //  获取公司列表code
  getCompanyListCode (params) {
    return Api.get(baseURL.systemService + '/company/getAllCompanyCode', params)
  },
  // 获取公司列表
  getCompanyList (params) {
    return Api.get(baseURL.systemService + '/company/list', params)
  },
  // 获取公司详情
  getCompanyInfo (params) {
    return Api.get(baseURL.systemService + '/admin/info' + params)
  },
  // 获取公司类型
  getCompanyType (params) {
    return Api.get(baseURL.systemService + '/companytype/list', params)
  },
  // 获取公司数据源
  getSource (params) {
    return Api.get(baseURL.systemService + '/datasource/all', params)
  },
  // 获取公司列表
  getInitCompanyList (params) {
    return Api.get(baseURL.systemService + '/company/queryAllInitCompanyList', params)
  },
  // 更新公司
  updateCompany (params) {
    return Api.post(baseURL.systemService + '/company/update', params)
  },
  // 保存公司
  saveCompany (params) {
    return Api.post(baseURL.systemService + '/company/save', params)
  },
  // 删除公司
  delCompany (params) {
    return Api.del(baseURL.systemService + '/company/delete', params)
  },

  /**
     * @description 数据源管理
     */
  // 获取数据源列表
  getDatasource (params) {
    return Api.get(baseURL.systemService + '/datasource/list', params)
  },
  // 更新数据源
  updateDatasource (params) {
    return Api.post(baseURL.systemService + '/datasource/update', params)
  },
  // 保存数据源
  saveDatasource (params) {
    return Api.post(baseURL.systemService + '/datasource/save', params)
  },
  // 删除公司
  delDatasource (params) {
    return Api.del(baseURL.systemService + '/datasource/delete', params)
  },

  /**
     * @description 版本更新
     */
  // 获取更新列表
  getVersionList (params) {
    return Api.get(baseURL.systemService + '/versionupdating/list', params)
  },
  // 更新版本内容
  updateVersion (params) {
    return Api.post(baseURL.systemService + '/versionupdating/update', params)
  },
  // 保存版本内容
  saveVersion (params) {
    return Api.post(baseURL.systemService + '/versionupdating/save', params)
  },
  // 删除版本
  delVersion (params) {
    return Api.del(baseURL.systemService + '/versionupdating/delete', params)
  }
}
