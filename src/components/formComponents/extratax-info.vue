/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-06 20:11:49
 * @Description: 附加发票 字段对应 但是公式还没计算
*/
<template>
  <form-card title="附加发票">
    <el-row :gutter="10">
      <el-col :span="8">
        <el-form-item
          label="税前金额"
          :rules="[{required:false,},{type:'price'}]"
          prop="preTaxAmount"
        >
          <el-input
            v-model="preTaxAmount"
            :disabled="disabled"
            placeholder="请输入税前金额"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item
          label="税率"
          prop="taxRate"
          :rules="[{required:false,},{type:'price'}]"
        >
          <el-input
            placeholder="请输入"
            :disabled="disabled"
            v-model="taxRate"
          >
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item
          label="税后金额"
          :rules="[{required:false,},{type:'price'}]"
          prop="taxAmount"
        >
          <el-input
            v-model="taxAmount"
            :disabled="disabled"
            placeholder="请输入税后金额"
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
    }
  },
  data() {
    return {
      // 遍历表单
    };
  },
  computed: {
    // 税前金额
    preTaxAmount: {
      get() {
        return this.data.preTaxAmount
      },
      set() { },
    },
    // 税率
    taxRate: {
      get() {
        return this.data.taxRate * 100
      },
      set() { },
    },
    taxAmount: {
      get() {
        return this.data.taxAmount
      },
      set() { },
    }
  },
};
</script>
<style lang="scss" scoped>
</style>