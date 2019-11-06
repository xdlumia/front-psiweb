/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-06 19:57:19
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
            :placeholder="`请输入${item.label}`"
          >
            <el-option
              v-for="item in item.options || []"
              :key="item.code"
              :label="item.content"
              :value="item.code"
            />
          </el-select>
          <el-input
            v-else
            disabled
            v-model.trim="data[item.prop]"
            :placeholder="`请输入${item.label}`"
          />

        </el-form-item>
      </el-col>
    </el-row>

  </form-card>
</template>
<script>
let formItems = [
  { label: '公司发票账户', prop: 'companyAccountId', type: 'select', rules: [{ required: true, trigger: 'blur' }, { type: 'name' }], },
  { label: '公司结算账户', prop: 'companySettlementId', type: 'select', rules: [{ required: true, trigger: 'blur' }], },
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
  watch: {
    'data.companyAccountId': {
      handler(val) {
        if (val) {
          // 根据公司发票帐号id变化 获取公司阶段账户列表
          this.getCompanySettlement(val)
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 获取公司发票账户
    commonclientinfoInfo() {
      this.$api.seePsiCommonService.commonclientinfoInfo(null, this.data.clientId)
        .then(res => {
          this.formItems[0].options = res.data || []
        })
    },
    // 公司结算账户
    getCompanySettlement(id) {
      this.$api.seePsiCommonService.commonclientinfoInfo(null, companyAccountId)
        .then(res => {
          this.formItems[1].options = res.data || []
        })
    },
  },
}
</script>
<style lang="scss" scoped>
</style>