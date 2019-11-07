/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-07 18:21:11
 * @Description: 采购-采购入库单
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <TableView
      :filterOptions="filterOptions"
      api="seePsiPurchaseService.purchaseputinList"
      busType="30"
      exportApi="seePsiPurchaseService.purchaseputinExport"
      title="采购入库单"
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

import Detail from './detail'; // 采购入库单详情

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
        { label: '入库单编号', prop: 'putinCode', default: true },
        { label: '请购/直发/备货单编号', prop: 'joinCode', default: true },
        { label: '单据状态', prop: 'state', default: true },
        { label: '来源', prop: 'source', default: true },
        { label: '供应商ID', prop: 'supplierId', default: true },
        { label: '供应商名称', prop: 'supplierName', default: true },
        {
          label: '销售预计到/发货时间',
          prop: 'SaleTime',
          type: 'dateRange',
          default: true
        },
        {
          label: '采购预计到/发货时间',
          prop: 'PurchaseTime',
          type: 'dateRange',
          default: true
        },
        {
          label: '总计数量',
          prop: 'PutinNum',
          type: 'numberRange',
          default: true,
          int: true
        },
        { label: '总计采购价', prop: 'PutinAmount', type: 'numberRange' },
        { label: '合同创建人', prop: 'creator', type: 'employee' },
        { label: '创建部门', prop: 'deptTotalCode', type: 'dept' },
        { label: '创建时间', prop: 'CreateTime', type: 'dateRange' }
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
