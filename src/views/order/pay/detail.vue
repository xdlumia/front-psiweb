/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-31 17:02:29
 * @Description: 采购入库单
*/
<template>
  <sideDetail :status="status" :visible.sync="showPop" @close="$emit('update:visible',false)" title="采购入库单" width="990px">
    <template slot="button">
      <el-button size="mini" type="primary" @click="showApply=true">付款申请</el-button>
      <el-button size="mini" type="primary">通过</el-button>
      <el-button size="mini" type="primary">驳回</el-button>
      <el-button size="mini" type="primary">复核通过</el-button>
      <el-button size="mini" type="primary">付款</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view">
      <el-tab-pane label="详情">
        <el-form>
          <approve-panel></approve-panel>
          <paybill-detail></paybill-detail>
          <receiver-info></receiver-info>
          <payment-log></payment-log>
          <extras-info></extras-info>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="采购单">采购单</el-tab-pane>
      <el-tab-pane label="换货单">换货单</el-tab-pane>
      <el-tab-pane label="费用单">费用单</el-tab-pane>
      <el-tab-pane label="销售退货单">销售退货单</el-tab-pane>
      <el-tab-pane label="采购入库单">采购入库单</el-tab-pane>
    </el-tabs>
    <Apply :visible.sync="showApply" />
  </sideDetail>
</template>
<script>
import Apply from './apply'; // 付款单

export default {
  components: {
    Apply
  },
  props: {
    visible: Boolean
  },
  data() {
    return {
      showPop: false,
      showApply: false,
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