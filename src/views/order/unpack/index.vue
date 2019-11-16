/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-15 18:05:14
 * @Description: 采购-拆卸单
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <TableView api="seePsiWmsService.wmsdisassemblyorderList" busType="11" ref="tableView" title="拆卸单">
      <template slot="button">
        <span>自动分配：</span>
        <el-switch class="mr10" v-model="switchValue"></el-switch>
        <el-button @click="showEdit=true" size="mini" type="primary">新增</el-button>
      </template>
      <template slot-scope="{column,row,value,prop}">
        <span v-if="prop=='createTime'">{{value}}</span>
        <span v-else-if="prop=='operation'">
          <span class="elTableDragDefault el-icon-rank f20"></span>
        </span>
        <span v-else-if="prop=='disassemblyOrderState'">{{stateText[value]}}</span>
        <span v-else-if="prop=='disassemblyOrderCode'">
          <el-link :underline="false" @click="showDetail=true,currentCode=value" class="f12" type="primary">{{value}}</el-link>
        </span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <Detail :code="currentCode" :visible.sync="showDetail" @reload="reload()" v-if="showDetail" />
    <Edit :visible.sync="showEdit" @reload="reload()" v-if="showEdit" />
  </div>
</template>
<script>
import TableView from '@/components/tableView';

import Detail from './detail'; // 拆卸单详情
import Edit from './edit'; // 拆卸单详情

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
      switchValue: false,
      currentCode: '',
      stateText: {
        '0': '新建',
        '1': '审核中',
        '2': '待执行',
        '3': '部分完成',
        '4': '已完成',
        '-1': '终止'
      }
    };
  },
  mounted() {
    this.$refs.tableView.$refs.table.rowDrop();
    this.$refs.tableView.$refs.table.$on('dragEnd', e => console.log(e));
  },
  methods: {
    logData(e) {
      console.log(e);
    },
    reload() {
      this.$refs.tableView.reload(1);
    }
  }
};
</script>
<style lang="scss" scoped>
.buying-requisition-page {
}
</style>
