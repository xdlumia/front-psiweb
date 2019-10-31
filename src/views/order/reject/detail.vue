/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-31 11:18:38
 * @Description: 采购退货单
*/
<template>
  <sideDetail :status="status" :visible.sync="showPop" @close="$emit('update:visible',false)" title="采购退货单" width="990px">
    <template slot="button">
      <el-button size="mini" type="primary">提交审核</el-button>
      <el-button size="mini" type="primary">撤销审核</el-button>
      <el-button size="mini" type="primary">通过</el-button>
      <el-button size="mini" type="primary">驳回</el-button>
      <el-button size="mini" type="primary">编辑</el-button>
      <el-button size="mini" type="primary">删除</el-button>
      <el-button @click="showScanGoods=true" size="mini" type="primary">退货扫码</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view">
      <el-tab-pane label="详情">
        <el-form>
          <approvePanel id="approvePanel"></approvePanel>
          <supplierInfo id="supplierInfo" />
          <companyInfo id="companyInfo" />
          <arrivalInfo id="arrivalInfo" />
          <commodityInfo id="commodityInfo" />
          <customInfo id="customInfo" />
          <extrasInfo id="extrasInfo" />
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="请购单">请购单</el-tab-pane>
      <el-tab-pane label="采购入库单">采购入库单</el-tab-pane>
      <el-tab-pane label="采购单">采购单</el-tab-pane>
      <el-tab-pane label="应收账单">应收账单</el-tab-pane>
    </el-tabs>
    <scanGoods :visible.sync="showScanGoods" />
  </sideDetail>
</template>
<script>
import ScanGoods from './scanGoods';

export default {
  components: {
    ScanGoods
  },
  props: {
    visible: Boolean
  },
  data() {
    return {
      showPop: false,
      showScanGoods: false,
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