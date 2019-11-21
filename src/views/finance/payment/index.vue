/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-21 11:40:03
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
      ref="tableView"
      title="付款单"
      v-loading="loading"
    >
      <template slot="button">
        <!-- 15.勾选付款单后，展示批量付款申请。新建、已驳回状态可点击批量提交付款申请。如勾选中包含了其他状态，则只提交新建、已驳回的即可。批量付款申请，不需弹出付款申请确认。 -->
        <el-button @click="multiPay" size="mini" title="新建、已驳回的付款单可批量申请" type="primary">批量付款申请</el-button>
      </template>
      <template slot-scope="{column,row,value,prop}">
        <span v-if="prop=='billCode'">
          <el-link :underline="false" @click="showDetail=true,currentCode=value" class="f12" type="primary">{{value}}</el-link>
        </span>
        <span v-else-if="['feeDetailCode','feeTypeCode'].includes(prop)">
          <span>{{value|dictionary('ZD_DY_LX')}}</span>
        </span>
        <span v-else>{{value}}</span>
      </template>
    </tableView>
    <Detail :code="currentCode" :visible.sync="showDetail" @reload="reload" v-if="showDetail" />
    <Apply :visible.sync="showApply" @reload="reload" v-if="showApply" />
  </div>
</template>
<script>
import Detail from './detail';
import Apply from './apply';
/**
 * 采购-请购单
 */
export default {
  components: {
    Detail,
    Apply
  },
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
      loading: false,
      showApply: false,
      showDetail: false,
      currentCode: '',
      // prettier-ignore
      filterOptions: [
        { label: '筛选类型', prop: 'searchType', default: true },
        { label: '账单编号', prop: 'billCode' },
        { label: '结清状态', prop: 'settleStatus' },
        { label: '逾期状态', prop: 'overSate' },
        { label: '对方名称', prop: 'accountName' },
        { label: '费用类型', prop: 'feeTypeCode' },
        { label: '费用详情', prop: 'feeDetailCode' },
        { label: '最小预付/收金额', prop: 'PredictAmount', type: 'numberRange' },
        { label: '最小应付/收金额', prop: 'Amount', type: 'numberRange' },
        { label: '最小实收/付金额', prop: 'FactAmount', type: 'numberRange' },
        { label: '最小应收/付日期', prop: 'PayEndDate', type: 'numberRange', int: true },
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
    },
    async multiPay() {
      console.log(this.$refs.tableView.selectionRow);
      let multi = this.$refs.tableView.selectionRow.filter(item =>
        [-1, 3].includes(item.state)
      );
      if (multi.length) {
        await this.$confirm(`是否批量提交付款申请？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal: false,
          type: 'warning',
          center: true
        });
        this.loading = true;
        try {
          await this.$api.seePsiFinanceService.paybillBatchPaymentApply({
            apprpvalNode: this.form.apprpvalNode,
            ids: multi.map(item => item.id),
            processType: 'psi_finance_pay_bill_01'
          });
        } catch (error) {}
        this.loading = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.buying-requisition-page {
}
</style>
