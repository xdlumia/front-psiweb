/*
 * @author: 王晓冬
 * @Date: 2019-10-28 10:29:53
 * @LastEditors  : 赵伦
 * @LastEditTime : 2019-12-24 11:15:21
 * @Description: 销售模块路由
 */
const Quote = () => import('@/views/sales/quote') // 报价单
const OutLibrary = () => import('@/views/sales/outLibrary') // 销售出库单
const Return = () => import('@/views/sales/return') // 销售退货单
const Exchange = () => import('@/views/sales/exchange') // 销售换货单
const Client = () => import('@/views/sales/client') // 客户
const Apportion = () => import('@/views/sales/apportion') // 销售费用分摊单
const Adjust = () => import('@/views/sales/adjust') // 账单调整单
const AdjustPrice = () => import('@/views/sales/adjustPrice') // 销售调价单

let routeObj = {
  Quote: '报价单',
  OutLibrary: "销售出库单",
  Return: '销售退货单',
  Exchange: '销售换货单',
  Client: '客户',
  Apportion: '销售费用分摊单',
  Adjust: '账单调整单',
  AdjustPrice: '销售调价单',
}

let routes = []
for (let key in routeObj) {
  routes.push({
    //path: 'sales/quote'
    path: `/sales/${key.toLowerCase()}`,
    component: eval(key),
    meta: {
      parent: '销售',
      title: routeObj[key]
    }
  })
}
export default routes