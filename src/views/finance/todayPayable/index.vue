/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-21 19:02:59
 * @Description: 今日应付账单
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <tableView
      :api="pageConfig.api.list"
      :busType="pageConfig.busType"
      :exportApi="pageConfig.api.export"
      :filterOptions="filterOptions"
      :params="params"
      :selectable="selectable"
      :selection="true"
      @selection-change="handleSelectionChange"
      :title="pageConfig.title"
      ref="tableView"
      v-loading="loading"
    >
      <template slot="top-filter">
        <bill-account-selector
          @change="reload"
          v-model="params.companySettlementId"
        />
      </template>
      <template slot-scope="{column,row,value,prop}">
        <span v-if="prop=='billCode'">
          <el-link
            :underline="false"
            @click="showDetail=true,currentCode=value"
            class="f12"
            type="primary"
          >{{value}}</el-link>
        </span>
        <span v-else-if="['feeDetailCode','feeTypeCode'].includes(prop)">
          <span>{{value|dictionary('ZD_DY_LX')}}</span>
        </span>
        <span v-else>{{value}}</span>
      </template>
    </tableView>
    <Detail
      :code="currentCode"
      :pageConfig="pageConfig"
      :visible.sync="showDetail"
      @reload="reload"
      v-if="showDetail"
    />
  </div>
</template>
<script>
import Detail from './detail';
/**
 * 今日应付账单
 */
export default {
  components: {
    Detail
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
    },
    filterOptions: {
      type: Array,
      // prettier-ignore
      default: () => [
        { label: '账单编号', prop: 'billCode', default: true },
        { label: '结清状态', prop: 'settleStatus', default: true },
        { label: '逾期状态', prop: 'overSate', default: true },
        { label: '对方名称', prop: 'accountName', default: true },
        { label: '费用详情', prop: 'feeDetailCode', default: true },
        { label: '预付/收金额', prop: 'PredictAmount', type: 'numberRange', default: true },
        { label: '应付/收金额', prop: 'Amount', type: 'numberRange', default: true },
        { label: '实收/付金额', prop: 'FactAmount', type: 'numberRange', default: true },
        { label: '应收/付日期', prop: 'PayEndDate', type: 'numberRange', int: true, default: true },
        { label: '客户', prop: 'clientId' },
        { label: '关联单据编号', prop: 'busCode' },
        { label: '创建部门', prop: 'deptTotalCode', type: 'dept' },
        { label: '创建时间', prop: 'CreateTime', type: 'dateRange' },
        { label: '创建人', prop: 'creator', type: 'employee' },
      ]
    },
    pageConfig: {
      type: Object,
      default: () => ({
        title: '今日应付账单',
        busType: '51',
        type: 0,
        api: {
          list: 'seePsiFinanceService.todaybillList',
          export: 'seePsiFinanceService.todaybillExport',
          detail: 'seePsiFinanceService.todaybillGetInfoByCode',
          update: 'seePsiFinanceService.paybillUpdate',
          lateFee: 'seePsiFinanceService.todaybillChargeLateFee',
          delIncoming: 'seePsiFinanceService.todaybillDelRoutedMatching'
        },
        show: []
      })
    }
  },
  mounted() { },
  data() {
    return {
      status: [],
      loading: false,
      showDetail: false,
      currentCode: '',
      multipleSelection: [],
    };
  },
  methods: {
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.$emit("selection-change", val);
    },
    // 选中一个的时候禁用
    selectable(row, index) {
      if (this.multipleSelection.length > 0) {
        return this.multipleSelection.every(
          item => item.id === row.id
        );
      }
      return true;
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
