<!--
 * @Author: 高大鹏
 * @Date: 2019-11-06 14:07:33
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-21 18:59:33
 * @Description: description
 -->
<template>
  <sideDetail
    :status="status"
    :visible.sync="showPop"
    @close="$emit('update:visible',false)"
    :title="'费用单编号' + rowData.invoiceCode"
    width="990px"
    v-loading="loading"
  >
    <template slot="button">
      <el-button
        size="mini"
        v-if="buttonState == -1"
        type="primary"
        @click="showEdit = true"
      >编辑</el-button>
      <el-button
        size="mini"
        v-if="buttonState == -1"
        type="danger"
        @click="fcostDelete(rowData.id)"
      >删除</el-button>
      <el-button
        size="mini"
        v-if="buttonState == -1 || buttonState == 1"
        type="primary"
        @click="finvoicebillingSubmitApproval(rowData.id)"
      >提交审核</el-button>
      <el-button
        size="mini"
        v-if="buttonState == 0"
        type="primary"
        @click="finvoicebillingPassApproval(rowData.id)"
      >通过</el-button>
      <el-button
        size="mini"
        v-if="buttonState == 0"
        type="danger"
        @click="finvoicebillingReject(rowData.id)"
      >驳回</el-button>
      <el-button
        size="mini"
        v-if="buttonState == 0"
        type="primary"
        @click="finvoicebillingCancel(rowData.id)"
      >撤销审核</el-button>
      <el-button
        size="mini"
        v-if="buttonState == 2"
        type="primary"
        @click="fcostAuditApproval(rowData.id)"
      >开票</el-button>
      <el-button
        size="mini"
        v-if="buttonState == 3"
        type="danger"
        @click="finvoicebillingReject(rowData.id)"
      >发票冲红</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view">
      <el-tab-pane label="详情">
        <el-form
          disabled
          size="mini"
        >
          <approve-panel :data="detailForm"></approve-panel>
          <extras-info
            :data="detailForm"
            id="extrasInfo"
          />
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="应收账单">应收账单</el-tab-pane>
      <el-tab-pane label="应付账单">应付账单</el-tab-pane>
      <el-tab-pane label="费用分摊单">费用分摊单</el-tab-pane>
    </el-tabs>
    <add
      :visible.sync="showEdit"
      ref="edit"
      v-if="showEdit"
      @refresh="refresh"
      :detailForm="detailForm"
    ></add>
  </sideDetail>
</template>

<script>
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
  components: {
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
  data() {
    return {
      showEdit: false,
      loading: false,
      showPop: false,
      detailForm: { state: '' },
      status: [
        { label: '状态', value: stateText[this.rowData.state] },
        { label: '发票类型', value: this.rowData.invoiceTyepCode, dictName: 'CW_FP_LX' },
        { label: '商品金额', value: this.rowData.commodityTotalAmount },
        { label: '开票金额', value: this.rowData.invoiceAmount },
        { label: '购方名称', value: this.rowData.purchaseName }
      ]
    }
  },
  mounted() {
    this.checkVisible();
    this.detailForm = Object.assign(this.detailForm, this.rowData)
    this.finvoicebillingInfo()
  },
  computed: {
    buttonState() {
      return this.detailForm.state
    }
  },
  watch: {
    visible() {
      this.checkVisible();
    }
  },
  methods: {
    refresh() {
      this.finvoicebillingInfo()
      this.$emit('refresh')
    },
    checkVisible() {
      this.showPop = this.visible;
    },
    finvoicebillingInfo() {
      this.loading = true
      this.$api.seePsiFinanceService.finvoicebillingInfo(null, this.code).then(res => {
        this.detailForm = res.data
        this.status[0].value = stateText[res.data.state]
      }).finally(() => {
        this.loading = false
      })
    },
    fcostAuditApproval(id) {
      this.$confirm(`是否复核通过`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.seePsiFinanceService.fcostAuditApproval({ id, processType: 'psi_invoice_002', apprpvalNode: this.detailForm.apprpvalNode }).then(res => {
          this.refresh()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    finvoicebillingReject(id) {
      this.$confirm(`是否驳回`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.seePsiFinanceService.finvoicebillingReject({ id, processType: 'psi_invoice_002', apprpvalNode: this.detailForm.apprpvalNode }).then(res => {
          this.refresh()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    finvoicebillingPassApproval(id) {
      this.$confirm(`是否审核通过`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.seePsiFinanceService.finvoicebillingPassApproval({ id, processType: 'psi_invoice_002', apprpvalNode: this.detailForm.apprpvalNode }).then(res => {
          this.refresh()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    finvoicebillingCancel(id) {
      this.$confirm(`是否提交审核`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.seePsiFinanceService.finvoicebillingCancel({ id, processType: 'psi_invoice_002', apprpvalNode: this.detailForm.apprpvalNode }).then(res => {
          this.refresh()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    finvoicebillingSubmitApproval(id) {
      this.$confirm(`是否提交审核`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.seePsiFinanceService.finvoicebillingSubmitApproval({ id, processType: 'psi_invoice_002' }).then(res => {
          this.refresh()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    fcostDelete(id) {
      this.$confirm(`是否删除`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.seePsiFinanceService.fcostDelete({ id }).then(res => {
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
    commonquotationconfigUpdate(id, state) {
      this.$confirm(`是否${!state ? '启用' : '停用'}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.seePsiFinanceService.commonquotationconfigUpdate({ id, state }).then(res => {
          this.finvoicebillingInfo()
          this.$emit('refresh')
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
