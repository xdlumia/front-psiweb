/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-05 09:32:52
 * @Description: 其他合同
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <TableView :filterOptions="filterOptions" :headers="tableHeader" api="seePsiContractService.contractList" busType="23" title="其他合同">
      <template slot="button">
        <el-button @click="showEdit=true" size="mini" type="primary">新增</el-button>
      </template>
      <template slot-scope="{column,row,value}">
        <span v-if="column.prop=='createTime'">{{value|timeToStr('YYYY-MM-DD HH:mm:ss')}}</span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <Detail :visible.sync="showDetail" />
    <Edit :visible.sync="showEdit" />
  </div>
</template>
<script>
import TableView from '@/components/tableView';

import Detail from './detail'; // 其他合同详情
import Edit from './edit'; // 其他合同详情

export default {
  components: {
    TableView,
    Detail,
    Edit
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
      showDetail: true,
      showEdit: false,
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
      ],
      filterOptions: [
        { label: '合同编号', prop: 'contractCode', default: true },
        { label: '销售出库单编号', prop: 'shipmentCode', default: true },
        { label: '客户名称', prop: 'clientName', default: true },
        {
          label: '总计数量',
          prop: 'TotalNum',
          type: 'numberRange',
          default: true,
          int: true
        },
        {
          label: '总计销售',
          prop: 'TotalAmount',
          type: 'numberRange',
          default: true
        },
        {
          label: '预计发货时间',
          prop: 'SalesTime',
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
