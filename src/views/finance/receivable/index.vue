/*
 * @Author: 赵伦
 * @Date: 2019-11-04 13:36:20
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-10 13:38:27
 * @Description: 应收账单
*/
<template>
  <FinanceTodayPayable
    :button="button"
    :pageConfig="pageConfig"
    :params="Object.assign({ page: 1, limit: 15,billType:0 },params)"
    @selection-change="selectionChange"
  />
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
      default: () => ({ page: 1, limit: 15, billType: 0 })
    }
  },
  data() {
    return {
      pageConfig: {
        title: '应收账单',
        busType: '53',
        type: 0,
        api: {
          list: 'seePsiFinanceService.revenuebillList',
          export: 'seePsiFinanceService.revenuebillExport',
          detail: 'seePsiFinanceService.revenuebillGetInfoByCode',
          update: 'seePsiFinanceService.revenuebillUpdate',
          lateFee: 'seePsiFinanceService.revenuebillChargeLateFee',
          delIncoming: 'seePsiFinanceService.revenuebillDelRoutedMatching',
          addIncoming: 'seePsiFinanceService.revenuebillInsertRoutedMatching',
          matchIncoming: 'seePsiFinanceService.revenuebillRoutedMatching'
        },
        show: ['paybillLog'],
        func: {
          lateFee: 'psi_receivable_01',
          operateRec: 'psi_receivable_02',
          addIncoming: 'psi_receivable_04',
          delIncoming: 'psi_receivable_08',
          matchIncoming: 'psi_receivable_05',
          export: 'psi_receivable_03',
          addInvoice: 'psi_receivable_04',
          edit: 'psi_receivable_07'
        }
      }
    };
  },
  methods: {
    selectionChange(val) {
      this.$emit('selection-change', val);
    }
  }
};
</script>