/**
 * @author 吴森
 * @description resourceService的url
 * @date 2018/7/7
 * @host 8013
 */

import {Api} from 'see-web-basic'
let baseURL = window.g.ApiUrl


export default {
   /**
   * @description 数据权限 数据源
   */
  getDataSourceList (params) {
    return Api.get(baseURL.resourceService + '/dataauthPageDataSource/list', params)
  },
  getDataSourcePageList(params) {
    return Api.get(baseURL.resourceService + '/dataauthPageDataSource/page', params)
  },


   /**
   * @description 数据权限 字段明细
   */

  //获取数据权限字段源列表
  getAuthFieldList (params) {
    return Api.get(baseURL.resourceService + '/dataauthField/list', params)
  },
  //数据源权限字段分页列表
  getAuthFieldPageList(params) {
    return Api.get(baseURL.resourceService + '/dataauthField/page', params)
  },

  /**
   * @desc 数据权限 角色管理 默认角色
   */

  //获取角色列表
  getDefaultRoleList(params) {
    return Api.get(baseURL.resourceService + '/rmdefaultrole/defaultRoleList', params)
  },

  //根据公司code获取默认角色
  getCompanyDefaultRole(params) {
    return Api.get(baseURL.resourceService + '/rmdefaultrole/initDefaultRole', params)
  },
}
