/*
 * @Author: 高大鹏
 * @Date: 2019-11-12 15:21:10
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-15 10:36:55
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
    key: '',
    component: 'FinanceFee',
    authorityCode: '',
    processNum: 0,
    show: true
  }
]
export default finance
