/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-30 16:23:48
 * @Description: 其他合同
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <TableView :headers="tableHeader" api="bizSystemService.getEmployeeList" title="其他合同">
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

import Detail from './detail'; // 其他合同详情

export default {
  components: {
    TableView,
    Detail
  },
  data() {
    return {
      status: [],
      showDetail: false,
      tableHeader: [
        { label: '采购入库单编号', prop: 'deptName', width: '180' },
        { label: '请购/直发/备货单编号', prop: 'deptName', width: '180' },
        { label: '订单来源', prop: 'deptName', width: '180' },
        { label: '单据状态', prop: 'deptName', width: '180' },
        { label: '供应商名称', prop: 'deptName', width: '180' },
        { label: '销售预计到/发货时间', prop: 'deptName', width: '180' },
        { label: '采购预计到/发货时间', prop: 'deptName', width: '180' },
        { label: '总计数量', prop: 'deptName', width: '180' },
        { label: '总计采购价', prop: 'deptName', width: '180' },
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
