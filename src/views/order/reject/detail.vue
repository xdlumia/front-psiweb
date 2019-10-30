/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-30 17:36:36
 * @Description: 采购退货单
*/
<template>
  <SideDetail :status="status" :visible.sync="showPop" @close="$emit('update:visible',false)" title="采购退货单" width="990px">
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
          <ApprovePanel id="approvePanel"></ApprovePanel>
          <SupplierInfo id="supplierInfo" />
          <CompanyInfo id="companyInfo" />
          <ArrivalInfo id="arrivalInfo" />
          <CommodityInfo id="commodityInfo" />
          <CustomInfo id="customInfo" />
          <ExtrasInfo id="extrasInfo" />
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="请购单">请购单</el-tab-pane>
      <el-tab-pane label="采购入库单">采购入库单</el-tab-pane>
      <el-tab-pane label="采购单">采购单</el-tab-pane>
      <el-tab-pane label="应收账单">应收账单</el-tab-pane>
    </el-tabs>
    <ScanGoods :visible.sync="showScanGoods" />
  </SideDetail>
</template>
<script>
import ApprovePanel from '@/components/formComponents/approve-panel.vue'; //审核信息
import ArrivalInfo from '@/components/formComponents/arrival-info.vue'; //到货信息
import CommodityInfo from '@/components/formComponents/commodity-info.vue'; //商品信息
import CompanyInfo from '@/components/formComponents/company-info.vue'; //公司信息
import CustomInfo from '@/components/formComponents/custom-info.vue'; //自定义信息
import ExtrasInfo from '@/components/formComponents/extras-info.vue'; //备注信息
import SupplierInfo from '@/components/formComponents/supplier-info.vue'; //供应商信息
import SideDetail from '@/components/side-detail.vue'; //侧边详情弹框

import ScanGoods from './scanGoods';

export default {
  components: {
    SupplierInfo,
    CompanyInfo,
    ExtrasInfo,
    CustomInfo,
    ArrivalInfo,
    CommodityInfo,
    ApprovePanel,
    SideDetail,
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