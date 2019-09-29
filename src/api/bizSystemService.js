
/**
 * @author 吴森
 * @description bizSystemService的url
 * @date 2018/7/7
 * @host 8011
 */
import { Api } from 'see-web-basic'

// import { baseURL } from '../../static/IPconfig'
var baseURL = window.g.ApiUrl
var apiURL = {

  /**
   * @description  角色
   */

  /**
   * @description  员工
   */
  // 获取员工树列表
  fetchEmployeeList: '/rmemployee/employeeList',
  // 获取员工树列表
  getEmployeeList: '/rmemployee/list',
  // 获取员工信息
  getEmployeeInfo: '/rmemployee/info/',
  // 删除员工
  delEmployee: '/rmemployee/delete',
  // 新增员工
  addEmployee: '/rmemployee/save',
  // 同步员工
  syncEmployee: '/rmemployee/synchronization',
  // 更新员工
  updateEmployee: '/rmemployee/update',
  // 恢复员工
  employeeRecover: '/rmemployee/recover',
  // 解锁
  unlockuser: '/rmemployee/unlockuser',
  // 锁定
  lockuser: '/rmemployee/lockuser',
  // 修改密码
  updatePassword: '/rmemployee/updatePassword',

  /**
  * @description  角色
  */

  // 获取授权角色列表
  getAuthRoleList: '/rmrole/sourceRoleList',
  // 删除角色
  delRole: '/rmrole/delete',
  // 新增角色
  addRole: '/rmrole/save',
  // 更新角色
  updateRole: '/rmrole/update',
  // 给角色授权
  syncRole: '/rmrole/updateRoleResource'
}

export default {
  /**
  * @description  用户
  */
  // 获取用户详情
  getUserDetail (params) {
    return Api.get(baseURL.bizSystemService + '/rmuserrole/getUserDetail', params)
  },

  // 获取用户权限
  getUserAuth (params) {
    return Api.get(baseURL.bizSystemService + '/rmuserrole/list/' + params)
  },

  /**
  * @description  部门
  */
  // 获取部门树列表
  getDeptList (params) {
    return Api.get(baseURL.bizSystemService + '/rmdept/treeList', params)
  },
  // 获取某部门信息
  getDeptInfo (params) {
    return Api.get(baseURL.bizSystemService + '/rmdept/info/' + params)
  },
  // 删除部门
  delDept (params) {
    return Api.del(baseURL.bizSystemService + '/rmdept/delete', params)
  },
  // 新增部门
  addDept (params) {
    return Api.post(baseURL.bizSystemService + '/rmdept/save', params)
  },
  // 更新部门
  updateDept (params) {
    return Api.post(baseURL.bizSystemService + '/rmdept/update', params)
  },
  // 获取部门下的人员
  getEmployeePop (params) {
    return Api.get(baseURL.bizSystemService + '/rmdept/getEmployeesByDeptId', params)
  },
  // 获取当前用户可操作的系统/平台列表
  getsyslist (params) {
    return Api.get(baseURL.bizSystemService + '/rmuserrole/syslist', params)
  },
  getRoleType (params) {
    return Api.get(baseURL.bizSystemService + '/rmrole/roleTypeList', params)
  },

  /**
  * @description  员工
  */
  // 获取部门下的员工
  getEmployeesUserByDeptId (params) {
    return Api.get(baseURL.bizSystemService + '/rmdept/getEmployeesUserByDeptId', params)
  },
  fetchEmployeeList (params) {
    return Api.get(baseURL.bizSystemService + apiURL.fetchEmployeeList, params)
  },
  getEmployeeList (params) {
    return Api.get(baseURL.bizSystemService + apiURL.getEmployeeList, params)
  },
  getEmployeeInfo (params) {
    return Api.get(baseURL.bizSystemService + apiURL.getEmployeeInfo + params)
  },
  delEmployee (params) {
    return Api.del(baseURL.bizSystemService + apiURL.delEmployee, params)
  },
  authEmployee (params) {
    return Api.post(baseURL.bizSystemService + '/rmemployee/newAuthorize', params)
  },
  addEmployee (params) {
    return Api.post(baseURL.bizSystemService + apiURL.addEmployee, params)
  },
  syncEmployee (params) {
    return Api.post(baseURL.bizSystemService + apiURL.syncEmployee, params)
  },
  updateEmployee (params) {
    return Api.post(baseURL.bizSystemService + apiURL.updateEmployee, params)
  },
  employeeRecover (params) {
    return Api.post(baseURL.bizSystemService + apiURL.employeeRecover + '?phone=' + params.phone)
  },
  unlockuser (params) {
    return Api.get(baseURL.bizSystemService + apiURL.unlockuser, params)
  },
  lockuser (params) {
    return Api.get(baseURL.bizSystemService + apiURL.lockuser, params)
  },
  updatePassword (params) {
    return Api.post(baseURL.bizSystemService + apiURL.updatePassword, params)
  },

  // 开放注册
  openRegistration (params) {
    return Api.post(baseURL.bizSystemService + '/rmemployee/openRegistration', params)
  },
  // 查询开放注册
  queryOpenRegistration (params) {
    return Api.get(baseURL.bizSystemService + '/rmemployee/queryOpenRegistration', params)
  },

  /**
  * @description  人员调动记录
  */
  // 保存人员调动记录
  saveTransfer (params) {
    return Api.post(baseURL.bizSystemService + '/rmemployeeransferrecord/save', params)
  },

  // 根据用户id获取人员调动记录
  getTransferLog (params) {
    return Api.get(baseURL.bizSystemService + '/rmemployeeransferrecord/list', params)
  },

  /**
  * @description  角色
  */
  // 获取角色列表
  getRoleList (params) {
    return Api.get(baseURL.bizSystemService + '/rmrole/list', params)
  },
  getAuthRoleList (params) {
    return Api.get(baseURL.bizSystemService + apiURL.getAuthRoleList, params)
  },
  delRole (params) {
    return Api.del(baseURL.bizSystemService + apiURL.delRole, params)
  },
  addRole (params) {
    return Api.post(baseURL.bizSystemService + apiURL.addRole, params)
  },
  updateRole (params) {
    return Api.post(baseURL.bizSystemService + apiURL.updateRole, params)
  },
  syncRole (params) {
    return Api.post(baseURL.bizSystemService + apiURL.syncRole, params)
  },

  /**
   * @description 角色授权数据权限
   */
  getInfoRmDataAuth (params) {
    return Api.get(baseURL.bizSystemService + '/rmdataauth/info', params)
  },
  saveRmDataAuth (params) {
    return Api.post(baseURL.bizSystemService + '/rmdataauth/save', params)
  },
  getAllEmployees (params) {
    return Api.get(baseURL.bizSystemService + '/rmemployee/getAllEmployees', params)
  },

  /**
   * @description 组织类型管理
   */
  // 组织类型树列表
  getOrganaList (params) {
    return Api.get(baseURL.bizSystemService + '/rmorgtype/orgTypeTreeList', params)
  },
  // 保存组织类型
  saveOrgType (params) {
    return Api.post(baseURL.bizSystemService + '/rmorgtype/save', params)
  },
  // 更新组织类型
  updateOrgType (params) {
    return Api.post(baseURL.bizSystemService + '/rmorgtype/update', params)
  },
  delOrgType (params) {
    return Api.del(baseURL.bizSystemService + '/rmorgtype/delete', params)
  },

  /**
   * 系统消息
   */
  // 定时任务获取未读消息数量
  getNotReadMsg: function getNotReadMsg (params) {
    return Api.get(baseURL.bizSystemService + '/message/getNotReadMsg', params)
  },
  // 查询消息列表
  getMsgList: function getMsgList (params) {
    return Api.get(baseURL.bizSystemService + '/message/list', params)
  },
  // 发送系统消息
  sendMsg: function sendMsg (params) {
    return Api.post(baseURL.bizSystemService + '/message/sendMsg', params)
  },
  // 读消息或者解决待办消息
  updateMsg: function updateMsg (params) {
    return Api.post(baseURL.bizSystemService + '/message/updateMsg', params)
  },

  // 获取服务器时间
  getServerTime (params) {
    return Api.get(baseURL.bizSystemService + '/serve/getServerTime')
  }

}
