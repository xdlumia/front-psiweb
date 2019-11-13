/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-12 18:45:03
 * @Description: 请购单
*/
<template>
  <el-dialog :visible="visible" @close="close" v-dialogDrag v-loading="loading">
    <div slot="title">
      <span>新增请购单</span>
      <span class="fr mr20">
        <el-button @click="save" size="mini" type="primary">保存</el-button>
        <el-button @click="close" size="mini">取消</el-button>
      </span>
    </div>
    <d-tabs :style="{
      maxHeight:maxHeight+'px'
    }">
      <d-tab-pane label="发货信息" name="arrivalInfo" />
      <d-tab-pane label="商品信息" name="commodityInfo" />
      <d-tab-pane label="自定义信息" name="customInfo" />
      <d-tab-pane label="备注信息" name="extrasInfo" />
      <div>
        <el-form :model="form" class="p10" ref="form" size="mini" v-if="visible&&form">
          <form-card id="arrivalInfo" title="到货信息">
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item :rules="[{required:true}]" label="销售要求到货时间" prop="saleArrivalTime">
                  <el-date-picker :placeholder="`销售要求到货时间`" class="wfull" v-model="form.saleArrivalTime" value-format="timestamp" />
                </el-form-item>
              </el-col>
            </el-row>
          </form-card>
          <buyingGoodsEdit
            :data="form"
            disabled
            :show="[
              'commodityCode','goodsPic','goodsName','categoryCode','className','specOne','configName','noteText','salesPrice','commodityNumber','taxRate','preTaxAmount','inventoryNumber'
            ]"
            id="commodityInfo"
            priceKey="salesPrice"
          />
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
          quotationCode: '', // 报价单
          saleArrivalTime: '', // 销售要求到货时间
          commodityList: []
        },
        this.params
      );
      return;
    },
    async save() {
      console.log(this.form);
      if (!this.form.commodityList || !this.form.commodityList.length) {
        return this.$message({ message: '无商品信息', type: 'warning' });
      } else {
        this.form.commodityList.map(
          item => (item.waitPurchaseNumber = item.commodityNumber)
        );
      }
      await this.$refs.form.validate();
      this.loading = true;
      try {
        await this.$api.seePsiPurchaseService.purchaseapplyorderSave(this.form);
        this.setEdit();
        this.close();
      } catch (error) {}
      this.loading = false;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>