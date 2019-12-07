/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-07 15:17:33
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
      <span>{{invoiceType==1?'收票申请':'开票申请'}}</span>
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
          v-if="isDataReady"
        >
          <make-invoice-info
            :data="form"
            :hide="invoiceType==1?[]:['invoiceCoding','invoiceCode']"
            :invoiceType="invoiceType"
            id="invoice"
          />
          <make-buyer
            :data="form"
            id="buyer"
            prefix="purchase"
          />
          <make-buyer
            :data="form"
            id="saler"
            prefix="market"
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
import CollectGoodsMixin from './collect-goods';

export default {
  // 票据类型(1收票，0开票)
  props: ['invoiceType', 'id'],
  mixins: [VisibleMixin, CollectGoodsMixin],
  components: {},
  data() {
    return {
      form: {
        invoiceDetailList: [] // 发票列表
      },
      alwaysDropAndCopyForm: true // 在getDetail返回数据后，重新覆盖form
    };
  },
  computed: {
    totalInfo() {
      // prettier-ignore
      return (this.form.invoiceDetailList || []).reduce((data, item) => {
        // 金额合计：999.00
        // 价税合计：1999.00
        data.amount += +Number(+item.price * Number(item.quantity)).toFixed(2) || 0;
        data.taxTotal += +Number(+item.price * (1 + ((item.taxRate || 0) / 100)) * Number(item.quantity)).toFixed(2) || 0;
        return data;
      }, {
        amount: 0,
        taxTotal: 0
      });
    }
  },
  mounted() {
    this.salesshipmentGetShipmentCommodity();
  },
  watch: {
    visible: {
      handler(val) {
        if (val) {
          this.salesshipmentGetShipmentCommodity();
        }
      },
      immediate: true
    }
  },
  methods: {
    // 获取业务商品列表
    salesshipmentGetShipmentCommodity() {
      // invoiceType=1 是收票的时候才加载商品信息
      if (this.invoiceType == 0 && this.type != 'edit' && this.code) {
        this.$api.seePsiSaleService.salesshipmentGetShipmentCommodity({ code: this.code })
          .then(res => {
            let data = res.data || [];
            // type == 0是请求过来的商品信息
            data = data.map(item => {
              item.price = item.reference //销售单价
              item.quantity = item.commodityNumber //商品数量
              item.articleName = item.goodsName //商品名称
              item.type = 0;
              return item;
            });
            // this.form.invoiceDetailList = data
            this.$set(this.form, 'invoiceDetailList', data);
          });
      }
    },
    async getDetail() {
      if (this.invoiceType != 0 && this.code) {
        const {
          data
        } = await this.$api.seePsiPurchaseService.purchasestockorderGetByCode(
          null,
          this.code
        );
        return data;
      }
      // 如果是开票
      else if (this.invoiceType == 0 && this.id) {
        const {
          data
        } = await this.$api.seePsiFinanceService.finvoicebillingInfo(
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
      // invoiceType = 0是开票 否则是收票
      this.form.type = this.invoiceType;

      this.form.accountTotalAmount = 0; // 合计税金
      this.form.commodityTotalAmount = 0; // 商品合计金额
      this.form.invoiceAmount = 0; // 票据金额
      this.form.taxTotalAmount = 0; // 税价合计金额
      this.form.busCode = this.code; // 业务code
      this.form.busType = 0 // 类型
      let totalCount = 0; // 商品总数量
      // prettier-ignore
      this.form.invoiceDetailList.map(item => {
        item.taxRate = item.taxRate || 0
        item.taxPrice = +Number(+item.price * (1 + (item.taxRate / 100))).toFixed(2) || 0;
        item.beforeTaxAmount = +Number(+item.price * Number(item.quantity)).toFixed(2) || 0;
        item.afterTaxAmount = +Number(+item.price * (1 + (item.taxRate / 100)) * Number(item.quantity)).toFixed(2) || 0;
        item.taxAmount = +Number(+item.price * (item.taxRate / 100) * Number(item.quantity)).toFixed(2) || 0;
        totalCount += Number(item.quantity || 0)

        this.form.accountTotalAmount += item.taxAmount;
        this.form.commodityTotalAmount += item.beforeTaxAmount;
        this.form.invoiceAmount += item.afterTaxAmount;
        this.form.taxTotalAmount += item.afterTaxAmount;
      });
      if (!(totalCount > 0)) {
        return this.$message({
          message: '货物总数量不能为空',
          showClose: true,
          type: 'warning'
        });
      }

      this.loading = true;
      try {
        if (this.isEdit) {
          let api = 'finvoicebillingUpdate';
          // 如果是收票编辑
          if (this.invoiceType == 1) {
            this.form.busType = 0
            api = 'finvoicereceivableUpdate';
          }
          await this.$api.seePsiFinanceService[api](this.form);
        } else {
          let api = 'finvoicebillingSave';
          // 如果是收票 保存
          if (this.invoiceType == 1) {
            this.form.busType = 0
            api = 'finvoicereceivableSave';
          }
          await this.$api.seePsiFinanceService[api](this.form);
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
