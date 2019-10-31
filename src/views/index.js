/*
 * @Author: web.王晓冬
 * @Date: 2019-10-30 16:25:12
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-31 19:26:54
 * @Description: 每个模块首页全局引入解决无限调用自己递归的问题
 */

/**
 * 销售begin
 */
import salesQuote from "@/views/sales/quote"; //报价单
import salesOutLibrary from "@/views/sales/outLibrary"; // 销售出库单
import salesReturn from "@/views/sales/outLibrary"; // 销售退货单
import salesExchange from "@/views/sales/exchange"; // 销售换货单
import salesClient from "@/views/sales/client"; // 客户
import salesApportion from "@/views/sales/apportion"; // 销售费用分摊单
import salesAdjust from "@/views/sales/adjust"; // 账单调整单
import salesAdjustPrice from "@/views/sales/adjustPrice"; // 销售调价单

export default {
  install: (Vue) => {
    Vue.component('salesQuote', salesQuote)
    Vue.component('salesOutLibrary', salesOutLibrary)
    Vue.component('SalesReturn', salesReturn)
    Vue.component('salesExchange', salesExchange)
    Vue.component('salesClient', salesClient)
    Vue.component('salesApportion', salesApportion)
    Vue.component('salesAdjust', salesAdjust)
    Vue.component('salesAdjustPrice', salesAdjustPrice)
  }
}