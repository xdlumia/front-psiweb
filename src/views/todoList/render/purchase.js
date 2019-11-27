/*
 * @Author: 高大鹏
 * @Date: 2019-11-12 15:20:37
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-27 11:17:31
 * @Description: description
 */
const purchase = [
  {
    label: '备货单审批',
    key: 'psi_purchase_stock',
    component: 'OrderPrepare',
    authorityCode: 'psi_purchase_stock',
    processNum: 0,
    show: true
  },
  {
    label: '入库单审批',
    key: 'psi_purchase_storage_01',
    component: 'OrderStorage',
    authorityCode: 'psi_purchase_storage_01',
    processNum: 0,
    show: true
  },
  {
    label: '退货单审批',
    key: 'psi_purchase_reject_01',
    component: 'OrderReject',
    authorityCode: 'psi_purchase_reject_01',
    processNum: 0,
    show: true
  },
  {
    label: '采购调价单审批',
    key: 'psi_purchase_adjust_pric_01',
    component: 'OrderPrice',
    authorityCode: 'psi_purchase_adjust_pric_01',
    processNum: 0,
    show: true
  },
  {
    label: '拆卸单审批',
    key: 'psi_purchase_unpack_01',
    component: 'OrderUnpack',
    authorityCode: 'psi_purchase_unpack_01',
    processNum: 0,
    show: true
  },
  {
    label: '借入借出单审批',
    key: 'psi_purchase_borrow_01',
    component: 'OrderBorrow',
    authorityCode: 'psi_purchase_borrow_01',
    processNum: 0,
    show: true
  },
  {
    label: '换货单审批',
    key: 'psi_wms_swap_01',
    component: 'OrderExchange',
    authorityCode: 'psi_wms_swap_01',
    processNum: 0,
    show: true
  }
]

export default purchase
