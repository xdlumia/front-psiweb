/*
 * @Author: web.王晓冬
 * @Date: 2019-10-18 09:36:32
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-11 11:25:31
 * @Description:  退货单账期信息
 */
<template>
  <form-card title='账期费用'>
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
            :disabled="disabled"
            v-if="item.type==='select'"
            class="wfull mr5"
            v-model="data[item.prop]"
          >
            <el-option
              :key="item.id"
              :label="item.label"
              :value="item.id"
              v-for="item in item.options || dictionaryOptions(item.dicName)"
            ></el-option>
          </el-select>
          <el-date-picker
            class="wfull"
            v-else-if="item.type =='date'"
            value-format="timestamp"
            :disabled='disabled'
            v-model="form[item.prop]"
            :placeholder="`请选择${item.label}`"
          />
          <el-input
            :disabled="disabled"
            v-else-if="item.type =='input'"
            v-model="data[item.prop]"
            :placeholder="`请输入${item.label}`"
          >
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </form-card>
</template>
<script>
let formItems = [
  // 客户名称编辑的时候使用clientId显示的时候使用clientName
  { label: '应退金额', prop: 'shouldRefundAmount', type: 'input', rules: [{ required: true, trigger: 'blur' }], },
  { label: '实退金额', prop: 'actualRefundAmount', type: 'input', rules: [{ required: false, trigger: 'blur' }], },
  { label: '付款时间', prop: 'payTime', type: 'date', rules: [{ required: false, trigger: 'blur' }], },
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
      default: () => []
    },
  },
  data() {
    return {
      form: {},
      formItems: formItems.filter(item => !this.hide.includes(item.prop)),
    }
  },
  components: {
  },
}
</script>
<style scoped>
</style>
