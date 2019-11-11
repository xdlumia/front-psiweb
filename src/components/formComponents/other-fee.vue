/*
 * @Author: web.王晓冬
 * @Date: 2019-10-18 09:36:32
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-11 16:17:27
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
      class="mb10"
      :body-style="{ padding: '10px' }"
    >
      <el-row :gutter="10">
        <el-col
          :span="8"
          v-for="(sub,i) of formItems"
          :key="i"
        >
          <el-form-item
            :rules="sub.rules"
            :label="sub.label"
            :prop="'shipmentFinanceSaveVoList.'+ index +','+ item.prop"
          >
            <el-select
              :disabled="disabled"
              v-if="sub.type==='select'"
              class="wfull mr5"
              v-model="item[sub.prop]"
            >
              <el-option
                :key="option.id"
                :label="option.label"
                :value="option.id"
                v-for="option in item.options || dictionaryOptions(item.dicName)"
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
let formItems = [
  // 客户名称编辑的时候使用clientId显示的时候使用clientName
  // TODO 费用类型 费用明细 字典值还没有随便取的
  { label: '费用类型', prop: 'feeTypeCode', type: 'select', dicName: 'PSI_KH_HY-1', rules: [{ required: true, trigger: 'blur' }], },
  { label: '费用明细', prop: 'feeDetailCode', type: 'select', dicName: 'PSI_KH_HY-1', rules: [{ required: true, trigger: 'blur' }], },
  { label: '金额', prop: 'payAmount', type: 'input', rules: [{ required: false, trigger: 'blur' }], },
  { label: '付款时间', prop: 'payTime', type: 'date', rules: [{ required: false, trigger: 'blur' }], },
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
  methods: {
    addBill() {
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
