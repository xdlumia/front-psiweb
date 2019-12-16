/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-16 16:35:28
 * @Description: 生成请购单
*/
<template>
  <el-dialog
    :visible="visible"
    @close="close"
    v-dialogDrag
    v-loading="loading"
  >
    <div slot="title">
      <span>生成请购单</span>
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
            :params="{busCode:rowData.quotationCode,busType:1,putawayType:0}"
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
        attachList: [],
        commodityList: [],
        fieldList: [],
        isDelete: '',// 9,
        note: '',// "示例：备注信息",
        personInChargeId: '',// 100000,
        purchaseApplyCode: '',// "示例：请购单编号",
        purchaseArrivalTime: '',// 1572346044931,
        purchaseBorrow: '',// 0,
        quotationCode: '',// "示例：报价单",
        saleArrivalTime: this.rowData.salesExpectedShipmentsTime,// 报价单里生成请购单的时候带入预计发货日期
      }
    };
  },
  mounted() { },
  methods: {
    save() {
      if (!this.form.commodityList.length) {
        this.$message({
          message: '库存充足,不能生成请购单',
          type: 'error',
          showClose: true,
        });
        return
      }
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