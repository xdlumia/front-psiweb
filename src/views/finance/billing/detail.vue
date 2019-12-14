<!--
 * @Author: 高大鹏
 * @Date: 2019-11-06 14:07:33
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-12-14 18:16:23
 * @Description: description
 -->
<template>
  <sideDetail
    :status="status"
    :visible.sync="showPop"
    @close="$emit('update:visible',false)"
    :title="'发票号码：' + (rowData.invoiceCode || '未确定发票号码')"
    width="990px"
    v-loading="loading"
  >
    <template slot="button">
      <el-button
        size="mini"
        v-if="buttonState == -1"
        type="primary"
        @click="collectInvoiceVisible = true && authorityButtons.includes('psi_billing_1008')"
      >编辑</el-button>
      <el-button
        size="mini"
        v-if="buttonState == -1 && authorityButtons.includes('psi_billing_1009')"
        type="danger"
        @click="finvoicebillingDelete(rowData.id)"
      >删除</el-button>
      <el-button
        size="mini"
        v-if="(buttonState == -1 || buttonState == 1) && authorityButtons.includes('psi_billing_1003')"
        type="primary"
        @click="finvoicebillingSubmitApproval(rowData.id)"
      >提交审核</el-button>
      <el-button
        size="mini"
        v-if="buttonState == 0 && authorityButtons.includes('psi_billing_1004')"
        type="primary"
        @click="finvoicebillingPassApproval(rowData.id)"
      >通过</el-button>
      <el-button
        size="mini"
        v-if="buttonState == 0 && authorityButtons.includes('psi_billing_1005')"
        type="danger"
        @click="finvoicebillingReject(rowData.id)"
      >驳回</el-button>
      <el-button
        size="mini"
        v-if="buttonState == 0 && authorityButtons.includes('psi_billing_1006')"
        type="primary"
        @click="finvoicebillingCancel(rowData.id)"
      >撤销审核</el-button>
      <el-button size="mini" v-if="buttonState == 2" type="primary" @click="showBilling = true">开票</el-button>
      <el-button
        size="mini"
        v-if="buttonState == 3 && authorityButtons.includes('psi_billing_1002')"
        type="danger"
        @click="finvoicebillingDilution(rowData.id)"
      >发票冲红</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view" v-model="activeTab">
      <el-tab-pane label="详情" name="detail">
        <el-form disabled size="mini" v-if="activeTab == 'detail' && !loading">
          <approve-panel ref="approve" :busType="59" :id="detailForm.id" :data="detailForm"></approve-panel>
          <!-- 开票申请 -->
          <make-invoice-info :invoiceType="0" :data="detailForm" id="invoice" />
          <make-buyer disabled :data="detailForm" id="saler" prefix="purchase" />
          <make-buyer disabled :data="detailForm" id="buyer" prefix="market" />
          <make-goods disabled :data="detailForm" id="goods" />
          <make-goods-card disabled :data="detailForm" />
          <extras-info disabled :data="detailForm" id="extrasInfo" />
        </el-form>
      </el-tab-pane>
      <el-tab-pane
        :label="busInfo[detailForm.busType].title"
        :name="busInfo[detailForm.busType].listPage"
        v-if="detailForm.busCode&&busInfo[detailForm.busType]"
      >
        <FullscreenWrap v-if="activeTab == busInfo[detailForm.busType].listPage">
          <component
            :button="false"
            :is="busInfo[detailForm.busType].listPage"
            :params="{page:1,limit:15,[busInfo[detailForm.busType].codeFilterKey]:detailForm.busCode,relationCode:detailForm.busCode}"
          />
        </FullscreenWrap>
      </el-tab-pane>
    </el-tabs>
    <billing
      :visible.sync="showBilling"
      ref="add"
      v-if="showBilling"
      @refresh="refresh"
      :detailForm="detailForm"
    ></billing>
    <!-- 开票申请 -->
    <collectInvoice
      :visible.sync="collectInvoiceVisible"
      :rowData="rowData"
      :invoiceType="0"
      @reload="refresh"
      type="edit"
      :id="rowData.id"
    />
  </sideDetail>
</template>

<script>
import billing from './billing'
import collectInvoice from '@/views/finance/receipt/collect-invoice'
import BusMixin from '@/views/finance/payment/busMixin';

const stateText = {
  '-1': '新建',
  '0': '审核中',
  '1': '已驳回',
  '2': '待开票',
  '3': '已开票',
  '4': '已作废',
  '5': '已冲红'
}

export default {
  mixins: [BusMixin],
  components: {
    billing,
    collectInvoice
  },
  props: {
    visible: Boolean,
    rowData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    code: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      activeTab: 'detail',
      collectInvoiceVisible: false,
      showBilling: false,
      showEdit: false,
      loading: true,
      showPop: false,
      detailForm: { state: '' },
      status: [
        { label: '状态', value: stateText[this.rowData.state] },
        { label: '发票类型', value: this.rowData.invoiceTypeCode, dictName: 'CW_FP_LX' },
        { label: '商品金额', value: this.rowData.commodityTotalAmount },
        { label: '开票金额', value: this.rowData.invoiceAmount },
        { label: '购方名称', value: this.rowData.purchaseName }
      ]
    }
  },
  mounted () {
    this.checkVisible();
    this.detailForm = Object.assign(this.detailForm, this.rowData)
    this.finvoicebillingInfo()
  },
  computed: {
    buttonState () {
      return this.detailForm.state
    }
  },
  watch: {
    visible () {
      this.checkVisible();
    }
  },
  methods: {
    refresh () {
      this.finvoicebillingInfo()
      this.$refs.approve && this.$refs.approve.processtaskQueryProcessHistoryEntity()
      this.$emit('refresh')
    },
    checkVisible () {
      this.showPop = this.visible;
    },
    finvoicebillingInfo () {
      this.loading = true
      this.$api.seePsiFinanceService.finvoicebillingInfo(null, this.code).then(res => {
        this.detailForm = res.data
        this.status[0].value = stateText[res.data.state]
      }).finally(() => {
        this.loading = false
      })
    },
    fcostAuditApproval (id) {
      this.$confirm(`是否复核通过`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.seePsiFinanceService.fcostAuditApproval({ id, processType: 'psi_billing', apprpvalNode: this.detailForm.apprpvalNode }).then(res => {
          this.refresh()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    finvoicebillingReject (id) {
      this.$prompt(`是否驳回`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        inputType: 'textarea',
        inputValidator (value) {
          if (value && value.length < 200) {
            return true;
          } else return `请填写驳回原因且字数不能超过200字`;
        }

      }).then(({ value }) => {
        this.$api.seePsiFinanceService.finvoicebillingReject({ id, processType: 'psi_billing', apprpvalNode: this.detailForm.apprpvalNode, note: value }).then(res => {
          this.refresh()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    finvoicebillingPassApproval (id) {
      this.$confirm(`是否审核通过`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.seePsiFinanceService.finvoicebillingPassApproval({ id, processType: 'psi_billing', apprpvalNode: this.detailForm.apprpvalNode }).then(res => {
          this.refresh()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    finvoicebillingCancel (id) {
      this.$confirm(`是否撤销审核`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.seePsiFinanceService.finvoicebillingCancel({ id, processType: 'psi_billing', apprpvalNode: this.detailForm.apprpvalNode }).then(res => {
          this.refresh()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    finvoicebillingSubmitApproval (id) {
      this.$confirm(`是否提交审核`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.seePsiFinanceService.finvoicebillingSubmitApproval({ id, processType: 'psi_billing' }).then(res => {
          this.refresh()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    finvoicebillingDelete (id) {
      this.$confirm(`是否删除`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.seePsiFinanceService.finvoicebillingDelete({ id }).then(res => {
          this.$emit('update:visible', false)
          this.$emit('refresh')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    finvoicebillingDilution () {
      this.$confirm(`是否进行发票冲红`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const ids = [this.detailForm.id]
        const incomeCodeList = [this.detailForm.invoiceCode]
        this.$api.seePsiFinanceService.finvoicebillingDilution({ ids, incomeCodeList }).then(res => {
          this.refresh()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
