/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-21 09:09:11
 * @Description: 付款单
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <tableView
      :filterOptions="filterOptions"
      :params="params"
      :selection="true"
      api="seePsiFinanceService.paybillList"
      busType="50"
      exportApi="seePsiFinanceService.paybillExport"
      title="付款单"
    >
      <template slot="button">
        <el-button @click="orderBuyingDetailRecVisible=true" size="mini" type="primary">批量付款申请</el-button>
      </template>
      <template slot-scope="{column,row,value,prop}">
        <span v-if="prop=='purchaseApplyCode'">
          <el-link :underline="false" @click="showDetail=true,currentCode=value" class="f12" type="primary">{{value}}</el-link>
        </span>
        <span v-else-if="prop=='feeDetailCode'">
          <span>{{value|dictionary('ZD_DY_LX')}}</span>
        </span>
        <span v-else-if="prop=='feeTypeCode'">
          <span>{{value|dictionary('ZD_DY_LX')}}</span>
        </span>
        <span v-else-if="prop=='quotationCode'">
          <el-link :underline="false" @click="showQuotationDetail=true,currentQuotationCode=value" class="f12" type="primary">{{value}}</el-link>
        </span>
        <span v-else>{{value}}</span>
      </template>
    </tableView>
  </div>
</template>
<script>
/**
 * 采购-请购单
 */
export default {
  components: {},
  props: {
    // 是否显示按钮
    button: {
      type: Boolean,
      default: true
    },
    // 在当做组件引用的时候替换的参数
    params: {
      type: Object,
      default: () => ({ page: 1, limit: 15 })
    }
  },
  data() {
    return {
      status: [],
      showEdit: false,
      showDetail: false,
      addBorrowInVisible: false,
      orderBuyingDetailRecVisible: false,
      currentCode: '',
      showQuotationDetail: false, // 打开报价单详情
      currentQuotationCode: '', // 报价单编号
      stateText: {
        // 单据状态0待完成 1部分完成 2完成3终止
        0: '待完成',
        1: '部分完成',
        2: '完成',
        3: '终止'
      },
      filterOptions: [
        { label: '筛选类型', prop: 'searchType' },
        { label: '账单编号', prop: 'billCode' },
        { label: '账单类型（0收款/1付款）', prop: 'billType' },
        { label: '结清状态', prop: 'settleStatus' },
        { label: '逾期状态', prop: 'overSate' },
        { label: '对方名称', prop: 'accountName' },
        { label: '费用类型', prop: 'feeTypeCode' },
        { label: '费用详情', prop: 'feeDetailCode' },
        {
          label: '最小预付/收金额',
          prop: 'PredictAmount',
          type: 'numberRange'
        },
        { label: '最小应付/收金额', prop: 'Amount', type: 'numberRange' },
        { label: '最小实收/付金额', prop: 'FactAmount', type: 'numberRange' },
        {
          label: '最小应收/付日期',
          prop: 'PayEndDate',
          type: 'numberRange',
          int: true
        },
        { label: '公司结算账户id', prop: 'companySettlementId' },
        { label: '客户id', prop: 'clientId' },
        { label: '客户类型(供应商/客户)', prop: 'clientType' },
        { label: '来源', prop: 'source' },
        { label: '业务编号', prop: 'busCode' },
        { label: '业务单据状态', prop: 'busState' },
        { label: '部门code', prop: 'deptTotalCode', type: 'dept' },
        { label: '起始创建时间', prop: 'CreateTime', type: 'dateRange' },
        { label: '创建人', prop: 'creator', type: 'employee' },
        { label: '状态', prop: 'state' }
      ]
    };
  },
  mounted() {},
  methods: {
    logData(e) {
      console.log(e);
    },
    reload() {
      this.$refs.tableView.reload();
    }
  }
};
</script>
<style lang="scss" scoped>
.buying-requisition-page {
}
</style>
