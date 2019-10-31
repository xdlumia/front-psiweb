/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-31 17:23:08
 * @Description: 采购入库单
*/
<template>
  <sideDetail :status="status" :visible.sync="showPop" @close="$emit('update:visible',false)" title="采购入库单" width="990px">
    <template slot="button">
      <el-button size="mini" type="primary">停用</el-button>
      <el-button size="mini" type="primary">启用</el-button>
      <el-button size="mini" type="primary">编辑</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view">
      <el-tab-pane label="详情">
        <el-form>
          <form-card title="往来账款">
            <el-row>
              <el-col :span="8">
                <span class="b mr10">应付欠款</span>
                <span>9999元</span>
              </el-col>
              <el-col :span="8">
                <span class="b mr10">预付款</span>
                <span>9999元</span>
              </el-col>
            </el-row>
          </form-card>
          <supplier-base-edit></supplier-base-edit>
          <invoice-info></invoice-info>
          <extras-info></extras-info>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="可供商品">可供商品</el-tab-pane>
      <el-tab-pane label="采购入库单">采购入库单</el-tab-pane>
      <el-tab-pane label="采购合同">采购合同</el-tab-pane>
      <el-tab-pane label="采购单">采购单</el-tab-pane>
      <el-tab-pane label="采购退货单">采购退货单</el-tab-pane>
      <el-tab-pane label="应付账单">应付账单</el-tab-pane>
      <el-tab-pane label="发票记录">发票记录</el-tab-pane>
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