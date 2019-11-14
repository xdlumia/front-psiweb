/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-14 17:52:43
 * @Description: 采购-拆卸单
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <TableView api="seePsiWmsService.wmsdisassemblyorderList" busType="11" title="拆卸单">
      <template slot="button">
        <span>自动分配：</span>
        <el-switch class="mr10" v-model="switchValue"></el-switch>
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
      switchValue: false
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
