/*
 * @Author: web.王晓冬
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-04 16:00:47
 * @Description: 付款 新增费用单据信息
*/
<template>
  <form-card title="单据信息">
    <el-row :gutter="10">
      <el-col
        :span="8"
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
            v-model="form[item.prop]"
            :placeholder="`请输入${item.label}`"
          />
          <el-select
            class="wfull"
            v-else-if="item.type =='select'"
            :disabled='disabled'
            v-model="form[item.prop]"
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
            v-model="form[item.prop]"
            :placeholder="`请选择${item.label}`"
          />
        </el-form-item>
      </el-col>

    </el-row>
  </form-card>
</template>
<script>
export default {
  props: {
    form: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    },
    span: {
      type: Number,
      default: 8
    }
  },
  data() {
    return {
      // 遍历表单
      formItems: [
        { label: '费用单编号', prop: 'a', type: 'input', rules: [{ required: true }], },
        { label: '收支状态', prop: 'a', type: 'select', rules: [{ required: true }], dicName: '', },
        { label: '收款日期', prop: 'a', type: 'date', rules: [{ required: true }], },
        { label: '结算账户', prop: 'a', type: 'select', rules: [{ required: true }], },
        { label: '付款方式', prop: 'a', type: 'select', rules: [{ required: true }], },
      ],
      options: []
    };
  }
};
</script>
<style lang="scss" scoped>
</style>