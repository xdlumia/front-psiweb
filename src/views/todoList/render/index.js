/*
 * @Author: 高大鹏
 * @Date: 2019-11-12 15:16:48
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-14 13:46:22
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
    children: sales,
    processNum: 0
  },
  {
    label: '采购',
    key: '',
    children: purchase,
    processNum: 0
  },
  {
    label: '库房',
    key: '',
    children: storeroom,
    processNum: 0
  },
  {
    label: '财务',
    key: '',
    children: finance,
    processNum: 0
  }
]

export default list
