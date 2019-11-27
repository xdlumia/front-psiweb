/*
 * @Author: 高大鹏
 * @Date: 2019-11-12 15:20:17
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-25 16:10:25
 * @Description: 销售
 */

const sales = [
  {
    label: '待审批报价单',
    key: 'psi_sales_quotation_01',
    component: 'SalesQuote',
    authorityCode: 'psi_sales_quotation_01',
    processNum: 0,
    show: true
  },
  {
    label: '待审批销售出库单',
    key: 'psi_sales_shipment_01',
    component: 'SalesOutLibrary',
    authorityCode: 'psi_sales_shipment_01',
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
    key: 'psi_purchase_alteration',
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
    key: 'psi_adjustPrice_1003',
    component: 'SalesAdjustPrice',
    authorityCode: 'psi_adjustPrice_1003',
    processNum: 0,
    show: true
  }
]

export default sales
