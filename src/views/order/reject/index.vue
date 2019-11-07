/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-07 18:23:17
 * @Description: 采购-采购退货单
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <TableView
      :filterOptions="filterOptions"
      api="seePsiPurchaseService.purchasealterationList"
      busType="31"
      exportApi="seePsiPurchaseService.purchasealterationExport"
      title="采购退货单"
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

import Detail from './detail'; // 采购退货单详情

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
        { label: '退换货编号', prop: 'alterationCode', default: true },
        { label: '入库单编号', prop: 'putinCode', default: true },
        { label: '单据状态', prop: 'state', default: true },
        {
          label: '流程审批状态（0 未审核 1审核中 2 完成 3 驳回）',
          prop: 'approvalState'
        },
        { label: '供应商', prop: 'supplierId' },
        {
          label: '最小退货数量',
          prop: 'AlterationNum',
          type: 'numberRange',
          int: true
        },
        { label: '最小退货价', prop: 'AlterationAmount', type: 'numberRange' },
        {
          label: '最小预计发货时间',
          prop: 'PurchasePlanTime',
          type: 'dateRange'
        },
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
