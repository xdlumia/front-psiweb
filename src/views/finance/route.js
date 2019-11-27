/*
 * @author: 王晓冬
 * @Date: 2019-10-28 10:29:53
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-26 19:03:10
 * @Description: 销售模块路由
 */

const indexFiles = require.context(`./`, true, /index\.vue$/)// 如果要引入其他文件，可以去掉index，或者加|
let routeObj = {
  addFee: '新增费用单',
  billing: '待开票',
  fee: '费用单',
  income: '收入流水',
  invoice: '发票库',
  outlay: '支出流水',
  borrow: '借款单',
  payment: '付款单',
  payable: '应付账单',
  quote: '发票管理',
  receipt: '待收票',
  receivable: '应收账单',
  todayPayable: '今日应付',
}

let routes = []
for (let key in routeObj) {
  routes.push({
    //path: 'finance/quote'
    path: `/finance/${key}`,
    component: indexFiles(`./${key}/index.vue`).default,
    meta: {
      parent: '财务',
      title: routeObj[key]
    }
  })
}
export default routes