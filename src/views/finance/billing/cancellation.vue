<!--
 * @Author: 高大鹏
 * @Date: 2019-11-05 17:46:46
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-21 17:19:37
 * @Description: 新增报价单
 -->
<template>
  <div class>
    <el-dialog
      v-loading="loading"
      :visible.sync="visible"
      v-dialogDrag
      :show-close="false"
      width="1000px"
      title="新增库房"
    >
      <div slot="title" style="display:flex;">
        <h3 style="flex:1;text-align:center;">发票作废</h3>
        <div>
          <el-button type="primary" size="mini" @click="finvoicebillingCancellation">保存</el-button>
          <el-button size="mini" @click="$emit('update:visible', false)">关闭</el-button>
        </div>
      </div>
      <el-form ref="invoiceForm" size="mini" :model="invoiceForm"
:rules="invoiceFormRule">
        <form-card title="发票信息">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item prop="invoiceTypeCode" label="发票代码">
                <el-select size="mini" v-model="invoiceForm.invoiceTypeCode" class="wfull">
                  <el-option
                    v-for="(item, index) in quoteList"
                    :key="index"
                    :value="item.invoiceCoding"
                    :label="item.invoiceCoding"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="cancellationNum" class="obsolete-number">
                <div slot="label" style="flex:1;display: flex;justify-content:space-between;">
                  <span>作废数量</span>
                  <el-checkbox v-model="invoiceForm.checked" class="fr">连号</el-checkbox>
                </div>
                <el-input-number
                  v-model="invoiceForm.cancellationNum"
                  :min="1"
                  :max="10"
                  label="描述文字"
                  class="wfull"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="发票号码" class="incomeCode">
                <el-row style="width:100%" type="flex" :gutter="10">
                  <el-col :span="8" v-for="(item, index) in numberList" :key="index">
                    <el-form-item
                      :prop="'incomeCodeList.' + index"
                      :rules="[{ required: true, message: '请输入', trigger: 'change' },
          { pattern: /^\d{1,10}$/, message: '请输入最多十位整数', trigger: 'change' }]"
                    >
                      <el-input
                        v-model.trim.number="invoiceForm.incomeCodeList[index]"
                        :maxlength="10"
                        :disabled="index > 0 && invoiceForm.checked"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="作废备注">
                <el-input type="textarea" v-model="invoiceForm.increaseNumber" :maxlength="3"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </form-card>
      </el-form>
    </el-dialog>
  </div>
</template>

<script type='text/ecmascript-6'>
import invoiceMixin from '../invoice-mixins'

export default {
  mixins: [invoiceMixin],
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      invoiceForm: {
        id: '',
        checked: false,
        cancellationNum: 1,
        incomeCodeList: [0],
        invoiceTypeCode: ''
      },
      quoteList: [],
      invoiceFormRule: {
        invoiceTypeCode: { required: true, message: '请选择', trigger: 'change' },
        invoiceSum: { required: true, message: '请选择', trigger: 'blur' },
        cancellationNum: { required: true, message: '请选择', trigger: 'change' }
      },
      loading: false
    }
  },
  components: {
  },
  watch: {
    watchVal(newValue, oldValue) {
      if (newValue.cancellationNum < this.invoiceForm.incomeCodeList.length) {
        this.invoiceForm.incomeCodeList.splice(newValue.cancellationNum)
      }
      if (newValue.checked) {
        this.handlerIncomeCodeList()
      }
    },
    startIncomeCode(newValue, oldValue) {
      if (newValue !== oldValue && this.invoiceForm.checked) {
        this.handlerIncomeCodeList()
      }
    }
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    },
    numberList() {
      return Array.from({ length: this.invoiceForm.cancellationNum }, (item, index) => index)
    },
    // 数量和连号改变
    watchVal() {
      const { cancellationNum, checked } = this.invoiceForm
      return { cancellationNum, checked }
    },
    startIncomeCode() {
      return this.invoiceForm.incomeCodeList[0]
    }
  },
  mounted() {
    this.finvoicedatumList()
  },
  methods: {
    handlerIncomeCodeList() {
      this.invoiceForm.incomeCodeList = this.numberList.map((item, index) => {
        return parseFloat(this.invoiceForm.incomeCodeList[0] || 0) + index
      })
    },
    finvoicedatumList() {
      this.$api.seePsiFinanceService.finvoicedatumList({ page: 1, limit: 999 }).then(res => {
        console.log(res)
        this.quoteList = res.data
      })
    },
    finvoicebillingCancellation() {
      this.$refs.invoiceForm.validate(valid => {
        if (valid) {
          this.loading = true
          const method = 'finvoicebillingCancellation'
          this.$api.seePsiFinanceService[method](this.invoiceForm).then(res => {
            this.$emit('refresh')
            this.$emit('update:visible', false)
          }).finally(() => { this.loading = false })
        }
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.obsolete-number {
  /deep/ .el-form-item__label {
    width: 100%;
    display: flex;
  }
}
/deep/ .el-row--flex {
  flex-wrap: wrap;
}
/deep/ .incomeCode {
  .el-form-item__label::before {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
  }
}
</style>
