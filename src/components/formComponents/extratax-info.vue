/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2020-01-03 10:20:24
 * @Description: 附加发票 字段对应 但是公式还没计算
*/
<template>
  <form-card title="附加发票" class="extratax-info">
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
          :rules="[{required:false}]"
        >
        <el-select v-model="data.taxRate" class="wfull" :disabled="disabled" placeholder="请输入" @change="taxRateChange">
          <el-option v-for="item of taxRateList" :key="item" :value="item" :label="item+'%'"></el-option>
        </el-select>
          <!-- <el-input
            placeholder="请输入"
            :disabled="disabled"
            @input="taxRateChange"
            @focus="checkMode"
            v-model="data.taxRate"
          >
            <template slot="append">%</template>
          </el-input> -->
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
      // 税率验证
      taxRate: (rule, value, callback) => {
        var reg = /^(?:[1-9]?\d|100)$/
        if (!reg.test(value)) {
          callback(new Error('只能输入0-100的整数'));
        }
        else {
          callback();
        }
      },
      taxRateList:[],
      calcPreMode:false
    };
  },
  mounted(){
    this.getTaxRate()
  },
  methods: {
    // 税前金额变化 和 税率变化 的计算方法一样
    preTaxAmountChange(val) {
      let preTaxAmount = this.data.preTaxAmount || 0   ///税前金额
      let taxRate = (this.data.taxRate || 0) / 100  ///税率
      let taxAmount = this.data.taxAmount || 0 //税后金额
      // 税前金额*（1-税率）=税后金额

      this.data.taxAmount = (preTaxAmount * (1 - taxRate)).toFixed(2)
    },
    checkMode(){
      if(!+this.data.preTaxAmount){
        this.calcPreMode = false;
      }else{
        this.calcPreMode = true
      }
    },
    taxRateChange(){
      this.checkMode()
      if(!this.calcPreMode){
        this.taxAmountChange()
      }else{
        this.preTaxAmountChange()
      }
    },
    // 税后金额变化 计算税率
    taxAmountChange(val) {
      let preTaxAmount = this.data.preTaxAmount || 0   ///税前金额
      let taxRate = (this.data.taxRate || 0) / 100  ///税率
      let taxAmount = this.data.taxAmount || 0 //税后金额
      if(taxRate>0){
        // 税率 = 1- 税后/税前
        this.data.preTaxAmount = (taxAmount/(1-taxRate)).toFixed(2)
      }
    },
    async getTaxRate(){
      try {
        let {data:{configJson}} = await this.$api.seePsiCommonService.commonsystemconfigInfo(null,1)
        configJson = JSON.parse(configJson)
        this.taxRateList = configJson.additionalInvoiceRateArray||[]
      } catch (error) {
        console.error(error)
      }

    }
  },
  computed: {
    // 税率

  },
};
</script>
<style lang="scss" scoped>
.extratax-info{
  /deep/ {
    .el-input__suffix{
      display: none;
    }
  }
}
</style>