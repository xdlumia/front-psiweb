/*
 * @Author: web.王晓冬
 * @Date: 2019-10-18 09:36:32
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-05 16:31:16
 * @Description: 发票信息 1
 */
<template>
  <form-card title='发票信息'>
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
            v-model="data[item.prop]"
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

  </form-card>
</template>
<script>
let formItems = [
  { label: '发票抬头', prop: 'invoiceTitle', type: 'input', rules: [{ required: true }] },
  { label: '纳税人识别号', prop: 'taxpayersNum', type: 'input', rules: [{ required: true, }], },
  { label: '注册地址', prop: 'registerAddres', type: 'input', rules: [{ required: true, }], },
  { label: '注册电话', prop: 'registerPhone', type: 'input', rules: [{ required: false, }, { type: 'phone' }], },
  { label: '开户银行', prop: 'accountBank', type: 'input', rules: { required: true, }, },
  { label: '开户行账号', prop: 'bankAccount', type: 'input', rules: [{ required: true, }, { type: 'bankCard' }], },
]
export default {
  props: {
    data: {
      default: () => { return {} }
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
      options: [],
      form: {
        telPhone: '我是电话号码'
      },
    }
  },
  components: {
  },
}
</script>
<style scoped>
</style>
