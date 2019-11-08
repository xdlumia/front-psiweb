/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-08 10:14:36
 * @Description: 公司信息
*/
<template>
  <form-card title="公司信息">
    <el-row :gutter="10">
      <el-col
        :span="item.span || 8"
        v-for="(item,index) of formItems"
        :key="index"
      >
        <el-form-item
          :rules="item.rules"
          :label="item.label"
          :prop="item.prop"
        >
          <el-select
            class="wfull"
            v-if="item.type =='select'"
            :disabled='disabled'
            v-model="data[item.prop]"
            :placeholder="`请选择${item.label}`"
          >
            <el-option
              v-for="item in item.options || []"
              :key="item.id"
              :label="item.corporationName"
              :value="item.id"
            />
          </el-select>
          <el-input
            v-else
            disabled
            v-model.trim="companyInfo[item.prop]"
            :placeholder="`请输入${item.label}`"
          />

        </el-form-item>
      </el-col>
    </el-row>

  </form-card>
</template>
<script>
let formItems = [
  { label: '公司发票账户', prop: 'companyAccountId', type: 'select', rules: [{ required: true, trigger: 'blur' }], options: [] },
  { label: '公司结算账户', prop: 'companySettlementId', type: 'select', rules: [{ required: true, trigger: 'blur' }], options: [] },
  { label: '发票抬头', prop: 'invoiceTitle', type: 'input', rules: [{ required: false, trigger: 'blur' }], },
  { label: '纳税人识别号', prop: 'taxpayersNum', type: 'input', rules: [{ required: false, trigger: 'blur' }, { type: 'phone' }], },
  { label: '注册地址', prop: 'registerAddres', type: 'input', rules: [{ required: false, trigger: 'blur' }], },
  { label: '开户银行', prop: 'accountBank', type: 'input', rules: [{ required: false, trigger: 'blur' }], },
  { label: '开户行账号', prop: 'bankAccount', type: 'input', rules: [{ required: false, trigger: 'blur' }, { type: 'bankCard' }], },
]
export default {
  props: {
    data: {
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hide: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      companyInfo: {},
      // 遍历表单
      formItems: formItems.filter(item => !this.hide.includes(item.prop)),
    }
  },
  created() {
    this.commoncorporationSelectForJxc()
  },
  watch: {
    'data.companyAccountId': {
      handler(val) {
        // 清空公司结算账户
        this.data.companySettlementId = ''
        if (val) {

          // 获取公司发票下拉数据
          let companyOption = this.formItems[0].options || []
          // 获取公司发票选中项 
          let [companySelected] = companyOption.filter(item => item.id === val)
          // 给公司结算账户 options 添加下拉值
          this.$set(this.formItems[1], 'options', companySelected.commonCorporationAccountEntities || [])
          console.log(companySelected);
        }
      },
      deep: true
    }
  },
  methods: {
    // 获取公司发票账户 和结算账户 
    commoncorporationSelectForJxc() {
      this.$api.seeBaseinfoService.commoncorporationSelectForJxc()
        .then(res => {
          // 给公司发票账户 options 添加下拉值
          this.$set(this.formItems[0], 'options', res.data || [])
        })
    },
  },
}
</script>
<style lang="scss" scoped>
</style>