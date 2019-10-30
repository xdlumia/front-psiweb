/*
 * @Author: web.王晓冬
 * @Date: 2019-10-30 16:25:12
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-30 16:26:18
 * @Description: 每个模块首页全局引入解决无限调用自己递归的问题
 */

// 销售-报价单
import SalesQuote from "@/views/sales/quote";
// 销售-销售出库单
import SalesOutLibrary from "@/views/sales/outLibrary";

export default {
  install: (Vue) => {
    Vue.component('salesQuote', SalesQuote)
    Vue.component('salesOutLibrary', SalesOutLibrary)
  }
}