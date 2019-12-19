/*
 * @Author: 高大鹏
 * @Date: 2019-11-22 16:40:26
 * @LastEditors  : 赵伦
 * @LastEditTime : 2019-12-19 14:26:56
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
  },
  {
    path: '/report/profit', // 提成报表
    name: 'profit',
    component: () => import('./profit'),
    meta: {
      parent: '报表',
      title: '利润分析报表'
    }
  }
]
