/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-31 11:25:05
 * @Description: 采购入库单
*/
<template>
  <sideDetail :status="status" :visible.sync="showPop" @close="$emit('update:visible',false)" title="采购入库单" width="990px">
    <template slot="button">
      <el-button size="mini" type="primary">提交审核</el-button>
      <el-button size="mini" type="primary">撤销审核</el-button>
      <el-button size="mini" type="primary">审核通过</el-button>
      <el-button size="mini" type="primary">驳回</el-button>
      <el-button size="mini" type="primary">编辑</el-button>
      <el-button size="mini" type="primary">删除</el-button>
      <el-button size="mini" type="primary">退货</el-button>
      <el-button size="mini" type="primary">终止</el-button>
      <el-button size="mini" type="primary">收票申请</el-button>
      <el-button size="mini" type="primary">生成合同</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view">
      <el-tab-pane label="详情">
        <el-form>
          <supplierInfo id="supplierInfo" />
          <companyInfo id="companyInfo" />
          <arrivalInfo id="arrivalInfo" />
          <commodityInfo id="commodityInfo" />
          <commodityInfo />
          <paymentLate id="paymentLate" />
          <billInfo id="billInfo" />
          <customInfo id="customInfo" />
          <extrasInfo id="extrasInfo" />
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="请购单">请购单</el-tab-pane>
      <el-tab-pane label="直发单">直发单</el-tab-pane>
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