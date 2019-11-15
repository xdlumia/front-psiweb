/*
 * @Author: 高大鹏
 * @Date: 2019-11-12 15:20:17
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-15 10:19:51
 * @Description: 销售
 */

const sales = [
  {
    label: '待审批报价单',
    key: '',
    component: 'SalesQuote',
    authorityCode: '',
    processNum: 0,
    show: true
  },
  {
    label: '待审批销售出库单',
    key: '',
    component: 'SalesOutLibrary',
    authorityCode: '',
    processNum: 0,
    show: true
  },
  {
    label: '待审批销售出库单采购时间',
    key: '',
    component: '',
    authorityCode: '',
    processNum: 0,
    show: false
  },
  {
    label: '待审批销售退货单',
    key: '',
    component: 'SalesReturn',
    authorityCode: '',
    processNum: 0,
    show: true
  },
  {
    label: '待审批销售换货单',
    key: '',
    component: 'SalesExchange',
    authorityCode: '',
    processNum: 0,
    show: true
  },
  {
    label: '待审批账单调整单',
    key: '',
    component: 'SalesAdjust',
    authorityCode: '',
    processNum: 0,
    show: true
  },
  {
    label: '待审批费用分摊',
    key: '',
    component: 'SalesApportion',
    authorityCode: '',
    processNum: 0,
    show: true
  },
  {
    label: '销售调价单',
    key: 'XSTJD-001',
    component: 'SalesAdjustPrice',
    authorityCode: '',
    processNum: 0,
    show: true
  }
]

export default sales
