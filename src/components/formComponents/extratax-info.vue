/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-06 20:29:26
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
            v-model="data.preTaxAmount"
            @input="preTaxAmountChange"
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
            @input="taxRateChange"
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
            @input="taxAmountChange"
            v-model="data.taxAmount"
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
  methods: {
    // 税前金额变化
    preTaxAmountChange(val) {
      console.log(val);
    },
    // 税率变化
    taxRateChange(val) { },
    // 税后金额变化
    taxAmountChange(val) {
      console.log(val);
    }
  },
  computed: {
    // 税率
    taxRate: {
      get(val) {
        console.log(val)
        return this.data.taxRate * 100
      },
      set() {
        this.data.taxRate / 100
      },
    },

  },
};
</script>
<style lang="scss" scoped>
</style>