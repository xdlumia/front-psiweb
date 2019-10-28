/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-28 15:54:21
 * @Description: 报价单详情
*/
<template>
  <div>
    <sales-details :status="[{ label: '状态', value: '新建' },{ label: '状态', value: '新建' },{ label: '状态', value: '新建' },{ label: '状态', value: '新建' },{ label: '状态', value: '新建' }]" />
    <el-tabs
      v-model="activeName"
      type="card"
    >
      <el-tab-pane
        label="详情"
        name="first"
      ></el-tab-pane>
      <el-tab-pane
        label="销售出库单"
        name="second"
      ></el-tab-pane>
      <el-tab-pane
        label="请购单"
        name="third"
      ></el-tab-pane>
      <el-tab-pane
        label="操作记录"
        name="fourth"
      ></el-tab-pane>
    </el-tabs>
    <approve-panel />
    </el-row>
  </div>
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
