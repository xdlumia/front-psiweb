/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-28 16:54:02
 * @Description: 报价单详情
*/
<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      label-position="top"
    >
      <!-- 状态详情 -->
      <sales-details :status="[{ label: '状态', value: '新建' }]" />
      <el-tabs
        v-model="activeName"
        type="card"
      >
        <el-tab-pane
          label="详情"
          name="detail"
        >
          <components
            class="d-auto-y"
            style="height:calc(100vh - 200px)"
            :is="activeName"
          ></components>
        </el-tab-pane>
        <el-tab-pane
          label="销售出库单"
          name="outLibrary"
        >
          <components
            class="d-auto-y"
            style="height:calc(100vh - 200px)"
            :is="activeName"
          ></components>
        </el-tab-pane>
        <el-tab-pane
          label="请购单"
          name="buy"
        >
          <components
            class="d-auto-y"
            style="height:calc(100vh - 200px)"
            :is="activeName"
          ></components>
        </el-tab-pane>
        <el-tab-pane
          label="操作记录"
          name="record"
        >
          <components
            class="d-auto-y"
            style="height:calc(100vh - 200px)"
            :is="activeName"
          ></components>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>
<script>
import salesDetails from '@/components/formComponents/side-statusbar' //顶部状态
import detail from './quotoDetails/detail' //详情
import outLibrary from './quotoDetails/outLibrary' //销售出库单
import buy from './quotoDetails/buy' //采购单
import record from './quotoDetails/record' //操作记录

export default {
  components: {
    salesDetails,
    detail,
    outLibrary,
    buy,
    record
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
