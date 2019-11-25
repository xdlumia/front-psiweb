/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-25 10:17:06
 * @Description: 请购单
*/
<template>
  <el-dialog
    :visible="visible"
    @close="close"
    v-dialogDrag
    v-loading="loading"
  >
    <div slot="title">
      <span>新增请购单</span>
      <span class="fr mr20">
        <el-button
          @click="save"
          size="mini"
          type="primary"
        >保存</el-button>
        <el-button
          @click="close"
          size="mini"
        >取消</el-button>
      </span>
    </div>
    <d-tabs :style="{maxHeight:'calc(100vh - 110px)'}">
      <d-tab-pane
        label="发货信息"
        name="arrivalInfo"
      />
      <d-tab-pane
        label="商品信息"
        name="commodityInfo"
      />
      <d-tab-pane
        label="自定义信息"
        name="customInfo"
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
          size="mini"
          v-if="visible&&form"
        >
          <form-card
            id="arrivalInfo"
            title="到货信息"
          >
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item
                  :rules="[{required:true}]"
                  label="销售要求到货时间"
                  prop="saleArrivalTime"
                >
                  <el-date-picker
                    :placeholder="`销售要求到货时间`"
                    class="wfull"
                    v-model="form.saleArrivalTime"
                    value-format="timestamp"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </form-card>
          <goods-buying-quote
            :data="form"
            :params="{busCode:rowData.quotationCode,busType:1,putawayType:1}"
            id="commodityInfo"
          />
          <customInfo
            :data="form"
            id="customInfo"
            busType="27"
          ></customInfo>
          <extrasInfo
            :data="form"
            id="extrasInfo"
          ></extrasInfo>
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
  },
  data() {
    return {
      form: {
        attachList: [], //
        fieldList: [],
        note: '',// "备注信息",
        personInChargeId: '', //单据执行人id
        purchaseApplyCode: '', //请购单编号",
        purchaseArrivalTime: '', //采购预计到货时间
        purchaseBorrow: '', //采购借入（0,采购 1.借入
        quotationCode: '',  //"示例：报价单",
        saleArrivalTime: '', // 销售要求到货时间
        source: '',  //来源"
      }
    };
  },
  mounted() { },
  methods: {
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true;
          let params = Object.assign(this.form, this.params);
          this.$api.seePsiSaleService.salesquotationInsertPurchaseApplyOrder(params)
            .then(res => {
              this.setEdit();
              this.close();
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
</style>