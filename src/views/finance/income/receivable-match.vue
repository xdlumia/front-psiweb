/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-14 19:55:01
 * @Description: 匹配
*/
<template>
  <el-dialog
    :visible.sync="showPop"
    width="1120px"
    v-dialogDrag
    v-loading="loading"
  >
    <div slot="title">
      <span>选择应收账单</span>
    </div>

    <financeReceivable
      class="dialog"
      @selection-change="selectionChange"
      :button="false"
    />
    <div class="ac">
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
      loading: false,
      form: {
        fbillId: '', //账单id
        incomeRecordId: this.rowData.id, //流水id
        matchAmount: this.rowData.incomeAmount,//匹配金额
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
      if (!row) return
      this.form.fbillId = row.id
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
      this.loading = true
      this.$api.seePsiFinanceService.revenuerecordRoutedMatching(this.form)
        .then(res => {
          this.$emit('reload')
          this.showPop = false
        })
        .finally(() => {
          this.loading = false
        })
    },

  }
}
</script>
<style lang="scss" scoped>
</style>
