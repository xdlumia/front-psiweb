/*
 * @Author: web.王晓冬
 * @Date: 2019-10-18 09:36:32
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-16 10:27:50
 * @Description: 其他费用
 */
<template>
  <form-card title='其他费用'>
    <div
      v-if="!(data.shipmentFinanceSaveVoList||[]).length"
      class="ac"
    > 暂无内容</div>
    <el-card
      v-for="(item,index) of data.shipmentFinanceSaveVoList || []"
      :key="index"
      class="mb10 d-relative"
      :body-style="{ padding: '10px' }"
      v-else
    >
      <i
        title="删除"
        class="el-icon-remove d-pointer f20 d-absolute"
        style="right:10px; top:10px; z-index:1"
        @click="data.shipmentFinanceSaveVoList.splice(index,1)"
        v-if="!disabled"
      ></i>
      <el-row :gutter="10">
        <el-col
          :span="8"
          v-for="(sub,i) of formItems"
          :key="i"
        >
          <el-form-item
            :rules="sub.rules"
            :label="sub.label"
            :prop="'shipmentFinanceSaveVoList.'+ index +'.'+ sub.prop"
          >
            <el-select
              :disabled="disabled"
              v-if="sub.type==='select'"
              class="wfull mr5"
              v-model="item[sub.prop]"
              @change="dicChange(item[sub.prop],sub.prop,index)"
            >

              <el-option
                :key="option.code"
                :label="option.content"
                :value="option.code"
                v-for="option in sub.options || item.options"
              ></el-option>
            </el-select>
            <el-date-picker
              class="wfull"
              v-else-if="sub.type =='date'"
              value-format="timestamp"
              :disabled='disabled'
              v-model="item[sub.prop]"
              :placeholder="`请选择${sub.label}`"
            />
            <el-input
              v-else-if="sub.type =='input'"
              :disabled="disabled"
              v-model="item[sub.prop]"
              :placeholder="`请输入${sub.label}`"
            >
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>
    <el-button
      v-if="!disabled"
      size="mini"
      type="text"
      icon="el-icon-circle-plus"
      @click="addBill"
    >增加其他费用</el-button>
  </form-card>
</template>
<script>
import { watch } from 'fs';
let formItems = [
  // 客户名称编辑的时候使用clientId显示的时候使用clientName
  { label: '费用类型', prop: 'feeTypeCode', type: 'select', options: [], dicName: "ZD_DY_LX", rules: [{ required: true, trigger: 'blur' }], },
  { label: '费用明细', prop: 'feeDetailCode', type: 'select', rules: [{ required: true, trigger: 'blur' }], },
  { label: '金额', prop: 'payAmount', type: 'input', rules: [{ required: true, trigger: 'blur' }, { type: 'price' }], },
  { label: '付款时间', prop: 'payTime', type: 'date', rules: [{ required: true, trigger: 'blur' }], },
]
export default {
  props: {
    data: {
      default: () => { [] }
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
      formItems: formItems.filter(item => !this.hide.includes(item.prop)),
    }
  },
  watch: {
    'data.shipmentFinanceSaveVoList': {
      handler(val) {
        if (!val.length && this.disabled) return;
        val.forEach((item, index) => {
          let { children } = this.formItems[0].options.find(v => v.code == item.feeTypeCode)
          this.$set(this.data.shipmentFinanceSaveVoList[index], 'options', children)
        })
      },
      deep: true
    }
  },
  mounted() {
    this.getDictionaryValueTreeList()
  },
  methods: {
    getDictionaryValueTreeList() {
      this.$api.seeDictionaryService.getDictionaryValueTreeList({ dicCode: 'ZD_DY_LX' }).then(res => {
        this.formItems[0].options = res.data || []
      })
    },
    dicChange(modelVal, prop, index) {
      // modelVal值 prop 字段  index 下标
      if (prop == 'feeTypeCode') {
        let { children } = this.formItems[0].options.find(v => v.code == modelVal)
        this.data.shipmentFinanceSaveVoList[index].feeDetailCode = ''
        this.$set(this.data.shipmentFinanceSaveVoList[index], 'options', children)
      }
    },
    addBill() {
      if (!this.data.shipmentFinanceSaveVoList) {
        this.data.shipmentFinanceSaveVoList = []
      }
      this.data.shipmentFinanceSaveVoList.push({
        // busCode: '',//业务编号,
        // busType: '',//9,
        feeDetailCode: '',//费用明细,
        feeTypeCode: '',//费用类型,
        isBillFee: '',//0,
        payAmount: '',//98765432109876.12,
        payTime: '',//1572403069534,
        paymenDays: '',//账期,
        paymentType: '',//9
      })
    }
  },
  components: {
  },
}
</script>
<style scoped>
</style>
