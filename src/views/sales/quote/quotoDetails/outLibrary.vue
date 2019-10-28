/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-28 16:56:16
 * @Description: 报价单详情
*/
<template>
  <table-view
    type="1"
    ref="table"
    :filter="true"
    :moreButton="true"
    :column="true"
    title="请购单"
    api="bizSystemService.getEmployeeList"
    @selection-change="selectionChange"
  >
    <template v-slot:filter>自定义筛选列</template>
    <template v-slot:moreButton>自定义更多按钮</template>
    <template slot-scope="{column,row,value}">
      <span @click="quotoHandle('quoto',row)">报价</span>
      <span @click="quotoHandle('sales',row)">销售</span>
      <span v-if="column.prop=='createTime'">{{value|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
      <span v-else>{{value}}</span>
    </template>
  </table-view>
</template>
<script>
import salesDetails from '@/components/formComponents/side-statusbar' //顶部状态
import approvePanel from '@/components/formComponents/approve-panel' //审核面板

export default {
  components: {
    salesDetails,
    approvePanel
  },
  props: ['drawerData'],
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
