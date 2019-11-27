<!--
 * @Author: 高大鹏
 * @Date: 2019-11-06 14:07:33
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-26 15:35:13
 * @Description: description
 -->
<template>
  <sideDetail
    :status="status"
    :visible.sync="showDetailPage"
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
        @click="fcostDelete(detailForm.id)"
      >删除</el-button>
      <el-button
        size="mini"
        v-if="buttonState == -1 || buttonState == 3"
        type="primary"
        @click="fcostSubmitApproval(detailForm.id)"
      >提交审核</el-button>
      <el-button
        size="mini"
        v-if="buttonState == 0"
        type="primary"
        @click="fcostPassApproval(detailForm.id)"
      >通过</el-button>
      <el-button
        size="mini"
        v-if="buttonState == 0"
        type="danger"
        @click="fcostReject(detailForm.id)"
      >驳回</el-button>
      <el-button
        size="mini"
        v-if="buttonState == 1"
        type="primary"
        @click="fcostAuditApproval(detailForm.id)"
      >复核通过</el-button>
      <el-button
        size="mini"
        v-if="buttonState == 1"
        type="danger"
        @click="fcostReject(detailForm.id)"
      >复核驳回</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view" v-model="activeTab">
      <el-tab-pane label="详情" name="detail">
        <el-form disabled size="mini">
          <approve-panel :data="detailForm"></approve-panel>
          <receiptsInfo :data="detailForm" :detail="true"></receiptsInfo>
          <extras-info :data="detailForm" id="extrasInfo" />
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="应收账单" name="receivable">
        <FullscreenWrap v-if="showDetailPage&&!loading&&activeTab=='receivable'">
          <FinanceReceivable :button="false" :params="{page:1,limit:15,busCode:code}" />
        </FullscreenWrap>
      </el-tab-pane>
      <el-tab-pane label="应付账单" name="payable">
        <FullscreenWrap v-if="showDetailPage&&!loading&&activeTab=='payable'">
          <FinancePayable :button="false" :params="{page:1,limit:15,busCode:code}" />
        </FullscreenWrap>
      </el-tab-pane>
      <el-tab-pane label="费用分摊单" name="cost">
        <FullscreenWrap v-if="showDetailPage&&!loading&&activeTab=='cost'">
          <SalesApportion :button="false" :params="{page:1,limit:15,costCode:code}" />
        </FullscreenWrap>
      </el-tab-pane>
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
      activeTab: 'detail',
      showEdit: false,
      loading: false,
      showDetailPage: false,
      detailForm: { state: '' },
      status: []
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
      this.showDetailPage = this.visible;
    },
    fcostGetInfoByCode() {
      this.loading = true
      this.$api.seePsiFinanceService.fcostGetInfoByCode({ code: this.code }).then(res => {
        this.detailForm = res.data
        // this.status[0].value = stateText[res.data.state]
        this.status = [
          { label: '状态', value: stateText[this.detailForm.state] },
          { label: '收支状态', value: this.detailForm.costType ? '支出' : '收入' },
          { label: '金额', value: this.detailForm.amount },
          { label: '费用类型', value: this.detailForm.feeTypeCode, dictName: 'ZD_DY_LX' },
          { label: '费用明细类型', value: this.detailForm.feeDetailCode, dictName: 'ZD_DY_LX' }
        ]
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
