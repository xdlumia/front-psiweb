/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-07 18:14:10
 * @Description: 采购-备货单
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <TableView
      :filterOptions="filterOptions"
      api="seePsiPurchaseService.purchasestockorderList"
      busType="29"
      exportApi="seePsiPurchaseService.purchasestockorderExport"
      title="备货单"
    >
      <template slot="button">
        <el-button @click="showAdd=true" size="mini" type="primary">新建</el-button>
      </template>
      <template slot-scope="{column,row,value}">
        <span v-if="column.prop=='createTime'">{{value|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <AddOrderPrepare :visible.sync="showAdd" />
    <OrderPrepareDetail :visible.sync="showDetail" />
  </div>
</template>
<script>
import TableView from '@/components/tableView';
import AddOrderPrepare from './edit';
import OrderPrepareDetail from './detail';

export default {
  components: {
    TableView,
    AddOrderPrepare,
    OrderPrepareDetail
  },
  data() {
    return {
      status: [],
      showAdd: false,
      showDetail: false,
      filterOptions: [
        { label: '请购单编号', prop: 'stockCode', default: true },
        {
          label: '单据状态', //0新建 1审核中 2已通过3部分完成4已完成5已驳回
          prop: 'state',
          default: true
        },
        {
          label: '流程审批状态', //（0 未审核 1审核中 2 完成 3 驳回）
          prop: 'approvalState',
          default: true
        },
        {
          label: '采购预计到货时间',
          prop: 'PurchaseArrivalTime',
          type: 'dateRange',
          default: true
        },
        { label: '合同创建人', prop: 'creator', type: 'employee' },
        { label: '创建部门', prop: 'deptTotalCode', type: 'dept' },
        { label: '创建时间', prop: 'CreateTime', type: 'dateRange' },
      ]
    };
  },
  methods: {
    logData(e) {
      console.log(e);
    }
  }
};
</script>
<style lang="scss" scoped>
.buying-requisition-page {
}
</style>
