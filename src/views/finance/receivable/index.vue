/*
 * @Author: 赵伦
 * @Date: 2019-11-04 13:36:20
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-21 17:27:53
 * @Description: 应收账单
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
      default: () => ({ page: 1, limit: 15, })
    }
  },
  data() {
    return {
      pageConfig: {
        title: '应收账单',
        busType: '53',
        type: 1,
        api: {
          list: 'seePsiFinanceService.revenuebillList',
          export: 'seePsiFinanceService.revenuebillExport',
          detail: 'seePsiFinanceService.revenuebillGetInfoByCode',
          update: 'seePsiFinanceService.revenuebillUpdate',
          lateFee: 'seePsiFinanceService.revenuebillChargeLateFee',
          delIncoming: 'seePsiFinanceService.revenuebillDelRoutedMatching'
        },
        show: ['paybillLog']
      }
    };
  }
};
</script>