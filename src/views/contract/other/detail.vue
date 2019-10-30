/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-30 16:26:42
 * @Description: 采购入库单
*/
<template>
  <SideDetail :status="status" :visible.sync="showPop" @close="$emit('update:visible',false)" title="采购入库单" width="990px">
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
          <SupplierInfo id="supplierInfo" />
          <CompanyInfo id="companyInfo" />
          <ArrivalInfo id="arrivalInfo" />
          <CommodityInfo id="commodityInfo" />
          <CommodityInfo />
          <PaymentLate id="paymentLate" />
          <BillInfo id="billInfo" />
          <CustomInfo id="customInfo" />
          <ExtrasInfo id="extrasInfo" />
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="请购单">请购单</el-tab-pane>
      <el-tab-pane label="直发单">直发单</el-tab-pane>
      <el-tab-pane label="采购单">采购单</el-tab-pane>
      <el-tab-pane label="采购退货单">采购退货单</el-tab-pane>
      <el-tab-pane label="应付账单">应付账单</el-tab-pane>
      <el-tab-pane label="发票记录">发票记录</el-tab-pane>
    </el-tabs>
  </SideDetail>
</template>
<script>
import ArrivalInfo from '@/components/formComponents/arrival-info.vue'; //到货信息
import BillInfo from '@/components/formComponents/bill-info.vue'; //账单信息
import CommodityInfo from '@/components/formComponents/commodity-info.vue'; //商品信息
import CompanyInfo from '@/components/formComponents/company-info.vue'; //公司信息
import CustomInfo from '@/components/formComponents/custom-info.vue'; //自定义信息
import ExtrasInfo from '@/components/formComponents/extras-info.vue'; //备注信息
import PaymentLate from '@/components/formComponents/payment-late.vue'; //收款滞纳金
import SupplierInfo from '@/components/formComponents/supplier-info.vue'; //供应商信息
import SideDetail from '@/components/side-detail.vue'; //侧边详情弹框

export default {
  components: {
    SupplierInfo,
    CompanyInfo,
    ExtrasInfo,
    CustomInfo,
    ArrivalInfo,
    PaymentLate,
    CommodityInfo,
    BillInfo,
    SideDetail
  },
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