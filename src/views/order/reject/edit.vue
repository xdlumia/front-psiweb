/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-30 16:40:32
 * @Description: 采购退货单
*/
<template>
  <el-dialog :visible="visible" @close="close" v-dialogDrag>
    <div slot="title">
      <span>采购退货单</span>
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
      <d-tab-pane label="发货信息" name="deliverInfo" />
      <d-tab-pane label="商品信息" name="commodityInfo" />
      <d-tab-pane label="账期" name="billInfo" />
      <d-tab-pane label="自定义信息" name="customInfo" />
      <d-tab-pane label="备注信息" name="extrasInfo" />
      <div>
        <el-form :model="form" class="p10">
          <SupplierInfo id="supplierInfo"></SupplierInfo>
          <CompanyInfo id="companyInfo"></CompanyInfo>
          <DeliverInfo id="deliverInfo"></DeliverInfo>
          <CommodityInfo id="commodityInfo"></CommodityInfo>
          <BillInfo id="billInfo"></BillInfo>
          <CustomInfo id="customInfo"></CustomInfo>
          <ExtrasInfo id="extrasInfo"></ExtrasInfo>
        </el-form>
      </div>
    </d-tabs>
  </el-dialog>
</template>
<script>
import BillInfo from '@/components/formComponents/bill-info.vue'; //账单信息
import CommodityInfo from '@/components/formComponents/commodity-info.vue'; //商品信息
import CompanyInfo from '@/components/formComponents/company-info.vue'; //公司信息
import CustomInfo from '@/components/formComponents/custom-info.vue'; //自定义信息
import DeliverInfo from '@/components/formComponents/deliver-info.vue'; //发货信息
import ExtrasInfo from '@/components/formComponents/extras-info.vue'; //备注信息
import SupplierInfo from '@/components/formComponents/supplier-info.vue'; //供应商信息

export default {
  components: {
    BillInfo,
    CommodityInfo,
    CompanyInfo,
    CustomInfo,
    DeliverInfo,
    ExtrasInfo,
    SupplierInfo
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