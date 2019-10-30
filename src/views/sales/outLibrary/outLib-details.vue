/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-30 12:01:51
 * @Description: 销售出库单详情
*/
<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      label-position="top"
    >
      <!-- 状态详情 -->
      <sideStatusbar :status="[{ label: '状态', value: '新建' }]" />
      <el-tabs
        v-model="activeName"
        type="card"
      >
        <el-tab-pane
          label="详情"
          name="detail"
        >
        </el-tab-pane>
        <el-tab-pane
          label="报价单"
          name="outLibrary"
        >

        </el-tab-pane>
        <el-tab-pane
          label="请购单"
          name="buy"
        >
        </el-tab-pane>
        <el-tab-pane
          label="操作记录"
          name="record"
        >
        </el-tab-pane>
      </el-tabs>
      <components
        class="d-auto-y"
        style="height:calc(100vh - 200px)"
        :is="activeName"
      ></components>
    </el-form>
  </div>
</template>
<script>
import sideStatusbar from '@/components/formComponents/side-statusbar' //顶部状态
// import detail from './quotoDetails/detail' //详情
// import outLibrary from './quotoDetails/outLibrary' //销售出库单
// import buy from './quotoDetails/buy' //采购单
// import record from '@/components/formComponents/record' //操作记录

export default {
  components: {
    sideStatusbar,
    // detail,
    // outLibrary,
    // buy,
    // record
  },
  props: ['drawerData'],
  data() {
    return {
      activeName: 'detail',
      form: {},
    }
  },
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
