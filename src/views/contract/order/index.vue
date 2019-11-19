/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-19 15:46:34
 * @Description: 采购合同
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <TableView :filterOptions="filterOptions" :params="params" api="bizSystemService.getEmployeeList" title="采购合同">
      <template slot-scope="{column,row,value,prop}">
        <span v-if="prop=='createTime'">{{value}}</span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <Detail :visible.sync="showDetail" />
  </div>
</template>
<script>
import TableView from '@/components/tableView';

import Detail from './detail'; // 采购合同详情

export default {
  components: {
    TableView,
    Detail
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
      showDetail: false,
      filterOptions: [
        { label: '合同编号', prop: 'contractCode', default: true },
        { label: '采购入库编号', prop: 'purchasePutinCode', default: true },
        { label: '供应商名称', prop: 'supplierName', default: true },
        {
          label: '总计数量',
          prop: 'TotalNum',
          type: 'numberRange',
          default: true,
          int: true
        },
        {
          label: '总计采购价',
          prop: 'TotalAmount',
          type: 'numberRange',
          default: true
        },
        {
          label: '预计到货时间',
          prop: 'PurchaseTime',
          type: 'dateRange',
          default: true
        },
        {
          label: '合同创建人',
          prop: 'creator',
          type: 'employee',
          default: true
        },
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
