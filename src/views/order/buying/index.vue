/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-19 15:53:03
 * @Description: 采购-请购单
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <TableView
      :filterOptions="filterOptions"
      :params="params"
      :selection="true"
      api="seePsiPurchaseService.purchaseapplyorderList"
      busType="27"
      exportApi="seePsiPurchaseService.purchaseapplyorderExport"
      title="请购单"
    >
      <template slot="button">
        <el-button @click="orderBuyingDetailRecVisible=true" size="mini" type="primary">请购单明细表</el-button>
      </template>
      <template slot-scope="{column,row,value,prop}">
        <span v-if="prop=='purchaseApplyCode'">
          <el-link :underline="false" @click="showDetail=true,currentCode=value" class="f12" type="primary">{{value}}</el-link>
        </span>
        <span v-else-if="prop=='quotationCode'">
          <el-link :underline="false" @click="showDetail=true,currentCode=value" class="f12" type="primary">{{value}}</el-link>
        </span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <OrderBuyingDetail :code="currentCode" :visible.sync="showDetail" @reload="reload" v-if="showDetail" />
    <OrderBuyingDetailRec :visible.sync="orderBuyingDetailRecVisible" @reload="reload" v-if="orderBuyingDetailRecVisible" />
  </div>
</template>
<script>
import TableView from '@/components/tableView';
import OrderBuyingDetail from './detail';
import OrderStorage from '../storage/edit';
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
      showEdit: false,
      showDetail: false,
      addBorrowInVisible: false,
      orderBuyingDetailRecVisible: false,
      currentCode: '',
      stateText: {
        // 单据状态0待完成 1部分完成 2完成3终止
        0: '待完成',
        1: '部分完成',
        2: '完成',
        3: '终止'
      },
      filterOptions: [
        {
          label: '请购单编号',
          prop: 'purchaseApplyCode',
          default: true
        },
        { label: '报价单编号', prop: 'quotationCode', default: true },
        {
          label: '销售要求到货时间',
          prop: 'SaleArrivalTime',
          type: 'dateRange',
          default: true
        },
        {
          label: '采购预计到货时间',
          prop: 'PurchaseArrivalTime',
          type: 'dateRange',
          default: true
        },
        // { label: '单据执行人', prop: 'personInChargeId', type: 'employee' },
        { label: '创建人', prop: 'creator', type: 'employee' },
        { label: '创建部门', prop: 'deptTotalCode', type: 'dept' },
        { label: '创建时间', prop: 'CreateTime', type: 'dateRange' }
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
