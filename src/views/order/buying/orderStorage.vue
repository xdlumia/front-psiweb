/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-30 09:56:41
 * @Description: 采购入库单
*/
<template>
  <el-dialog :visible="visible" @close="close" v-dialogDrag>
    <div slot="title">
      <span>采购入库单</span>
      <span class="fr mr20">
        <el-button @click="close" size="mini" type="primary">保存</el-button>
        <el-button @click="close" size="mini">关闭</el-button>
      </span>
    </div>
    <d-tabs :style="{
      maxHeight:maxHeight+'px'
    }">
      <d-tab-pane label="供应商信息" :name="'supplierInfo'+randomStr" />
      <d-tab-pane label="公司信息" :name="'companyInfo'+randomStr" />
      <d-tab-pane label="到货信息" :name="'shipInfo'+randomStr" />
      <d-tab-pane label="商品信息" :name="'commodityInfo'+randomStr" />
      <d-tab-pane label="收票滞纳金" :name="'billInfo'+randomStr" />
      <d-tab-pane label="自定义信息" :name="'customInfo'+randomStr" />
      <d-tab-pane label="备注信息" :name="'extrasInfo'+randomStr" />
      <div>
        <el-form :model="form" class="p10">
          <SupplierInfo :id="'supplierInfo'+randomStr" />
          <CompanyInfo :id="'companyInfo'+randomStr" />
          <ShipInfo :id="'shipInfo'+randomStr" />
          <CommodityInfo :id="'commodityInfo'+randomStr" />
          <CommodityInfo />
          <BillInfo :id="'billInfo'+randomStr" />
          <CustomInfo :id="'customInfo'+randomStr" />
          <ExtrasInfo :id="'extrasInfo'+randomStr" />
        </el-form>
      </div>
    </d-tabs>
  </el-dialog>
</template>
<script>
import CustomInfo from '@/components/formComponents/custom-info'; // 自定义信息
import CompanyInfo from '@/components/formComponents/company-info'; // 公司信息
import ExtrasInfo from '@/components/formComponents/extras-info'; // 备注信息
import SupplierInfo from '@/components/formComponents/supplier-info'; // 供应商信息
import ShipInfo from '@/components/formComponents/ship-info'; // 供应商信息
import CommodityInfo from '@/components/formComponents/commodity-info'; // 商品信息
import BillInfo from '@/components/formComponents/bill-info'; // 商品信息

export default {
  components: {
    SupplierInfo,
    CompanyInfo,
    ExtrasInfo,
    CustomInfo,
    ShipInfo,
    CommodityInfo,
    BillInfo,
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    form: {}
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  data() {
    return {
      activeName: '',
      randomStr: +new Date() + '-' + Math.random(),
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