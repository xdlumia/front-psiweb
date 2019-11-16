/*
 * @Author: 高大鹏
 * @Date: 2019-11-12 15:20:37
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-15 11:54:36
 * @Description: description
 */
const purchase = [
  {
    label: '待采购请购单',
    key: '',
    component: 'OrderBuying',
    authorityCode: '',
    processNum: 0,
    show: false
  },
  {
    label: '待审批备货单',
    key: 'psi_purchase_stock_01',
    component: 'OrderPrepare',
    authorityCode: 'psi_purchase_stock_01',
    processNum: 0,
    show: true
  },
  {
    label: '待发货直发单',
    key: '',
    component: 'OrderDirect',
    authorityCode: '',
    processNum: 0,
    show: false
  },
  {
    label: '待审批采购入库单',
    key: ' psi_purchase_putin_01',
    component: 'OrderStorage',
    authorityCode: ' psi_purchase_putin_01',
    processNum: 0,
    show: true
  },
  {
    label: '待审批采购退货单',
    key: ' psi_purchase_alteration_01',
    component: 'OrderReject',
    authorityCode: 'psi_purchase_alteration_01',
    processNum: 0,
    show: true
  },
  {
    label: '采购调价单',
    key: 'psi_purchase_adjust_pric_01',
    component: 'OrderPrice',
    authorityCode: 'psi_purchase_adjust_pric_01',
    processNum: 0,
    show: true
  }
]

export default purchase
