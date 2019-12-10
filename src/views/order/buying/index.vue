/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-10 10:20:23
 * @Description: 采购-请购单
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <TableView
      :exportButton="authorityButtons.includes('psi_purchase_apply_07')"
      :filterOptions="filterOptions"
      :params="Object.assign(defaultParams,params)"
      :selection="true"
      api="seePsiPurchaseService.purchaseapplyorderList"
      busType="27"
      exportApi="seePsiPurchaseService.purchaseapplyorderExport"
      ref="tableView"
      title="请购单"
    >
      <template slot="button">
        <el-button
          @click="orderBuyingDetailRecVisible=true"
          size="mini"
          type="primary"
          v-if="authorityButtons.includes('psi_purchase_apply_06')"
        >请购单明细表</el-button>
      </template>
      <template slot-scope="{column,row,value,prop}">
        <span v-if="prop=='purchaseApplyCode'">
          <el-link :underline="false" @click="showDetail=true,currentCode=value" class="f12" type="primary">{{value}}</el-link>
        </span>
        <span v-else-if="prop=='quotationCode'">
          <el-link :underline="false" @click="showQuotationDetail=true,currentQuotationCode=value" class="f12" type="primary">{{value}}</el-link>
        </span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <OrderBuyingDetail :code="currentCode" :visible.sync="showDetail" @reload="reload" v-if="showDetail" />
    <QuoteDetails
      :code="currentQuotationCode"
      :rowData="{}"
      :visible.sync="showQuotationDetail"
      @reload="reload"
      v-if="showQuotationDetail"
    />
    <OrderBuyingDetailRec :visible.sync="orderBuyingDetailRecVisible" @reload="reload" v-if="orderBuyingDetailRecVisible" />
  </div>
</template>
<script>
import TableView from '@/components/tableView';
import OrderBuyingDetail from './detail';
import OrderStorage from '../storage/edit';
import QuoteDetails from '@/views/sales/quote/quote-details';
import OrderBuyingDetailRec from './detailRec';
import AddBorrowIn from '@/views/order/borrow/addIn';
/**
 * 采购-请购单
 */
export default {
  components: {
    TableView,
    OrderBuyingDetail,
    OrderBuyingDetailRec,
    OrderStorage,
    AddBorrowIn,
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
      // prettier-ignore
      filterOptions: [
        { label: '请购单编号', prop: 'purchaseApplyCode', default: true },
        { label: '报价单编号', prop: 'quotationCode', default: true },
        { label: '销售要求到货时间', prop: 'SaleArrivalTime', type: 'dateRange', default: true },
        { label: '采购预计到货时间', prop: 'PurchaseArrivalTime', type: 'dateRange', default: true },
        { label: '单据执行人', prop: 'personInChargeId', type: 'employee', default: true },
        { label: '创建人', prop: 'creator', type: 'employee' },
        { label: '创建部门', prop: 'deptTotalCode', type: 'dept' },
        { label: '创建时间', prop: 'CreateTime', type: 'dateRange' }
      ]
    };
  },
  mounted() {},
  methods: {
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
