/*
 * @Author: 高大鹏
 * @Date: 2019-11-22 16:40:26
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-22 16:41:37
 * @Description: description
 */
import commission from './commission'

export default [
  {
    path: '/report/commission', // 提成报表
    name: 'commission',
    component: commission,
    meta: {
      parent: '报表',
      title: '提成报表'
    }
  }
]
