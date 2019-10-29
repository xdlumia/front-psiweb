/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-29 18:09:47
 * @Description: 采购-备货单
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <TableView :headers="tableHeader" api="bizSystemService.getEmployeeList" title="备货单">
      <template slot="button">
        <el-button size="mini" type="primary" @click="showAdd=true">新建</el-button>
      </template>
      <template slot-scope="{column,row,value}">
        <span v-if="column.prop=='createTime'">{{value|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <AddOrderPrepare :visible.sync="showAdd" />
  </div>
</template>
<script>
import TableView from '@/components/tableView';
import AddOrderPrepare from './edit'

export default {
  components: {
    TableView,
    AddOrderPrepare
  },
  data() {
    return {
      status: [],
      showAdd: false,
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
