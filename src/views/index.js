/*
 * @Author: web.王晓冬
 * @Date: 2019-10-30 16:25:12
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-13 14:38:55
 * @Description: 每个模块首页全局引入解决无限调用自己递归的问题
 */

/**
 * 销售begin
 */
// import salesQuote from "@/views/sales/quote"; //报价单
// import salesOutLibrary from "@/views/sales/outLibrary"; // 销售出库单
// import salesReturn from "@/views/sales/return"; // 销售退货单
// import salesExchange from "@/views/sales/exchange"; // 销售换货单
// import salesClient from "@/views/sales/client"; // 客户
// import salesApportion from "@/views/sales/apportion"; // 销售费用分摊单
// import salesAdjust from "@/views/sales/adjust"; // 账单调整单
// import salesAdjustPrice from "@/views/sales/adjustPrice"; // 销售调价单
/**
 * 销售end
 */

export default {
  install: (Vue) => {
    // Vue.component('salesQuote', salesQuote)
    // Vue.component('salesOutLibrary', salesOutLibrary)
    // Vue.component('SalesReturn', salesReturn)
    // Vue.component('salesExchange', salesExchange)
    // Vue.component('salesClient', salesClient)
    // Vue.component('salesApportion', salesApportion)
    // Vue.component('salesAdjust', salesAdjust)
    // Vue.component('salesAdjustPrice', salesAdjustPrice)


    // 采购 合同 start
    const indexFiles = require.context(`./`, true, /index\.vue$/) // 如果要引入其他文件，可以去掉index，或者加|
    const cmps = indexFiles.keys()
      // 找出 采购(order) 合同(contract) 下的index列表页，如果要引入其他模块，也可以在下面加
      .filter(a => a.match(/^\.\/(sales|finance|storage|order|contract)/))
      .map(item => {
        let cmpName = item.match(/([a-z]*)/gi)
          .filter(a => a).reverse()
          .splice(1).filter((a, b) => !(b == 0 && a == 'index')).reverse()
          .map(a => a[0].toUpperCase() + a.substr(1)).join('')
          .replace(/-[a-z]/g, a => a[1].toUpperCase());
        let file = indexFiles(item).default;
        Vue.component(cmpName, file);
        return [cmpName, file]
      }).reduce((data, [name, file]) => ({
        ...data,
        [name]: file,
      }), {})

    let props = {
      // 是否显示按钮
      button: {
        type: Boolean,
        default: true
      },
      // 在当做组件引用的时候替换的参数
      params: {
        type: Object,
        default: () => ({})
      },
    }
    // for (let key in cmps) {
    //   if (cmps[key].hasOwnProperty(props)) {
    //     cmps[key].props = { ...cmps[key].props, ...props }
    //   } else {
    //     cmps[key].props = props
    //   }
    // }
    if (process.env.NODE_ENV != 'production') {
      console.log(cmps)
    }
    // 采购 合同 end
  }
}