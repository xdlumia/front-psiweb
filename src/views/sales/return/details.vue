/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-30 16:57:48
 * @Description: 销售出库单详情
*/
<template>
  <div>
    <div class="mb10">
      <el-button
        size="small"
        type="primary"
      >提交审核</el-button>
      <el-button size="small">撤销审核</el-button>
      <el-button
        size="small"
        type="primary"
      >审核通过</el-button>
      <el-button
        type="primary"
        size="small"
      >编辑</el-button>
      <el-button
        size="small"
        type="danger"
      >删除</el-button>
      <el-button
        size="small"
        type="primary"
      >提交审核</el-button>
      <el-button size="small">驳回</el-button>
      <el-button
        size="small"
        type="primary"
      >生成销售出库单</el-button>
      <el-button
        size="small"
        type="primary"
      >生成请购单</el-button>
      <el-button
        size="small"
        type="primary"
      >终止</el-button>

    </div>
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
          v-for="(val,key) of tabs"
          :key="key"
          :label="val"
          :name="key"
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
import detail from './details/detail' //详情
import outLib from './details/outLib' //报价单
export default {
  components: {
    sideStatusbar,
    detail,
    outLib
  },
  props: ['drawerData'],
  data() {
    return {
      // tabs  组件名称对应的label名称
      tabs: {
        detail: '详情',
        outLib: '销售出库单',
      },
      // tabs当前选中
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
