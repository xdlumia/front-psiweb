/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-08 09:57:05
 * @Description: 采购入库单
*/
<template>
  <el-dialog :visible="visible" @close="close" v-dialogDrag>
    <div slot="title">
      <span>采购入库单{{from?`(${from})`:''}}</span>
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
      <d-tab-pane label="到货信息" name="arrivalInfo" />
      <d-tab-pane label="商品信息" name="commodityInfo" />
      <d-tab-pane label="收票滞纳金" name="paymentLate" />
      <d-tab-pane label="自定义信息" name="customInfo" />
      <d-tab-pane label="备注信息" name="extrasInfo" />
      <div>
        <el-form :model="form" class="p10" ref="form" size="mini" v-if="visible">
          <supplierInfo :data="form" @change="supplierChange" id="supplierInfo" />
          <companyInfo :data="form" id="companyInfo" />
          <arrivalInfo :data="form" id="arrivalInfo" ref="arrivalInfo" />
          <commodityInfo :data="form" id="commodityInfo" />
          <commodityInfo :data="form" />
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
        // 商品信息 undefined
        commodityList: [],
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
    close() {
      this.$emit('update:visible', false);
    },
    supplierChange(e) {
      console.log(e);
      this.$set(this.form.logistics, 'supplierLinkman', e.linkManName || '');
      this.$set(this.form.logistics, 'supplierPhone', e.phone || '');
    },
    save() {
      this.$refs.form.validate();
      console.log(this.form);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>