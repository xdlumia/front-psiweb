/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-07 18:20:13
 * @Description: 采购-直发单
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <TableView
      :filterOptions="filterOptions"
      api="seePsiPurchaseService.purchasedirectList"
      busType="28"
      exportApi="seePsiPurchaseService.purchasedirectExport"
      title="直发单"
    >
      <template slot-scope="{column,row,value}">
        <span v-if="column.prop=='createTime'">{{value|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <Detail :visible.sync="showDetail" />
  </div>
</template>
<script>
import TableView from '@/components/tableView';
import Detail from './detail';

export default {
  components: {
    TableView,
    Detail
  },
  data() {
    return {
      status: [],
      showDetail: false,
      filterOptions: [
        { label: '直发单编号', prop: 'directCode', default: true },
        { label: '报价单', prop: 'quotationCode', default: true },
        { label: '销售出库单编号', prop: 'shipmentCode', default: true },
        { label: '单据状态0待完成 1部分完成 2完成3终止', prop: 'state' },
        {
          label: '流程审批状态（0 未审核 1审核中 2 完成 3 驳回）',
          prop: 'approvalState'
        },
        { label: '客户', prop: 'clientName' },
        {
          label: '销售预计发货时间',
          prop: 'SaleDeliverTime',
          type: 'dateRange'
        },
        {
          label: '采购预计发货时间',
          prop: 'PurchaseDeliverTime',
          type: 'dateRange'
        },
        { label: '单据执行人', prop: 'personInChargeId', type: 'employee' },
        { label: '合同创建人', prop: 'creator', type: 'employee' },
        { label: '创建部门', prop: 'deptTotalCode', type: 'dept' },
        { label: '最小创建时间', prop: 'CreateTime', type: 'dateRange' }
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
