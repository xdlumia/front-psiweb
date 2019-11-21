/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-21 19:38:08
 * @Description: 新增收入流水
*/
<template>
  <el-dialog
    :visible.sync="showPop"
    width="1120px"
    v-dialogDrag
  >
    <div slot="title">
      <span>选择应收账单</span>
      <div class="fr mr30">
        <el-button
          type="primary"
          @click="saveHandle"
          size="mini"
        >确定</el-button>
        <el-button
          @click="$emit('update:visible', false)"
          size="mini"
        >取消</el-button>
      </div>
    </div>

    <financeReceivable
      @selection-change="selectionChange"
      :button="false"
    />
  </el-dialog>
</template>
<script>
// 填写报价信息

export default {
  props: ['visible', 'rowData'],
  components: {

  },
  data() {
    return {
      form: {
        fbillId: '', //账单id
        incomeRecordId: this.rowData.id, //流水id
        matchAmount: '',//匹配金额
      }
    }
  },

  created() {
    // this.init()
  },
  mounted() {

  },
  computed: {
    showPop: {
      get() {
        return this.visible
      },
      set() {
        this.$emit('update:visible', false)
      },
    }
  },
  methods: {
    selectionChange(val) {
      let [row] = val
      this.form.fbillId = row.id
      this.form.matchAmount = row.billTotalAmount
    },
    saveHandle() {
      if (!this.form.fbillId) {
        this.$message({
          message: '请选择账单',
          type: 'error',
          showClose: true,
        });
        return
      }
      this.$api.seePsiFinanceService.revenuerecordRoutedMatching(this.form)
        .then(res => {
          this.$emit('reload')
        })
    },

  }
}
</script>
<style lang="scss" scoped>
</style>
