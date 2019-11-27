/*
 * @Author: 高大鹏
 * @Date: 2019-11-12 15:21:10
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-27 11:17:45
 * @Description: 财务
 */
const finance = [
  {
    label: '待开票审批',
    key: 'psi_billing',
    component: 'FinanceBilling',
    authorityCode: 'psi_billing',
    processNum: 0,
    show: true
  },
  {
    label: '待收票审批',
    key: 'psi_receipt',
    component: 'FinanceReceipt',
    authorityCode: 'psi_receipt',
    processNum: 0,
    show: true
  },
  {
    label: '费用单审批',
    key: 'psi_finance_fee',
    component: 'FinanceFee',
    authorityCode: 'psi_finance_fee',
    processNum: 0,
    show: true
  },
  {
    label: '付款单审批',
    key: 'psi_payment',
    component: 'FinancePayment',
    authorityCode: 'psi_payment',
    processNum: 0,
    show: true
  }
]
export default finance
