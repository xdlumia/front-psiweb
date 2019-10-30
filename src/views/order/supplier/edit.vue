/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-30 15:30:18
 * @Description: 采购入库单
*/
<template>
  <el-dialog :visible="visible" @close="close" v-dialogDrag>
    <div slot="title">
      <span>采购入库单{{from?`(${from})`:''}}</span>
      <span class="fr mr20">
        <el-button @click="close" size="mini" type="primary">保存</el-button>
        <el-button @click="close" size="mini">关闭</el-button>
      </span>
    </div>
    <d-tabs :style="{
      maxHeight:maxHeight+'px'
    }">
      <d-tab-pane label="供应商信息" name="supplierInfo" />
      <d-tab-pane label="公司信息" name="companyInfo" />
      <d-tab-pane label="到货信息" name="arrivalInfo" />
      <d-tab-pane label="商品信息" name="commodityInfo" />
      <d-tab-pane label="收票滞纳金" name="paymentLate" />
      <d-tab-pane label="自定义信息" name="customInfo" />
      <d-tab-pane label="备注信息" name="extrasInfo" />
      <div>
        <el-form :model="form" class="p10">
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
      </div>
    </d-tabs>
  </el-dialog>
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

export default {
  components: {
    SupplierInfo,
    CompanyInfo,
    ExtrasInfo,
    CustomInfo,
    ArrivalInfo,
    CommodityInfo,
    PaymentLate,
    BillInfo
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    form: {},
    from: String // 来源
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  data() {
    return {
      activeName: '',
      randomStr: +new Date() + '-' + Math.random()
    };
  },
  mounted() {},
  methods: {
    handleClick({ label, name }) {
      this.activeName = '';
    },
    close() {
      this.$emit('update:visible', false);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>