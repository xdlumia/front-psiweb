/*
 * @Author: 高大鹏
 * @Date: 2019-11-12 15:16:48
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-12 16:26:00
 * @Description: description
 *
 */
import sales from './sales'
import finance from './finance'
import storeroom from './storeroom'
import purchase from './purchase'

const list = [
  {
    label: '销售',
    key: '',
    children: sales
  },
  {
    label: '采购',
    key: '',
    children: purchase
  },
  {
    label: '库房',
    key: '',
    children: storeroom
  },
  {
    label: '财务',
    key: '',
    children: finance
  }
]

export default list
