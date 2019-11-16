/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-15 09:23:47
 * @Description: 采购-采购调价单
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <TableView api="seePsiCommonService.commonadjustpriceList" title="采购调价单" busType="40">
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

import Detail from './detail'; //采购调价单详情
import Edit from './edit'; //采购调价单详情

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
