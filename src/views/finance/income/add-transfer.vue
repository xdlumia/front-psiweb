/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-21 17:43:50
 * @Description: 新增转账单
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
      <span>新增转账单</span>
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
      style="max-height:calc(100vh - 110px)"
    >
      <!-- 转账单表单 -->
      <transferForm :data="form" />
    </el-form>
  </el-dialog>
</template>
<script>
// 填写报价信息

import VisibleMixin from '@/utils/visibleMixin';
import transferForm from './add-transfer-form'
export default {
  prop: {
    incomeType: {
      type: Number,
      default: 0, //来源 0收入流水  1支出流水
    }
  },
  mixins: [VisibleMixin],
  components: {
    transferForm
  },
  data() {
    return {
      loading: false,
      // 新增orEdit框内容
      form: {
        amount: '',// 金额
        companytleSetmentId: '', //转出结算账户id
        companySettlementInfo: '', //转出结算账户信息
        oppositeAccount: '',// 转出帐号
        intOppositeAccount: '',//转入帐号
        intoCompanySettlementId: '',//转入结算账户信息
        intoCompanySettlementInfo: '',// "100000",

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
  methods: {

    // 保存表单数据
    saveHandle() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          let api = 'revenuerecordInsertTransfer' //默认收入流水
          // 如果是支出流水
          if (this.incomeType == 1) {
            api = 'payrecordInsertTransfer'
          }
          this.$api.seePsiFinanceService[api](this.form)
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
