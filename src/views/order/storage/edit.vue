/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-12 08:48:06
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
    <d-tabs :style="{
      maxHeight:maxHeight+'px'
    }">
      <d-tab-pane label="供应商信息" name="supplierInfo" />
      <d-tab-pane label="公司信息" name="companyInfo" />
      <d-tab-pane label="到货信息" name="arrivalInfo" v-if="form.source!='直发单'" />
      <d-tab-pane label="发货信息" name="deliverInfo" v-else />
      <d-tab-pane label="商品信息" name="commodityInfo" />
      <d-tab-pane label="收票滞纳金" name="paymentLate" />
      <d-tab-pane label="自定义信息" name="customInfo" />
      <d-tab-pane label="备注信息" name="extrasInfo" />
      <div>
        <el-form :model="form" class="p10" ref="form" size="mini" v-if="visible">
          <supplierInfo :data="form" @change="supplierChange" id="supplierInfo" />
          <companyInfo :data="form" id="companyInfo" />
          <arrivalInfo :data="form" id="arrivalInfo" ref="arrivalInfo" v-if="form.source!='直发单'" />
          <buyingDeliverInfo :data="form" id="deliverInfo" ref="deliverInfo" v-else />
          <buying-goods-edit
            :data="form"
            :hide="[
            'add','costAmount','waitPurchaseNumber','note'
          ]"
            id="commodityInfo"
          />
          <buying-goods-edit
            :data="form"
            :hide="[
             'costAmount','waitPurchaseNumber','note'
          ]"
            fkey="additionalCommodityList"
            v-if="form.source=='请购单'"
          />
          <paymentLate :data="form" id="paymentLate" />
          <order-storage-bill :data="form" id="billInfo" />
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
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    joinCode: String,
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
      form: {
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
  mounted() {
    console.log(this);
  },
  methods: {
    handleClick({ label, name }) {
      this.activeName = '';
    },
    close() {
      this.$emit('update:visible', false);
    },
    supplierChange(e) {
      this.$set(this.form.logistics, 'supplierLinkman', e.linkManName || '');
      this.$set(this.form.logistics, 'supplierPhone', e.phone || '');
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
      try {
        let {
          data: { commodityEntityList }
        } = await this.$api.seePsiPurchaseService[api[this.from]](
          null,
          this.joinCode
        );
        commodityList = commodityEntityList;
      } catch (error) {}
      return {
        commodityList,
        additionalCommodityList: [],
        logistics: {},
        financeConfig: {},
        source: this.from,
        joinCode: this.joinCode
      };
    },
    async save() {
      await this.$refs.form.validate();
      this.loading = true;
      try {
        if (!this.isEdit) {
          await this.$api.seePsiPurchaseService.purchaseputinSave(this.form);
        } else {
          await this.$api.seePsiPurchaseService.purchaseputinUpdate(this.form);
        }
      } catch (error) {}
      this.loading = false;
      console.log(this.form);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>