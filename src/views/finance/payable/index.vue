/*
 * @Author: 赵伦
 * @Date: 2019-11-04 13:36:20
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-25 09:08:28
 * @Description: 应付账单
*/
<template>
  <FinanceTodayPayable :button="button" :pageConfig="pageConfig" :params="params" />
</template>
<script>
export default {
  props: {
    // 是否显示按钮
    button: {
      type: Boolean,
      default: true
    },
    // 在当做组件引用的时候替换的参数
    params: {
      type: Object,
      default: () => ({ page: 1, limit: 15,billType:1 })
    }
  },
  data() {
    return {
      pageConfig: {
        title: '应付账单',
        busType: '52',
        type: 1,
        api: {
          list: 'seePsiFinanceService.paymentbillList',
          export: 'seePsiFinanceService.paymentbillExport',
          detail: 'seePsiFinanceService.paymentbillGetInfoByCode',
          update: 'seePsiFinanceService.paymentbillUpdate',
          lateFee: 'seePsiFinanceService.paymentbillChargeLateFee',
          delIncoming: 'seePsiFinanceService.paymentbillDelRoutedMatching',
          addIncoming: 'seePsiFinanceService.paymentbillInsertRoutedMatching',
          matchIncoming: 'seePsiFinanceService.paymentbillRoutedMatching'
        },
        show: []
      }
    };
  }
};
</script>