/*
 * @author: 王晓冬
 * @Date: 2019-10-28 10:29:53
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-28 19:20:20
 * @Description: 采购模块路由
 */
const Quote = () => import('@/views/sales/quote') // 报价单
const OutLibrary = () => import('@/views/sales/outLibrary') // 销售出库单
const Return = () => import('@/views/sales/return') // 销售退货单
const Exchange = () => import('@/views/sales/exchange') // 销售换货单
const Client = () => import('@/views/sales/client') // 客户
const Apportion = () => import('@/views/sales/apportion') // 销售费用分摊单
const Adjust = () => import('@/views/sales/adjust') // 账单调整单
const AdjustPrice = () => import('@/views/sales/adjustPrice') // 销售调价单

let route = {
  Quote: '报价单',
  OutLibrary: "销售出库单",
  Return: '销售退货单',
  Exchange: '销售换货单',
  Client: '客户',
  Apportion: '销售费用分摊单',
  Adjust: '账单调整单',
  AdjustPrice: '销售调价单'
}

let routes = []
for (let key in route) {
  key.toLowerCase()
  routes.push({
    path: `/sales/${key.toLowerCase()}`,
    component: eval(key),
    meta: {
      parent: '销售',
      title: route[key]
    }
  })
}
export default routes
// export default [
//   {
//     path: 'sales/quote',
//     component: Quote,
//     meta: {
//       parent: '销售',
//       title: '报价单'
//     }
//   }, {
//     path: 'sales/outLibrary',
//     component: OutLibrary,
//     meta: {
//       parent: '销售',
//       title: '销售出库单'
//     }
//   }, {
//     path: 'sales/return',
//     component: Return,
//     meta: {
//       parent: '销售',
//       title: '销售退货单'
//     }
//   }, {
//     path: 'sales/exchange',
//     component: Exchange,
//     meta: {
//       parent: '销售',
//       title: '销售换货单'
//     }
//   }, {
//     path: 'sales/client',
//     component: Client,
//     meta: {
//       parent: '销售',
//       title: '客户'
//     }
//   }, {
//     path: 'sales/apportion',
//     component: Apportion,
//     meta: {
//       parent: '销售',
//       title: '销售费用分摊单'
//     }
//   }, {
//     path: 'sales/adjust',
//     component: Adjust,
//     meta: {
//       parent: '销售',
//       title: '账单调整单'
//     }
//   }, {
//     path: 'sales/adjustPrice',
//     component: AdjustPrice,
//     meta: {
//       parent: '销售',
//       title: '销售调价单'
//     }
//   }

// ]