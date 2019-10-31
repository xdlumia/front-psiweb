/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-31 17:02:57
 * @Description: 采购入库单
*/
<template>
  <sideDetail :status="status" :visible.sync="showPop" @close="$emit('update:visible',false)" title="采购入库单" width="990px">
    <template slot="button">
      <el-button size="mini" type="primary">提交审核</el-button>
      <el-button size="mini" type="primary">撤销审核</el-button>
      <el-button size="mini" type="primary">通过</el-button>
      <el-button size="mini" type="primary">驳回</el-button>
      <el-button size="mini" type="primary">编辑</el-button>
      <el-button size="mini" type="primary">删除</el-button>
      <el-button size="mini" type="primary">撤回</el-button>
      <el-button size="mini" type="primary">换货扫码</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view">
      <el-tab-pane label="详情">
        <el-form>
          <approve-panel></approve-panel>
          <exchange-info></exchange-info>
          <goods-exchange></goods-exchange>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="账单管理">账单管理</el-tab-pane>
      <el-tab-pane label="发票管理">发票管理</el-tab-pane>
    </el-tabs>
  </sideDetail>
</template>
<script>
export default {
  components: {},
  props: {
    visible: Boolean
  },
  data() {
    return {
      showPop: false,
      status: [
        { label: '状态', value: '新建' },
        { label: '单据创建人', value: '张收纳' },
        { label: '创建部门', value: '销售部' },
        { label: '创建时间', value: +new Date(), isTime: true },
        { label: '来源', value: '新建' }
      ]
    };
  },
  mounted() {
    this.checkVisible();
  },
  watch: {
    visible() {
      this.checkVisible();
    }
  },
  methods: {
    checkVisible() {
      this.showPop = this.visible;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>