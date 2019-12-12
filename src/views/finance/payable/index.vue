/*
 * @Author: 赵伦
 * @Date: 2019-11-04 13:36:20
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-12 15:54:16
 * @Description: 应付账单
*/
<template>
  <FinanceTodayPayable
    :button="button"
    :filterOptions="filterOptions"
    :pageConfig="pageConfig"
    :params="Object.assign({ page: 1, limit: 15,billType:1 },params)"
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
      default: () => ({ page: 1, limit: 15, billType: 1 })
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
        show: [],
        func: {
          lateFee: 'psi_payable_01',
          operateRec: 'psi_payable_02',
          addIncoming: '',
          delIncoming: '',
          matchIncoming: '',
          export: 'psi_payable_03',
          addInvoice: 'psi_payable_04',
          edit: 'psi_payable_05'
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
        { label: '预应付', prop: 'PredictAmount', type: 'numberRange', default: true },
        { label: '应付', prop: 'Amount', type: 'numberRange', default: true },
        { label: '实付', prop: 'FactAmount', type: 'numberRange', default: true },
        { label: '付款日期', prop: 'PayEndDate', type: 'dateRange', int: true, default: true },
        { label: '创建部门', prop: 'deptTotalCode', type: 'dept' },
        { label: '生成日期', prop: 'CreateTime', type: 'dateRange' },
        { label: '创建人', prop: 'creator', type: 'employee' },
      ]
    };
  }
};
</script>