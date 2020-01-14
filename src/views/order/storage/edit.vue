/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2020-01-14 14:51:10
 * @Description: 采购入库单
*/
<template>
  <el-dialog :visible="visible" @close="close" v-dialogDrag v-loading="loading">
    <div slot="title">
      <span>采购入库单{{form.source?`(${form.source})`:''}}</span>
      <span class="fr mr20">
        <el-button @click="save" size="mini" type="primary">保存</el-button>
        <el-button @click="close" size="mini">关闭</el-button>
      </span>
    </div>
    <d-tabs style="max-height:calc(100vh - 130px)">
      <d-tab-pane label="供应商信息" name="supplierInfo" />
      <d-tab-pane label="公司信息" name="companyInfo" />
      <d-tab-pane label="到货信息" name="arrivalInfo" v-if="form.source!='直发单'" />
      <d-tab-pane label="发货信息" name="deliverInfo" v-else />
      <d-tab-pane label="商品信息" name="commodityInfo" />
      <d-tab-pane label="收票滞纳金" name="paymentLate" />
      <d-tab-pane label="自定义信息" name="customInfo" />
      <d-tab-pane label="备注信息" name="extrasInfo" />
      <div>
        <el-form :model="form" class="p10" label-position="top" ref="form" size="mini" v-if="visible">
          <supplierInfo :data="form" @change="supplierChange" id="supplierInfo" />
          <companyInfo :data="form" :disabled="['直发单','请购单'].includes(form.source)" id="companyInfo" />
          <arrivalInfo
            :data="form"
            :disables="form.source=='请购单'?['saleTime']:[]"
            :hide="form.source=='备货单'?['saleTime','collected']:['collected']"
            :labels="form.source=='直发单'?{
              saleTime:'销售预计发货时间'
            }:{}"
            id="arrivalInfo"
            ref="arrivalInfo"
            v-if="form.source!='直发单'"
          />
          <buyingDeliverInfo :data="form" id="deliverInfo" ref="deliverInfo" v-else />
          <buying-goods-edit
            :data="form"
            :show="[
              'commodityCode','goodsPic','goodsName','categoryCode','className','specOne','configName','noteText','purchasePrice','commodityNumber','taxRate','preTaxAmount','inventoryNumber','!add','action','isTax'
            ]"
            :sort="form.source=='备货单'?[]:['expanded']"
            @totalAmountChange="setGoodsTotalPrice(0,$event)"
            id="commodityInfo"
            priceKey="purchasePrice"
          />
          <buying-goods-edit
            :data="form"
            :show="[
              'commodityCode','goodsPic','goodsName','categoryCode','className','specOne','configName','noteText','purchasePrice','commodityNumber','taxRate','preTaxAmount','inventoryNumber','action'
            ]"
            :sort="form.source=='备货单'?[]:['expanded']"
            @totalAmountChange="setGoodsTotalPrice(1,$event)"
            fkey="additionalCommodityList"
            priceKey="purchasePrice"
            title="附加商品"
            v-if="form.source=='请购单'"
          />
          <buyingPaymentLate :data="form" id="paymentLate" />
          <order-storage-bill :data="form" :forceBillFee="form.source=='直发单'" :max="goodsTotalSum" id="billInfo" />
          <customInfo :data="form" busType="30" id="customInfo" />
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
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    joinCode: String,
    from: String, // 来源
    joinGoods: Array
  },
  computed: {},
  data() {
    return {
      activeName: '',
      goodsTotalPrice: [0, 0],
      goodsTotalSum: 0,
      alwaysDropAndCopyForm: true, // 在getDetail返回数据后，重新覆盖form
      form: {
        isTax: 0,
        // 流程审批状态（0 未审核 1审核中 2 完成 3 驳回） 0
        approvalState: '',
        // 到货信息 示例：到货信息
        arrivalInfo: '',
        // 附件 undefined
        attachList: [],
        // 公司发票账户id 100000
        companyAccountId: '',
        // 公司编码 示例：公司编码
        companyCode: '',
        // 公司结算账户id 100000
        companySettlementId: '',
        // 部门编码 示例：部门编码
        deptTotalCode: '',
        // 自定义字段 undefined
        fieldList: [],
        // 账期信息 undefined
        financeList: [],
        // 是否删除 9
        isDelete: '',
        // 请购/直发/备货单编号 示例：请购/直发/备货单编号
        joinCode: '',
        // 滞纳金方案 示例：滞纳金方案
        lateFee: '',
        // 滞纳金方案ID 100000
        lateFeeId: '',
        // 备注信息 示例：备注信息
        note: '',
        // 单据执行人 100000
        personInChargeId: '',
        // 采购预计到/发货时间 1572346044873
        purchaseTime: '',
        // 总计采购价 98765432109876.12
        putinAmount: '',
        // 入库单编号 示例：入库单编号
        putinCode: '',
        // 总计数量 9
        putinNum: '',
        // 销售预计到/发货时间 1572346044873
        saleTime: '',
        // 来源 示例：来源
        source: '',
        // 单据状态 9
        state: '',
        // 供应商ID 100000
        supplierId: '',
        // 商品信息 undefined
        commodityList: [],
        additionalCommodityList: [],
        logistics: {},
        financeConfig: {}
      }
    };
  },
  mounted() {},
  methods: {
    handleClick({ label, name }) {
      this.activeName = '';
    },
    setGoodsTotalPrice(index, total) {
      this.goodsTotalPrice[index] = total;
      this.goodsTotalSum = this.goodsTotalPrice.reduce((a, b) => (a += b), 0);
    },
    supplierChange(e) {
      if (!this.form.logistics) this.$set(this.form, 'logistics', {});
      if (!this.form.logistics.supplierLinkman) {
        this.$set(this.form.logistics, 'supplierLinkman', e.linkManName || '');
        this.$set(this.form.logistics, 'supplierPhone', e.phone || '');
      }
    },
    async getDetail() {
      if (this.code) {
        let {
          data
        } = await this.$api.seePsiPurchaseService.purchaseputinGetByCode(
          null,
          this.code
        );
        return data;
      } else if (this.rowData) {
        return this.rowData;
      } else if (this.joinCode) {
        return this.getCommodityList();
      }
    },
    // 获取入库商品信息
    async getCommodityList() {
      let commodityList = [];
      let api = {
        备货单: 'purchasestockorderGetByCode',
        请购单: 'purchaseapplyorderGetByCode',
        直发单: 'purchasedirectGetByCode'
      };
      let saleTime = '',
        clientId = '',
        clientName = '',
        clientLinkman = '',
        clientPhone = '',
        clientAddress = '';
      let companyData = {
        companyAccountId: '',
        companySettlementId: ''
      };
      try {
        let { data } = await this.$api.seePsiPurchaseService[api[this.from]](
          null,
          this.joinCode
        );
        commodityList = (data.commodityList || data.commodityEntityList)
          .filter(item => item.waitPurchaseNumber)
          .filter(item => this.joinGoods.includes(item.commodityCode))
          .map(item => {
            item.purchasePrice = item.costAmount;
            item.commodityNumber = item.waitPurchaseNumber;
            item.maxcommodityNumber = item.waitPurchaseNumber;
            return item;
          });
        if (this.from == '请购单') {
          saleTime = data.saleArrivalTime;
        } else if (this.from == '直发单') {
          saleTime = data.salesExpectedShipmentsTime;
          clientId = data.clientId;
          clientName = data.clientName;
          clientLinkman = data.clientLinkman;
          clientPhone = data.clientPhone;
          clientAddress = data.clientReceivingAddress;
        }
        if (data.quotationCode) {
          // 从报价单带入发票账号和结算账户
          let {
            data: quotation
          } = await this.$api.seePsiSaleService.salesquotationGetinfoByCode({
            quotationCode: data.quotationCode
          });
          Object.assign(companyData, {
            companyAccountId: quotation.companyAccountId,
            companySettlementId: quotation.companySettlementId
          });
        }
      } catch (error) {}
      return {
        ...companyData,
        isTax: 0,
        saleTime,
        commodityList,
        additionalCommodityList: [],
        logistics: {
          clientId,
          clientName,
          clientLinkman,
          clientPhone,
          clientAddress
        },
        financeConfig: {},
        source: this.from,
        joinCode: this.joinCode
      };
    },
    async save() {
      await this.$showFormError(this.$refs.form);
      this.loading = true;
      try {
        []
          .concat(
            this.form.commodityList || [],
            this.form.additionalCommodityList
          )
          .reduce((data, item) => {
            data.putinNum = data.putinNum || 0;
            data.putinNum += parseInt(item.commodityNumber) || 0;
            item.taxTotalAmount = +Number(
              item.purchasePrice *
                (1 + item.taxRate / 100) *
                item.commodityNumber || 0
            ).toFixed(2);
            return data;
          }, this.form);
        this.form.putinAmount = this.goodsTotalSum;
        if (!this.isEdit) {
          await this.$api.seePsiPurchaseService.purchaseputinSave(this.form);
        } else {
          await this.$api.seePsiPurchaseService.purchaseputinUpdate(this.form);
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