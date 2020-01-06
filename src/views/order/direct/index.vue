/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2020-01-06 11:26:04
 * @Description: 采购-直发单
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <TableView
      :exportButton="authorityButtons.includes('psi_purchase_direct_05')"
      :filterOptions="filterOptions"
      :params="Object.assign(defaultParams,params)"
      api="seePsiPurchaseService.purchasedirectList"
      busType="28"
      exportApi="seePsiPurchaseService.purchasedirectExport"
      ref="tableView"
      title="直发单"
    >
      <template slot-scope="{column,row,value,prop}">
        <span v-if="prop=='directCode'">
          <el-link :underline="false" @click="open(value)" class="f12" type="primary">{{value|codeSlice}}</el-link>
        </span>
        <span v-else-if="prop=='quotationCode'">
          <el-link :underline="false" @click="showQuotationDetail=true,currentQuotationCode=value" class="f12" type="primary">{{value|codeSlice}}</el-link>
        </span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <QuoteDetails
      :code="currentQuotationCode"
      :rowData="{}"
      :visible.sync="showQuotationDetail"
      @reload="reload"
      v-if="showQuotationDetail"
    />
    <Detail :code="currentCode" :visible.sync="showDetail" @reload="reload" v-if="showDetail" />
  </div>
</template>
<script>
import TableView from '@/components/tableView';
import Detail from './detail';
import QuoteDetails from '@/views/sales/quote/quote-details';

export default {
  components: {
    TableView,
    Detail,
    QuoteDetails
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
      default: () => ({ page: 1, limit: 20 })
    }
  },
  data() {
    return {
      defaultParams: {
        page: 1,
        limit: 20
      },
      status: [],
      showDetail: false,
      showQuotationDetail: false,
      currentCode: '',
      currentQuotationCode: '',
      stateText: {
        '0': '待完成',
        '1': '部分完成',
        '2': '已完成',
        '3': '已终止'
      },
      // prettier-ignore
      filterOptions: [
        { label: '直发单编号', prop: 'directCode', default: true },
        { label: '报价单编号', prop: 'quotationCode', default: true },
        { label: '客户', prop: 'clientName', default: true },
        { label: '销售预计发货时间', prop: 'SaleDeliverTime', type: 'dateRange', default: true },
        { label: '采购预计发货时间', prop: 'PurchaseDeliverTime', type: 'dateRange', default: true },
        { label: '单据执行人', prop: 'personInChargeId', type: 'employee', default: true },
        { label: '创建人', prop: 'creator', type: 'employee' },
        { label: '创建部门', prop: 'deptTotalCode', type: 'dept' },
        { label: '创建时间', prop: 'CreateTime', type: 'dateRange' }
      ]
    };
  },
  methods: {
    open(value) {
      this.showDetail = true;
      this.currentCode = value;
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
