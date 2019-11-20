<!--
 * @Author: 高大鹏
 * @Date: 2019-11-05 17:46:46
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-19 18:39:13
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
        <h3 style="flex:1;text-align:center;">发票录入</h3>
        <div>
          <el-button type="primary" size="mini" @click="finvoicedatumSave">保存</el-button>
          <el-button size="mini" @click="$emit('update:visible', false)">关闭</el-button>
        </div>
      </div>
      <el-form ref="invoiceForm" size="mini" :model="invoiceForm"
:rules="invoiceFormRule">
        <form-card title="发票信息">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item prop="companyId" label="公司名称">
                <el-select
                  size="mini"
                  v-model="invoiceForm.companyId"
                  class="wfull"
                  @change="selectChange"
                >
                  <el-option
                    v-for="(item, index) in accountList"
                    :key="index"
                    :value="item.id"
                    :label="`${item.corporationName}(${item.commonCorporationAccountEntities[0] ? item.commonCorporationAccountEntities[0].account : ''})`"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发票额度" prop="invoiceSum">
                <d-select
                  v-model="invoiceForm.invoiceSum"
                  dicCode="PSI_GSSZ_FPZDXE"
                  size="mini"
                  disabled
                ></d-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="增票数量" prop="increaseNumber">
                <el-input v-model="invoiceForm.increaseNumber" :maxlength="3"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发票代码" prop="invoiceCoding">
                <el-input v-model="invoiceForm.invoiceCoding" :maxlength="12"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发票类型" prop="invoiceTypeCode">
                <d-select v-model="invoiceForm.invoiceTypeCode" dicCode="CW_FP_LX" size="mini"></d-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发票号码">
                <div style="display: flex;width:100%;">
                  <el-form-item prop="startCoding">
                    <el-input v-model="invoiceForm.startCoding" :maxlength="10"></el-input>
                  </el-form-item>
                  <span>~</span>
                  <el-form-item prop="endCoding">
                    <el-input v-model="invoiceForm.endCoding" :maxlength="10" disabled></el-input>
                  </el-form-item>
                </div>
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
        companyId: '',
        startCoding: '',
        endCoding: '',
        failureNumber: '',
        increaseNumber: '',
        invoiceCoding: '',
        invoiceTypeCode: '',
        useNumber: '',
        invoiceSum: ''
      },
      invoiceFormRule: {
        endCoding: [
          { required: true, message: '请输入', trigger: 'change' },
          { pattern: /^\d{1,10}$/, message: '最多十位整数', trigger: 'change' }
        ],
        startCoding: [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: /^\d{1,10}$/, message: '请输入最多十位整数', trigger: 'blur' }
        ],
        increaseNumber: [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: /^\d{1,3}$/, message: '请输入最多三位整数', trigger: 'blur' }
        ],
        invoiceCoding: [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: /^(?![^\da-zA-Z]+$).{0,12}$/i, message: '数字、字母、符号、12位', trigger: 'blur' }
        ],
        companyId: { required: true, message: '请选择', trigger: 'change' },
        invoiceSum: { required: true, message: '请选择', trigger: 'blur' },
        invoiceTypeCode: { required: true, message: '请选择', trigger: 'change' }
      },
      loading: false
    }
  },
  components: {
  },
  watch: {
    startCod(newValue) {
      console.log(newValue)
      if (this.invoiceForm.startCoding && this.invoiceForm.increaseNumber) {
        this.invoiceForm.endCoding = parseFloat(this.invoiceForm.startCoding) + parseFloat(this.invoiceForm.increaseNumber) - 1
        this.$refs.invoiceForm.validateField('endCoding')
      }
    }
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    },
    startCod() {
      const { startCoding, increaseNumber } = this.invoiceForm
      return { startCoding, increaseNumber }
    }
  },
  methods: {
    selectChange(val) {
      const temp = this.accountList.filter(item => item.id === val)[0]
      this.invoiceForm.invoiceSum = temp.invoiceSum
    },
    finvoicedatumSave() {
      this.$refs.invoiceForm.validate(valid => {
        if (valid) {
          this.loading = true
          const method = this.invoiceForm.id ? 'commonquotationconfigUpdate' : 'finvoicedatumSave'
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
</style>
