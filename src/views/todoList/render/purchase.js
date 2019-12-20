/*
 * @Author: 高大鹏
 * @Date: 2019-11-12 15:20:37
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-12-20 14:59:21
 * @Description: description
 */
const purchase = [
  {
    label: '待采购请购单',
    key: 'psi_purchase_data_01',
    component: 'OrderBuying',
    authorityCode: '',
    processNum: 0,
    show: true,
    params: {
      states: [0, 1]
    }
  },
  {
    label: '待发货直发单',
    key: 'psi_purchase_data_03',
    component: 'OrderDirect',
    authorityCode: '',
    processNum: 0,
    show: true,
    params: {
      states: [0, 1]
    }
  },
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
