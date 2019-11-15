/*
 * @Author: 高大鹏
 * @Date: 2019-11-12 15:20:37
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-15 10:30:08
 * @Description: description
 */
const purchase = [
  {
    label: '待采购请购单',
    key: '',
    component: 'OrderBuying',
    authorityCode: '',
    processNum: 0,
    show: true
  },
  {
    label: '待审批备货单',
    key: 'psi_purchase_stock',
    component: 'OrderPrepare',
    authorityCode: '',
    processNum: 0,
    show: true
  },
  {
    label: '待发货直发单',
    key: '',
    component: 'OrderDirect',
    authorityCode: '',
    processNum: 0,
    show: true
  },
  {
    label: '待审批采购入库单',
    key: '',
    component: 'OrderStorage',
    authorityCode: '',
    processNum: 0,
    show: true
  },
  {
    label: '待审批采购退货单',
    key: '',
    component: 'OrderReject',
    authorityCode: '',
    processNum: 0,
    show: true
  },
  {
    label: '采购调价单',
    key: 'CGTJD-001',
    component: 'OrderPrice',
    authorityCode: '',
    processNum: 0,
    show: true
  }
]

export default purchase
