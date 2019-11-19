/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-19 16:10:15
 * @Description: 销售合同
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <TableView :filterOptions="filterOptions" :params="params" api="seePsiContractService.contractsalesList" title="销售合同" busType="25">
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

import Detail from './detail'; // 销售合同详情

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
        { label: '甲方', prop: 'partyA', default: true },
        { label: '乙方', prop: 'partyB', default: true },
        {
          label: '合同开始时间',
          prop: 'BeginDate',
          type: 'dateRange',
          default: true,
          int: true
        },
        {
          label: '合同结束时间',
          prop: 'EndDate',
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
