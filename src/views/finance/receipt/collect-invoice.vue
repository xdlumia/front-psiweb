/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-26 14:52:14
 * @Description: 收票申请
*/
<template>
  <el-dialog
    :visible="visible"
    @close="close"
    v-dialogDrag
    v-loading="loading"
    width="1000"
  >
    <div slot="title">
      <span>收票申请</span>
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
    <d-tabs style="max-height:calc(100vh - 130px)">
      <d-tab-pane
        label="发票信息"
        name="invoice"
      />
      <d-tab-pane
        label="购买方信息"
        name="buyer"
      />
      <d-tab-pane
        label="销售方信息"
        name="saler"
      />
      <d-tab-pane
        label="发票内容"
        name="goods"
      />
      <d-tab-pane
        label="其他信息"
        name="extrasInfo"
      />
      <div>
        <el-form
          :model="form"
          class="p10"
          ref="form"
          size="mini"
          v-if="visible&&form&&showEditPage&&!loading"
        >
          <make-invoice-info
            :invoiceType="invoiceType"
            :data="form"
            id="invoice"
          />
          <make-buyer
            :data="form"
            id="buyer"
          />
          <make-buyer
            :data="form"
            from="供应商"
            id="saler"
            prefix="market"
            title="销售方信息"
          />
          <make-goods
            :data="form"
            id="goods"
          />
          <make-goods-card :data="form" />
          <div class="f14 mt10 d-text-gray">
            <div>金额合计：{{totalInfo.amount.toFixed(2)}} 元</div>
            <div>价税合计：{{totalInfo.taxTotal.toFixed(2)}} 元</div>
          </div>
          <extras-info
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
  // 票据类型(0收票，1开票)
  props: ['invoiceType', 'id'],
  mixins: [VisibleMixin],
  components: {},
  data() {
    return {
      form: {
        invoiceDetailList: [], //发票列表
      },
      alwaysDropAndCopyForm: true// 在getDetail返回数据后，重新覆盖form
    };
  },
  computed: {
    totalInfo() {
      // prettier-ignore
      return (this.form.invoiceDetailList || []).reduce((data, item) => {
        // 金额合计：999.00
        // 价税合计：1999.00 
        data.amount += +Number(+item.price * +item.quantity).toFixed(2) || 0;
        data.taxTotal += +Number(+item.price * (1 + (item.taxRate || 0 / 100)) * +item.quantity).toFixed(2) || 0;
        return data;
      }, {
        amount: 0,
        taxTotal: 0
      });
    }
  },
  mounted() { },
  methods: {
    async getDetail() {
      if (this.code || this.id) {
        let {
          data
        } = this.$api.seePsiPurchaseService.purchasestockorderGetByCode(
          null,
          this.id
        );
        return data;
      } else if (this.rowData) return this.rowData;
    },
    async save() {
      console.log(JSON.parse(JSON.stringify(this.form)));
      if (!this.form.invoiceDetailList || !this.form.invoiceDetailList.length) {
        return this.$message({
          message: '请添加货物信息',
          showClose: true,
          type: 'warning'
        });
      }
      await this.$refs.form.validate();
      // invoiceType = 1是开票 否则是收票
      if (this.invoiceType == 1) {
        this.form.type = 1;
      } else {
        this.form.type = 0;
      }

      this.loading = true;
      this.form.accountTotalAmount = 0; //合计税金
      this.form.commodityTotalAmount = 0; //商品合计金额
      this.form.invoiceAmount = 0; //票据金额
      this.form.taxTotalAmount = 0; //税价合计金额
      // prettier-ignore
      this.form.invoiceDetailList.map(item => {
        item.taxRate = item.taxRate || 0
        item.taxPrice =
          +Number(+item.price * (1 + (item.taxRate || 0 / 100))).toFixed(2) || 0;
        item.beforeTaxAmount =
          +Number(+item.price * +item.quantity).toFixed(2) || 0;
        item.afterTaxAmount =
          +Number(+item.price * (1 + (item.taxRate || 0 / 100)) * +item.quantity).toFixed(2) || 0;
        item.taxAmount =
          +Number(+item.price * (item.taxRate || 0 / 100) * +item.quantity).toFixed(2) || 0;

        this.form.accountTotalAmount += item.taxAmount;
        this.form.commodityTotalAmount += item.beforeTaxAmount;
        this.form.invoiceAmount += item.afterTaxAmount;
        this.form.taxTotalAmount += item.afterTaxAmount;
      });
      try {
        if (this.isEdit) {
          let api = 'finvoicereceivableUpdate'
          // 如果是开票编辑
          if (this.invoiceType == 1) {
            api = 'finvoicebillingUpdate'
          }
          await this.$api.seePsiFinanceService[api](this.form);
        } else {
          let api = 'finvoicereceivableSave'
          // 如果是开票 保存
          if (this.invoiceType == 1) {
            api = 'finvoicebillingSave'
          }
          await this.$api.seePsiFinanceService.finvoicereceivableSave(this.form);
        }
        this.setEdit();
        this.close();
      } catch (error) {
        console.error(error);
      }
      this.loading = false;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>