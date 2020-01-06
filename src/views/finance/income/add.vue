/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-01-06 10:49:04
 * @Description: 新增收支流水
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
      <span>{{type=='add'?`新增流水`:`编辑:${codeSlice(code)}`}}</span>
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
      <receipt-info
        :incomeType="incomeType"
        :span="12"
        :hide="['incomeRecordCode']"
        :data="form"
        :accountTypes="accountTypes"
      />

      <!-- 备注信息 其他信息-->
      <extras-info :data="form" />
    </el-form>
  </el-dialog>
</template>
<script>
// 填写报价信息

import VisibleMixin from '@/utils/visibleMixin';
export default {
  props: {
    incomeType: {
      type: String,
      default: ''
    }, //来源 0收入流水  1支出流水
    accountTypes: Array,
  },
  mixins: [VisibleMixin],
  components: {

  },
  data() {
    return {
      loading: false,
      // 新增orEdit框内容
      form: {
        accountPhone: '',// 联系方式",
        accountDate: '', ///收款日期
        attachList: [],// 附件",
        companySettlementId: '', //公司结算账户id
        fbiiCode: '',// 账单编号
        feeType: '',// 费用类型",
        id: '',// ,
        incomeAmount: '',// 流水金额
        incomeRecordCode: '',// 流水编号",
        incomeType: +this.incomeType || 0,//收支类型    
        matchState: '',//匹配状态
        matchedAmount: '',// 已匹配金额
        note: '',// 备注",
        oppositeAccount: '',// 对方帐号",
        payMethod: '',// 付款方式",
        serialNumber: '',// 流水凭证号",
        unmatchAmount: '',// 5432109876.12
      }
    }
  },

  created() {
    // this.init()
  },
  mounted() {
    this.init()
  },
  computed: {

  },
  methods: {
    init() {
      if (this.rowData) {
        Object.assign(this.form, this.rowData);
      }
    },

    // 保存表单数据
    saveHandle() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          let api = 'revenuerecordSave' //默认收入流水
          // 如果是支出流水
          if (this.form.incomeType == 1) {
            api = 'payrecordSave'
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
