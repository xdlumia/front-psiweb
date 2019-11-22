/*
 * @Author: 赵伦
 * @Date: 2019-11-22 09:38:51
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-22 18:55:02
 * @Description: 收票申请 发票信息 已绑定 1
*/ 
<template>
  <form-card title="发票信息">
    <el-row :gutter="10">
      <el-col
        :key="index"
        :span="item.span || 8"
        v-for="(item,index) of formItems"
      >
        <el-form-item
          :label="item.label"
          :prop="item.prop"
          :rules="item.rules"
        >
          <el-input
            :disabled="disabled"
            :placeholder="`请输入${item.label}`"
            v-if="item.type =='input'"
            v-model.trim="data[item.prop]"
          />
          <el-select
            :disabled="disabled"
            :placeholder="`请输入${item.label}`"
            class="wfull"
            v-else-if="item.type =='select'"
            v-model="data[item.prop]"
          >
            <el-option
              :key="item.code"
              :label="item.content"
              :value="item.code"
              v-for="item in dictionaryOptions(item.dicName)"
            />
          </el-select>
          <el-date-picker
            :disabled="disabled"
            :placeholder="`请选择${item.label}`"
            class="wfull"
            v-else-if="item.type =='date'"
            v-model="data[item.prop]"
            value-format="timestamp"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </form-card>
</template>
<script>
export default {
  props: {
    invoiceType: [Number],
    data: {
      default: () => {
        return {};
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hide: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      // prettier-ignore
      items: [
        { label: '发票类型', prop: 'invoiceTypeCode', type: 'select', rules: [{ required: true, trigger: 'blur' }], dicName: 'CW_FP_LX' },
        { label: `${this.invoiceType ? '开' : '收'}票时间`, prop: 'invoiceDate', type: 'date', rules: [{ required: true, trigger: 'blur' }] },
        { label: '发票代码', prop: 'invoiceCoding', type: 'input', rules: [{ required: true, trigger: 'blur' }] },
        { label: '发票号码', prop: 'invoiceCode', type: 'input', rules: [{ required: true, trigger: 'blur' }] },
      ]
    };
  },
  components: {},
  computed: {
    formItems() {
      return this.items.filter(item => !this.hide.includes(item.prop));
    }
  }
};
</script>
<style scoped>
</style>
