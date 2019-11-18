/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-18 16:49:58
 * @Description: 采购-换货单
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <TableView :filterOptions="filterOptions" api="seePsiWmsService.wmsswaporderList" busType="1" ref="tableView" title="换货单">
      <template slot="button">
        <el-button @click="showEdit=true" size="mini" type="primary">新增</el-button>
      </template>
      <template slot-scope="{column,row,value,prop}">
        <span v-if="prop=='createTime'">{{value}}</span>
        <span v-else-if="prop=='swapOrderCode'">
          <el-link :underline="false" @click="showDetail=true,currentCode=value" class="f12" type="primary">{{value}}</el-link>
        </span>
        <span v-else-if="prop=='swapState'">{{stateText[value]}}</span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <Detail :code="currentCode" :visible.sync="showDetail" @reload="reload" v-if="showDetail" />
    <Edit :visible.sync="showEdit" @reload="reload" v-if="showEdit" />
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
      currentCode: '',
      showEdit: false,
      stateText: {
        '0': '新建',
        '1': '审核中',
        '2': '待换货',
        '3': '部分换货',
        '4': '完成换货',
        '-1': '已驳回'
      },
      filterOptions: []
    };
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
