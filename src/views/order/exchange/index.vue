/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-15 09:38:15
 * @Description: 采购-换货单
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <TableView api="bizSystemService.getEmployeeList" busType="1" title="换货单">
      <template slot="button">
        <el-button @click="showEdit=true" size="mini" type="primary">新增</el-button>
      </template>
      <template slot-scope="{column,row,value,prop}">
        <span v-if="prop=='createTime'">{{value}}</span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <Detail :visible.sync="showDetail" />
    <Edit :visible.sync="showEdit" />
  </div>
</template>
<script>
import TableView from '@/components/tableView';

import Detail from './detail'; // 换货单详情
import Edit from './edit'; // 换货单详情

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
      showDetail: false,
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
