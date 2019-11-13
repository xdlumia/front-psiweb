/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-12 18:50:00
 * @Description: 采购退货单
*/
<template>
  <el-dialog :visible="visible" @close="close" v-dialogDrag v-loading="loading">
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
        <el-form :model="form" class="p10" size="mini" v-if="visible&&form">
          <supplierInfo :data="form" disabled id="supplierInfo"></supplierInfo>
          <companyInfo :data="form" disabled id="companyInfo"></companyInfo>
          <buyingRejectDeliver :data="form" id="deliverInfo" :hide="[
            'saleTime','logisticsSn','collected'
          ]" />
          <buyingGoodsEdit :data="form" id="commodityInfo" :show="[
            'commodityCode','goodsPic','goodsName','categoryCode','className','specOne','configName','noteText','costAmount','alterationNumber','alterationPrice','taxRate','rejectPreTaxAmount','inventoryNumber','isAssembly','action'
          ]" />
          <orderStorageBill :data="form" id="billInfo" />
          <customInfo :data="form" id="customInfo"></customInfo>
          <extrasInfo :data="form" id="extrasInfo"></extrasInfo>
        </el-form>
      </div>
    </d-tabs>
  </el-dialog>
</template>
<script>
import VisibleMixin from '@/utils/visibleMixin';

export default {
  mixins: [VisibleMixin],
  components: {},
  props: {},
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    getDetail() {
      let form = Object.assign(
        {
          logistics: {},
          attachList: [],
          commodityList: [],
          financeList: [],
          fieldList: []
        },
        this.params
      );
      return form;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>