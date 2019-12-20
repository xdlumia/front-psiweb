/*
 * @Author: 高大鹏
 * @Date: 2019-11-12 15:20:17
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-12-20 14:59:30
 * @Description: 销售
 */

const sales = [
  {
    label: '报价单审批',
    key: 'psi_sales_quote_01',
    component: 'SalesQuote',
    authorityCode: 'psi_sales_quote_01',
    processNum: 0,
    show: true
  },
  {
    label: '销售出库单审批',
    key: 'psi_sales_outlibrary_01',
    component: 'SalesOutLibrary',
    authorityCode: 'psi_sales_outlibrary_01',
    processNum: 0,
    show: true
  },
  {
    label: '销售退货单审批',
    key: 'psi_sales_return_01',
    component: 'SalesReturn',
    authorityCode: 'psi_sales_return_01',
    processNum: 0,
    show: true
  },
  {
    label: '销售换货单审批',
    key: 'psi_sales_exchange_01',
    component: 'SalesExchange',
    authorityCode: 'psi_sales_exchange_01',
    processNum: 0,
    show: true
  },
  {
    label: '分摊单审批',
    key: 'psi_sales_apportion_01',
    component: 'SalesApportion',
    authorityCode: 'psi_sales_apportion_01',
    processNum: 0,
    show: true
  },
  {
    label: '销售调价单审批',
    key: 'psi_adjustPrice_1003',
    component: 'SalesAdjustPrice',
    authorityCode: 'psi_adjustPrice_1003',
    processNum: 0,
    show: true
  },
  {
    label: '账单调整单审批',
    key: 'psi_sales_adjust_01',
    component: 'SalesAdjust',
    authorityCode: 'psi_sales_adjust_01',
    processNum: 0,
    show: true
  },
  {
    label: '待审批销售出库单采购时间',
    key: 'psi_sales_data_02',
    component: 'SalesOutLibrary',
    authorityCode: '',
    processNum: 0,
    show: true,
    params: {
      state: 1
    }
  }
]

export default sales
