/*
 * @Author: web.王晓冬
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-21 11:52:56
 * @Description: 付款 新增流水 单据信息
*/
<template>
  <form-card title="单据信息">
    <el-row :gutter="10">
      <el-col
        :span="span || 8"
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
          >
            <template
              v-if="item.prop == 'incomeAmount'"
              slot="append"
            >元</template>
            <el-button
              @click="addAccountVisible = true"
              icon="el-icon-plus"
              v-if="item.prop == 'oppositeAccount'"
              slot="append"
            />
          </el-input>
          <el-select
            class="wfull"
            v-else-if="item.type =='select'"
            :disabled="disabled || item.prop== 'incomeType'"
            v-model="data[item.prop]"
            :placeholder="`请输入${item.label}`"
          >
            <el-option
              v-for="sub in item.options"
              :key="sub.code"
              :label="sub.content"
              :value="sub.code"
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
export default {
  props: {
    data: {
      type: Object,
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
    span: {
      type: Number,
      default: 8
    }
  },

  data() {
    return {
      addAccountVisible: false, //添加账单
      // 遍历表单
      items: [
        { label: '流水号', prop: 'incomeRecordCode', type: 'input', rules: [{ required: true }], },
        { label: '收支状态', prop: 'incomeType', type: 'select', rules: [{ required: true }], options: [{ content: '收款', code: 0 }, { content: '付款', code: 1 }], },
        { label: '发生金额', prop: 'incomeAmount', type: 'input', rules: [{ required: true }, { type: 'price' }], },
        { label: '收款日期', prop: 'accountDate', type: 'date', rules: [{ required: true }] },
        { label: '结算账户', prop: 'companySettlementId', type: 'select', rules: [{ required: true }] },
        { label: '对方账号', prop: 'oppositeAccount', type: 'input', rules: [{ required: true }], },
        { label: '流水单凭号', prop: 'serialNumber', type: 'input', rules: [{ required: false }], },
        { label: '联系方式', prop: 'accountPhone', type: 'input', rules: [{ required: false }], }
      ],
      options: []
    };
  },
  computed: {
    formItems() {
      return this.items.filter(item => !this.hide.includes(item.prop))
    }
  },

};
</script>
<style lang="scss" scoped>
</style>