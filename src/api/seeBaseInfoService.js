/*
 * @Author: 高大鹏
 * @Date: 2019-10-30 19:45:33
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-02 15:03:17
 * @Description: description
 */
const MOCK_ADDRESS = '/mock/5db9778bbc54fc3da273f010/'
const IS_MOCK = false
export default {
  __mockAddress: MOCK_ADDRESS,
  

  /* =============公司设置表start=========== */
  // 删除
  commoncorporationDelete: {
    'url': '/commoncorporation/delete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 查看详细信息
  commoncorporationInfo: {
    'url': '/commoncorporation/info/{id}',
    'mock': IS_MOCK
  },

  // 获取列表
  commoncorporationList: {
    'url': '/commoncorporation/list',
    'mock': IS_MOCK
  },

  // 逻辑删除
  commoncorporationLogicDelete: {
    'url': '/commoncorporation/logicDelete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 保存
  commoncorporationSave: {
    'url': '/commoncorporation/save',
    'mock': IS_MOCK,
    'methods': 'post'
  },

  // 修改
  commoncorporationUpdate: {
    'url': '/commoncorporation/update',
    'mock': IS_MOCK,
    'methods': 'post'
  },
  /* =============公司设置表end=========== */

  /* =============公司账户设置表start=========== */
  // 删除
  commoncorporationaccountDelete: {
    'url': '/commoncorporationaccount/delete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 查看详细信息
  commoncorporationaccountInfo: {
    'url': '/commoncorporationaccount/info/{id}',
    'mock': IS_MOCK
  },

  // 获取列表
  commoncorporationaccountList: {
    'url': '/commoncorporationaccount/list',
    'mock': IS_MOCK
  },

  // 逻辑删除
  commoncorporationaccountLogicDelete: {
    'url': '/commoncorporationaccount/logicDelete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 保存
  commoncorporationaccountSave: {
    'url': '/commoncorporationaccount/save',
    'mock': IS_MOCK,
    'methods': 'post'
  },

  // 修改
  commoncorporationaccountUpdate: {
    'url': '/commoncorporationaccount/update',
    'mock': IS_MOCK,
    'methods': 'post'
  },
  /* =============公司账户设置表end=========== */

 
}
