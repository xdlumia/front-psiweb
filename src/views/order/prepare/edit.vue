/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-12 18:44:46
 * @Description: 新增备货单
*/
<template>
  <el-dialog :fullscreen="true" :visible="visible" @close="close" v-dialogDrag v-loading="loading" width="1000">
    <div slot="title">
      <span>新增备货单</span>
      <span class="fr mr20">
        <el-button @click="save" size="mini" type="primary">保存</el-button>
        <el-button @click="close" size="mini">关闭</el-button>
      </span>
    </div>
    <d-tabs :style="{
      maxHeight:maxHeight+'px'
    }">
      <d-tab-pane label="到货信息" name="arrivalInfo" />
      <d-tab-pane label="商品信息" name="commodityInfo" />
      <d-tab-pane label="自定义信息" name="customInfo" />
      <d-tab-pane label="备注信息" name="extrasInfo" />
      <div>
        <el-form :model="form" class="p10" ref="form" size="mini" v-if="visible">
          <form-card id="arrivalInfo" title="到货信息">
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item :rules="[{ required: true, trigger: 'blur' }]" label="采购预计到货时间" prop="purchaseArrivalTime">
                  <el-date-picker :placeholder="`请选择采购预计到货时间`" class="wfull" v-model="form.purchaseArrivalTime" value-format="timestamp" />
                </el-form-item>
              </el-col>
            </el-row>
          </form-card>
          <buyingGoodsEdit
            :data="form"
            :show="[
            'commodityCode','goodsPic','goodsName','categoryCode','className','specOne','configName','noteText','costAmount','commodityNumber','taxRate','preTaxAmount','inventoryNumber','action'
          ]"
            id="commodityInfo"
          />
          <customInfo :data="form" id="customInfo" />
          <extrasInfo :data="form" id="extrasInfo" />
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
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  data() {
    return {
      form: {
        // 附件 undefined
        attachList: [],
        // 商品信息 undefined
        commodityList: [],
        // 自定义字段 undefined
        fieldList: [],
        // 备注信息 示例：备注信息
        note: '',
        // 单据执行人 100000
        personInChargeId: '',
        // 采购预计到货时间 1572419862629
        purchaseArrivalTime: '',
        // 来源 示例：来源
        source: '新建',
        // 请购单编号 示例：请购单编号
        stockCode: ''
      }
    };
  },
  mounted() {},
  methods: {
    async getDetail() {
      if (this.code) {
        let {
          data
        } = this.$api.seePsiPurchaseService.purchasestockorderGetByCode(
          null,
          this.code
        );
        return data;
      } else if (this.rowData) return this.rowData;
    },
    async save() {
      await this.$refs.form.validate();
      this.loading = true;
      this.form.commodityList.map(item => {
        item.preTaxAmount = +Number(
          item.costAmount * (1 + item.taxRate) * item.commodityNumber || 0
        ).toFixed(2);
        item.waitPurchaseNumber = item.commodityNumber;
      });
      try {
        if (this.isEdit) {
          await this.$api.seePsiPurchaseService.purchasestockorderUpdate(
            this.form
          );
        } else {
          await this.$api.seePsiPurchaseService.purchasestockorderSave(
            this.form
          );
        }
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