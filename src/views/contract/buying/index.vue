/*
 * @Author: 赵伦 
 * @Date: 2019-10-25 18:32:24 
 * @Last Modified by: 赵伦
 * @Last Modified time: 2019-10-28 10:09:19
 */
<template>
  <div class="buying-requisition-page wfull hfull">
    <TableView :headers="tableHeader" api="bizSystemService.getEmployeeList" title="采购合同">
      <template slot-scope="{column,row,value}">
        <span v-if="column.prop=='createTime'">{{value|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
  </div>
</template>
<script>
import TableView from '@/components/tableView';
/**
 * 合同-采购合同
 */
export default {
  components: {
    TableView,
  },
  data() {
    return {
      status: [],
      tableHeader: [
        { label: '合同编号', prop: 'deptName', width: '180' },
        { label: '采购入库单编号', prop: 'deptName', width: '180' },
        { label: '供应商名称', prop: 'deptName', width: '180' },
        { label: '总计数量', prop: 'deptName', width: '180' },
        { label: '总计采购价', prop: 'deptName', width: '180' },
        { label: '预计到货时间', prop: 'deptName', width: '180' },
        { label: '合同创建人', prop: 'deptName', width: '180' },
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
</style>
