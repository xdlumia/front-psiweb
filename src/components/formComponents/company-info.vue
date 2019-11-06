/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-06 11:25:30
 * @Description: 公司信息
*/
<template>
  <form-card title="公司信息">
    <el-row :gutter="10">
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
            <el-input
              v-if="item.type =='input'"
              :disabled='disabled'
              v-model.trim="data[item.prop]"
              :placeholder="`请输入${item.label}`"
            />
            <el-select
              class="wfull"
              v-else-if="item.type =='select'"
              :disabled='disabled'
              v-model="data[item.prop]"
              :placeholder="`请输入${item.label}`"
            >
              <el-option
                v-for="item in dictionaryOptions(item.dicName)"
                :key="item.code"
                :label="item.content"
                :value="item.code"
              />
            </el-select>
            <el-date-picker
              class="wfull"
              v-else-if="item.type =='date'"
              value-format="timestamp"
              :disabled='disabled'
              v-model="data[item.prop]"
              :placeholder="`请选择${item.label}`"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-row>

  </form-card>
</template>
<script>
let formItems = [
  { label: '公司发票账户', prop: 'clientName', type: 'input', rules: [{ required: true, trigger: 'blur' }, { type: 'name' }], },
  { label: '公司结算账户', prop: 'invoiceTitle', type: 'input', rules: [{ required: true, trigger: 'blur' }], },
  { label: '发票抬头', prop: 'invoiceTitle', type: 'input', rules: [{ required: true, trigger: 'blur' }], },
  { label: '纳税人识别号', prop: 'taxpayersNum', type: 'input', rules: [{ required: true, trigger: 'blur' }, { type: 'phone' }], },
  { label: '注册地址', prop: 'registerAddres', type: 'input', rules: [{ required: true, trigger: 'blur' }], },
  { label: '开户银行', prop: 'accountBank', type: 'input', rules: [{ required: true, trigger: 'blur' }], },
  { label: '开户行账号', prop: 'bankAccount', type: 'input', rules: [{ required: true, trigger: 'blur' }, { type: 'bankCard' }], },
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
      // 遍历表单
      formItems: formItems.filter(item => !this.hide.includes(item.prop)),
    }
  },
}
</script>
<style lang="scss" scoped>
</style>