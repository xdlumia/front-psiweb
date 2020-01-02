/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2020-01-02 13:53:59
 * @Description: 销售和采购调价单
*/
<template>
  <el-dialog
    :visible="showEditPage"
    @close="close"
    v-dialogDrag
    v-loading="loading"
  >
    <div slot="title">
      <span>调价单{{from?`(${from})`:''}}</span>
      <span class="fr mr20">
        <el-button
          @click="save"
          size="mini"
          type="primary"
        >保存</el-button>
        <el-button
          @click="close"
          size="mini"
        >关闭</el-button>
      </span>
    </div>
    <d-tabs :style="{maxHeight:'calc(100vh - 110px)'}">
      <d-tab-pane
        label="商品信息"
        name="commodityInfo"
      />
      <d-tab-pane
        label="备注信息"
        name="extrasInfo"
      />
      <div>
        <el-form
          :model="form"
          class="p10"
          ref="form"
          v-if="form&&visible"
        >
          <buying-goods-edit
            :customColumns="customColumns"
            :data="form"
            :show="[
              'commodityCode','goodsName','goodsPic','categoryCode','className','specOne','action','!fullscreen'
            ]"
            :sort="sort"
            :showSummary="false"
            :preChooseGoodCheck="preChooseGoodCheck"
            title="商品信息"
          >
            <template
              slot="adjustPriceMoney"
              slot-scope="{row,info,formProp}"
            >
              <el-form-item
                :prop="formProp"
                :rules="[{required:true},{type:'price'},{validator:checkAdjustPrice.bind(this,row)}]"
                v-if="!info.isChild"
              >
                <el-input
                  size="mini"
                  @input="adjustPriceMoneyChange(row)"
                  v-model="row.adjustPriceMoney"
                ></el-input>
              </el-form-item>
            </template>
            <!-- 利润率率 -->
            <template
              slot="profitRate"
              slot-scope="{row,info,formProp}"
            >
              <el-form-item :prop="formProp">
                <el-input
                  @input="profitRateChange(row)"
                  size="mini"
                  type="number"
                  v-model="row.profitRate"
                ></el-input>
              </el-form-item>
            </template>
          </buying-goods-edit>
          <extrasInfo
            :data="form"
            id="extrasInfo"
          />
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
  props: {
    sort: {
      type: Array,
      default: () => ['commodityCode', 'goodsName', 'goodsPic', 'categoryCode', 'className', 'specOne', "purchaseAverage", "inventoryPrice", "adjustPriceMoney", "repertoryCost", "usableInventoryNum", "adjustPriceDifference	", "saleReferencePrice", "taxBeforeAdjustPrice", "profitRate", 'action']
    },
    hide: {
      type: Array,
      default: () => []
    },
    from: String, // 来源
    adjustPriceType: String,
  },
  computed: {
    // 使用calc属性
    // maxHeight() {
    //   return window.innerHeight - 130;
    // }
  },
  data() {
    return {
      customColumnsArray: [
        { label: '采购价(平均值)', key: 'purchaseAverage', prop: 'purchaseAverage', width: 140, format: (a, b) => Number(b.purchaseAverage || b.inventoryPrice).toFixed(2) },
        { label: '库存成本(税前)', key: 'inventoryPrice', prop: 'inventoryPrice', width: 140, },
        { label: '调整金额', key: 'adjustPriceMoney', prop: 'adjustPriceMoney', width: 120, slot: 'adjustPriceMoney' },
        {          label: '调整后库存成本(税前)', key: 'repertoryCost', prop: 'repertoryCost', width: 140,
          format: (a, b) => this.calcRepertoryCost(b)
        },
        { label: '库存数量', key: 'usableInventoryNum', prop: 'usableInventoryNum', width: 120, format: (a) => a || 0 },
        {          label: '调整差异', key: 'adjustPriceDifference	', prop: 'adjustPriceDifference	', width: 100,
          format: (a, b) => this.calcAdjustPriceDifference(b)
        },
        { label: '销售参考价（税前）', key: 'saleReferencePrice', prop: 'saleReferencePrice', width: 130, },
        { label: '调整后销售参考价（税前）', key: 'taxBeforeAdjustPrice', prop: 'taxBeforeAdjustPrice', width: 180, format: (a, b) => this.calcTaxBeforeAdjustPrice(b) },
        { label: '利润率%', key: 'profitRate', prop: 'profitRate', width: 120, slot: 'profitRate', },
      ],
      alwaysDropAndCopyForm: true, // 在getDetail返回数据后，重新覆盖form
    };
  },
  mounted() { },
  computed: {
    customColumns() {
      return this.customColumnsArray.filter(item => !this.hide.includes(item.prop))
    },
  },
  methods: {
    preChooseGoodCheck(goods){
      let canAdjustGoods = goods.filter(item=>item[this.adjustPriceType==1?'saleRefPriceConfig':'inventoryPriceConfig']==2);
      if(goods.length!=canAdjustGoods.length){
        this.$message({
          message:`商品${this.adjustPriceType==1?'销售参考价':'库存成本价'}为计算值，无法进行调价`,
          showClose:true,
          type:'warning'
        })
      }
      return canAdjustGoods;
    },
    getDetail() {
      if (this.rowData) return this.rowData;
      return {
        commodityList: []
      };
    },
    calcRepertoryCost(row) {
      return +Number(
        (+row.inventoryPrice || 0) + (+row.adjustPriceMoney || 0)
      ).toFixed(2);
    },
    calcTaxBeforeAdjustPrice(row) {
      return +Number(
        (+row.saleReferencePrice || 0) + (+row.adjustPriceMoney || 0)
      ).toFixed(2);
    },
    // 调整金额
    adjustPriceMoneyChange(row) {
      let taxBeforeAdjustPrice = (+row.saleReferencePrice || 0) + (+row.adjustPriceMoney || 0)
      let inventoryPrice = +row.inventoryPrice || 0
      row.profitRate = Number(
        (taxBeforeAdjustPrice - inventoryPrice) / inventoryPrice * 100
      ).toFixed(0);
    },
    // 调整利润率
    profitRateChange(row) {
      let inventoryPrice = + row.inventoryPrice || 0
      let profitRate = Number(row.profitRate) || 0
      row.adjustPriceMoney = (inventoryPrice * (1 + (profitRate / 100)) - (row.saleReferencePrice || 0)).toFixed(2);
    },
    calcAdjustPriceDifference(row) {
      return +Number(
        (+row.usableInventoryNum || 0) * (+row.adjustPriceMoney || 0)
      ).toFixed(2);
    },
    async save() {
      await this.$showFormError(this.$refs.form);
      let form = { ...this.form };
      form.adjustPriceDifference = 0
      form.commonAdjustPriceDetailedEntityList = form.commodityList.map(
        item => {
          form.adjustPriceDifference = form.adjustPriceDifference || 0;
          form.adjustPriceDifference += this.calcAdjustPriceDifference(item);
          return {
            adjustPriceMoney: item.adjustPriceMoney,
            adjustPriceDifference: this.calcAdjustPriceDifference(item),
            commodityCode: item.commodityCode,
            commodityId: item.commodityId,
            originalPrice: item.inventoryPrice,
            repertoryCost: this.calcRepertoryCost(item)
          };
        }
      );
      form.adjustPriceDifference = +Number(form.adjustPriceDifference).toFixed(
        2
      );
      form.adjustPriceType = this.adjustPriceType || 2;
      delete form.commodityList;
      this.loading = true;
      try {
        if (this.isEdit) {
          await this.$api.seePsiCommonService.commonadjustpriceUpdate(form);
        } else {
          await this.$api.seePsiCommonService.commonadjustpriceSave(form);
        }
        this.setEdit();
        this.close();
      } catch (error) { }
      this.loading = false;
    },
    checkAdjustPrice(row, rule, value, cb) {
      if (this.calcRepertoryCost(row) > 0) {
        cb();
      } else {
        cb(new Error('调整后金额不能为负' + this.calcRepertoryCost(row)));
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>