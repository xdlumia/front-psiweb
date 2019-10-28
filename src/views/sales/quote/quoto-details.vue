/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-28 15:36:26
 * @Description: 报价单详情
*/
<template>
  <div>
    <sales-details :status="[{ label: '状态', value: '新建' },{ label: '状态', value: '新建' },{ label: '状态', value: '新建' },{ label: '状态', value: '新建' },{ label: '状态', value: '新建' }]" />
    <approve-panel />
    <el-row type="flex" class="row-bg" justify="space-around">
    <el-col><div class="grid-content bg-purple">1</div></el-col>
    <el-col><div class="grid-content bg-purple-light">2</div></el-col>
    <el-col><div class="grid-content bg-purple">3</div></el-col>
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
