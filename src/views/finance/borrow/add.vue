/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-22 15:23:11
 * @Description: 新增借款
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
      <span>新增借款</span>
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
      <!-- 单据信息 -->
      <receipt-borrow-info
        :span="12"
        :hide="['borrowingCode']"
        :data="form"
      />
    </el-form>
  </el-dialog>
</template>
<script>
// 填写报价信息

import VisibleMixin from '@/utils/visibleMixin';
export default {
  prop: {
  },
  mixins: [VisibleMixin],
  components: {

  },
  data() {
    return {
      loading: false,
      // 新增orEdit框内容
      form: {
        borrower: '', //  "示例：借款人",
        borrowTime: '',
        borrowingAmount: '', //  借款金额
        companySettlementId: '', //  结算账户id
        companySettlementInfo: '',
        employeeId: '', //  100000,
        note: '', //  "示例：备注",
        returnDate: '', //  预计归还日期
        serialNumber: '', //  "示例：流水凭证号",
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
          let api = 'fborrowingUpdate'

          if (this.type == 'add') {
            api = 'fborrowingSave'
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
