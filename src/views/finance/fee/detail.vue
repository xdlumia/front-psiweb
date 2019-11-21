<!--
 * @Author: 高大鹏
 * @Date: 2019-11-06 14:07:33
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-20 20:09:55
 * @Description: description
 -->
<template>
  <sideDetail
    :status="status"
    :visible.sync="showPop"
    @close="$emit('update:visible',false)"
    :title="'费用单编号' + code"
    width="990px"
    v-loading="loading"
  >
    <template slot="button">
      <el-button size="mini" v-if="buttonState == -1" type="primary"
@click="showEdit = true">编辑</el-button>
      <el-button
        size="mini"
        v-if="buttonState == -1"
        type="danger"
        @click="fcostDelete(rowData.id)"
      >删除</el-button>
      <el-button
        size="mini"
        v-if="buttonState == -1 || buttonState == 3"
        type="primary"
        @click="fcostSubmitApproval(rowData.id)"
      >提交审核</el-button>
      <el-button
        size="mini"
        v-if="buttonState == 0"
        type="primary"
        @click="fcostPassApproval(rowData.id)"
      >通过</el-button>
      <el-button
        size="mini"
        v-if="buttonState == 0"
        type="danger"
        @click="fcostReject(rowData.id)"
      >驳回</el-button>
      <el-button
        size="mini"
        v-if="buttonState == 1"
        type="primary"
        @click="fcostAuditApproval(rowData.id)"
      >复核通过</el-button>
      <el-button
        size="mini"
        v-if="buttonState == 1"
        type="danger"
        @click="fcostReject(rowData.id)"
      >复核驳回</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view">
      <el-tab-pane label="详情">
        <el-form disabled size="mini">
          <approve-panel :data="detailForm"></approve-panel>
          <receiptsInfo :data="detailForm" :detail="true"></receiptsInfo>
          <extras-info :data="detailForm" id="extrasInfo" />
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="应收账单">应收账单</el-tab-pane>
      <el-tab-pane label="应付账单">应付账单</el-tab-pane>
      <el-tab-pane label="费用分摊单">费用分摊单</el-tab-pane>
    </el-tabs>
    <add
      :visible.sync="showEdit"
      ref="add"
      v-if="showEdit"
      @refresh="refresh"
      :detailForm="detailForm"
    ></add>
  </sideDetail>
</template>

<script>
import add from './add'
import receiptsInfo from './components/receipts-info'
const stateText = {
  '-1': '新建',
  '0': '审核中',
  '1': '待复核',
  '2': '已通过',
  '3': '已驳回',
  '4': '部分分摊',
  '5': '已分摊'
}

export default {
  components: {
    add,
    receiptsInfo
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
      type: String,
      default: ''
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
        { label: '收支状态', value: this.rowData.costType ? '支出' : '收入' },
        { label: '金额', value: this.rowData.amount },
        { label: '费用类型', value: this.rowData.feeTypeCode, dictName: 'ZD_DY_LX' },
        { label: '费用明细类型', value: this.rowData.feeDetailCode, dictName: 'ZD_DY_LX' }
      ]
    }
  },
  mounted() {
    this.checkVisible();
    this.detailForm = Object.assign(this.detailForm, this.rowData)
    this.fcostGetInfoByCode()
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
      this.fcostGetInfoByCode()
      this.$emit('refresh')
    },
    checkVisible() {
      this.showPop = this.visible;
    },
    fcostGetInfoByCode() {
      this.loading = true
      this.$api.seePsiFinanceService.fcostGetInfoByCode({ code: this.code }).then(res => {
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
        this.$api.seePsiFinanceService.fcostAuditApproval({ id, processType: 'psi_finance_cost_01', apprpvalNode: this.detailForm.apprpvalNode }).then(res => {
          this.refresh()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    fcostReject(id) {
      this.$confirm(`是否驳回`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.seePsiFinanceService.fcostReject({ id, processType: 'psi_finance_cost_01', apprpvalNode: this.detailForm.apprpvalNode }).then(res => {
          this.refresh()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    fcostPassApproval(id) {
      this.$confirm(`是否审核通过`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.seePsiFinanceService.fcostPassApproval({ id, processType: 'psi_finance_cost_01', apprpvalNode: this.detailForm.apprpvalNode }).then(res => {
          this.refresh()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    fcostSubmitApproval(id) {
      this.$confirm(`是否提交审核`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.seePsiFinanceService.fcostSubmitApproval({ id, processType: 'psi_finance_cost_01' }).then(res => {
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
          this.fcostGetInfoByCode()
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
