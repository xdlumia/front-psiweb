/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-28 10:11:30
 * @Description: 采购-请购单
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <TableView
      :headers="tableHeader"
      api="bizSystemService.getEmployeeList"
      title="请购单"
    >
      <template slot-scope="{column,row,value}">
        <span v-if="column.prop=='createTime'">{{value|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <OrderBuyingDetail />
    <OrderStorage />
  </div>
</template>
<script>
import TableView from '@/components/tableView';
import OrderBuyingDetail from './detail';
import OrderStorage from './orderStorage';
/**
 * 采购-请购单
 */
export default {
  components: {
    TableView,
    OrderBuyingDetail,
    OrderStorage
  },
  data() {
    return {
      status: [],
      tableHeader: [
        { label: '请购单编号', prop: 'deptName', width: '180' },
        { label: '报价单编号', prop: 'deptName', width: '180' },
        { label: '单据状态', prop: 'deptName', width: '180' },
        { label: '销售要求到货时间', prop: 'deptName', width: '180' },
        { label: '采购预计到货时间', prop: 'deptName', width: '180' },
        { label: '单据执行人', prop: 'deptName', width: '180' },
        { label: '单据创建人', prop: 'deptName', width: '180' },
        { label: '创建部门', prop: 'deptName', width: '180' },
        { label: '创建时间', prop: 'createTime', width: '180' }
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
