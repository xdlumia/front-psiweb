/*
 * @Author: 高大鹏
 * @Date: 2019-11-12 15:21:10
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-20 19:00:50
 * @Description: 财务
 */
const finance = [
  {
    label: '待审批开票申请',
    key: '',
    component: 'FinanceBilling',
    authorityCode: '',
    processNum: 0,
    show: true
  },
  {
    label: '待审批收票申请',
    key: '',
    component: 'FinanceReceipt',
    authorityCode: '',
    processNum: 0,
    show: true
  },
  {
    label: '待审批费用单',
    key: 'psi_finance_cost_01',
    component: 'FinanceFee',
    authorityCode: 'psi_finance_cost_01',
    processNum: 0,
    show: true
  }
]
export default finance
