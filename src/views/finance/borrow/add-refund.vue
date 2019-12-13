/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-13 19:05:42
 * @Description: 新增还款
*/
<template>
  <el-dialog
    :visible.sync="showEditPage"
    width="820px"
    @close="close"
    v-dialogDrag
    v-loading="loading"
  >
    <!-- 确定按钮 -->
    <div slot="title">
      <span>新增还款</span>
      <div class="fr mr30">
        <el-button
          type="primary"
          @click="saveHandle"
          size="mini"
        >保存</el-button>
        <el-button
          @click="$emit('update:visible', false)"
          size="mini"
        >取消</el-button>
      </div>
    </div>
    <el-form
      ref="form"
      size="small"
      :model="form"
      label-position="top"
      class="d-auto-y"
      style="height:calc(100vh - 110px)"
    >
      <!-- 单据信息 -->
      <receipt-refund-info
        :span="12"
        :hide="['borrowingCode']"
        :data="form"
      />
      <div
        class="ar mt10 f14"
        style="color:#333"
      >
        <span class="mr20"> 借款金额:{{rowData.borrowingAmount | milliFormat}}</span>
        已还金额:<span :class="rowData.alreadyAmount>rowData.borrowingAmount?'d-text-red':''"> {{rowData.alreadyAmount | milliFormat}}</span>
      </div>
    </el-form>
  </el-dialog>
</template>
<script>
// 填写报价信息

import VisibleMixin from '@/utils/visibleMixin';
export default {
  prop: {
    incomeType: {
      type: Number,
      default: 0, //来源 0收入流水  1支出流水
    }
  },
  mixins: [VisibleMixin],
  components: {

  },
  data() {
    return {
      loading: false,
      // 新增orEdit框内容
      form: {
        borrowingCode: '',
        companySettlementId: '',//  结算账户id
        companySettlementInfo: '',// 示例：结算账户信息",
        repaymentAmount: '',//  还款金额
        repaymentDate: '',//  还款日期
        serialNumber: '',// 示例：流水凭证号"
        note: '',
      }
    }
  },

  created() {
    // this.init()
  },
  mounted() {

  },
  computed: {

  },
  watch: {
    // 当前还款金额
    'form.repaymentAmount': {
      handler(val) {
        let borrowingAmount = this.rowData.borrowingAmount //借款金额
        let alreadyAmount = this.rowData.alreadyAmount || 0 //已还金额
        if (val > (borrowingAmount - alreadyAmount)) {
          let calc = borrowingAmount - alreadyAmount
          this.form.repaymentAmount = calc
          this.$message({
            message: `还款金额不能大于${calc}`,
            type: 'error',
            showClose: true,
          });
        }
      },
      deep: true
    }
  },
  methods: {

    // 保存表单数据
    saveHandle() {
      this.form.borrowingCode = this.rowData.borrowingCode
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.$api.seePsiFinanceService.frepaymentrecordSave(this.form)
            .then(res => {
              this.setEdit()
              this.close()
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
