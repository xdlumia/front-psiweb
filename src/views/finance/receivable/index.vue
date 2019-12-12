/*
 * @Author: 赵伦
 * @Date: 2019-11-04 13:36:20
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-12 15:55:22
 * @Description: 应收账单
*/
<template>
  <FinanceTodayPayable
    :button="button"
    :pageConfig="pageConfig"
    :params="Object.assign({ page: 1, limit: 15,billType:0 },params)"
    @selection-change="selectionChange"
    :filterOptions="filterOptions"
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
      },
      // prettier-ignore
      filterOptions:[
        { label: '账单编号', prop: 'billCode', default: true },
        { label: '关联单据编号', prop: 'busCode', default: true },
        { label: '账单状态', prop: 'settleStatus', default: true, type:'select', options:[
          {label:'全部',value:'',},
          {label:'未结清',value:'0',},
          {label:'部分结清',value:'1',},
          {label:'已结清',value:'2',},
          {label:'已关闭',value:'3',},
        ] },
        { label: '逾期状态', prop: 'overState', default: true, type:'select', options:[
          {label:'全部',value:'',},
          {label:'未逾期',value:0},
          {label:'已逾期',value:1},
        ] },
        { label: '对方名称', prop: 'accountName', default: true },
        { label: '费用类型', prop: 'feeTypeCode', default: true, type:'select', options:[] },
        { label: '费用明细', prop: 'feeDetailCode', default: true, type:'select', options:[] },
        { label: '预应收', prop: 'PredictAmount', type: 'numberRange', default: true },
        { label: '应收', prop: 'Amount', type: 'numberRange', default: true },
        { label: '实收', prop: 'FactAmount', type: 'numberRange', default: true },
        { label: '应收日期', prop: 'PayEndDate', type: 'dateRange', int: true, default: true },
        { label: '创建部门', prop: 'deptTotalCode', type: 'dept' },
        { label: '生成日期', prop: 'CreateTime', type: 'dateRange' },
        { label: '创建人', prop: 'creator', type: 'employee' },
      ]
    };
  },
  methods: {
    selectionChange(val) {
      this.$emit('selection-change', val);
    }
  }
};
</script>