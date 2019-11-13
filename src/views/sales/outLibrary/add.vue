/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-13 15:50:44
 * @Description: 编辑出库单
*/
<template>
  <el-dialog
    :visible.sync="showEditPage"
    width="920px"
    @close="close"
    v-dialogDrag
    v-loading="loading"
  >
    <!-- 确定按钮 -->
    <div slot="title">
      <span>{{type=='add'?'生成销售出库单':`编辑:${code}`}}</span>
      <div class="fr mr30">
        <el-button
          type="primary"
          @click="saveHandle('form')"
          size="mini"
        >保存</el-button>
        <el-button
          @click="$emit('update:visible', false)"
          size="mini"
        >取消</el-button>
      </div>
    </div>
    <el-form
      v-if="visible"
      ref="form"
      size="small"
      :model="form"
      label-position="top"
      class="d-auto-y"
      style="height:calc(100vh - 110px)"
    >
      <!-- 客户信息 -->
      <customerInfo :data="form" />
      <!-- 公司信息 -->
      <companyInfo :data="form" />
      <!-- 报价单信息 -->
      <quotationInfo>
        <el-tabs
          slot="tabs"
          v-model="activeName"
        >
          <el-tab-pane
            v-for="(item,index) of 5"
            :key="index"
            :label="`报价单${index}`"
            :name="index+''"
          ></el-tab-pane>
        </el-tabs>
        <div slot="body">
          <!-- 发货信息 -->
          <deliverInfo disabled />
          <!-- 商品信息 -->
          <buying-goods-edit disabled />
          <!-- 报价有效期 -->
          <payExpire disabled />
          <!-- 附加发票 -->
          <extrataxInfo disabled />
          <!-- 自定义信息 -->
          <customInfo disabled />
          <!-- 备注信息 -->
          <extrasInfo disabled />
        </div>
      </quotationInfo>

      <!-- 收款滞纳金 -->
      <paymentLate :data="form" />
      <!-- 账期信息 -->
      <billInfo :data="form" />
      <!-- 自定义信息 -->
      <customInfo :data="form" />
      <!-- 备注信息 -->
      <extrasInfo :data="form" />
    </el-form>
  </el-dialog>
</template>
<script>
// 填写报价信息
import VisibleMixin from '@/utils/visibleMixin';
import { log } from 'util';
export default {
  mixins: [VisibleMixin],
  components: {
  },
  data() {
    return {
      loading: false,
      currCompont: 'clientInfo',
      // 当前操作步骤
      steps: 1,
      clientno: '',
      activeName: 'first', // 数据源
      // 新增orEdit框内容
      form: {
        apprpvalNode: '', // 审核节点,
        attachList: [], // 附件",
        clientId: '', // 100000,
        contractTemplate: '', // 9,
        deptTotalCode: '', // 部门code",
        fieldList: [], // 自定义字段",
        isContract: '', // 有无合同,
        lateFeesId: '', // 收款滞纳金id
        note: '', // 备注",
        procurementExpectedArrivalTime: '', // 采购预计到货时间
        quotationIds: [
          // 0
        ],
        salesExpectedShipmentsTime: '', // 销售预计发货时间
        salesRequireArrivalTime: '', // 销售要求到货时间,
        shipmentFinanceSaveVoList: [
          // {
          //   busCode:'', // 业务编号",
          //   busType:'', // 9,
          //   feeDetailCode:'', // 费用明细",
          //   feeTypeCode:'', // 费用类型",
          //   isBillFee:'', // 0,
          //   payAmount:'', // 98765432109876.12,
          //   payTime:'', // 1572403069534,
          //   paymenDays:'', // 账期",
          //   paymentType:'', // 9
          // }
        ],
        source: '', // 来源",
        state: '', // 9,
        totalAmount: '', // 98765432109876.12,
        totalNumber: '', //
      },
    }
  },
  created() {
    // this.init()
  },
  mounted() {

  },
  computed: {

  },
  methods: {

    // 保存表单数据
    saveHandle() {
      this.$refs.form.validate(valid => {
        console.log(valid)
        if (valid) {
          this.loading = true
          // rules 表单验证是否通过
          let api = 'salesshipmentUpdate' // 默认编辑更新
          // 新增保存
          if (this.type === 'add') {
            api = 'salesshipmentSave'
            // 编辑保存
          }
          this.$api.seePsiSaleService[api](this.form)
            .then(res => {
              this.dialogMeta.visible = false
              this.$emit('submit', 'success')
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
