/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-06 20:15:00
 * @Description: 发货信息 1
*/
<template>
  <form-card title="发货信息">
    <el-row :gutter="10">
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
              :maxlength="item.maxlength"
              v-model.trim="data[item.prop]"
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
    </el-row>

  </form-card>
</template>
<script>
let formItems = [
  { label: '销售预计发货时间', prop: 'salesExpectedShipmentsTime', type: 'date', rules: [{ required: true, trigger: 'blur' }, { type: 'name' }], },
  { label: '客户联系人', prop: 'clientLinkman', type: 'input', rules: [{ required: true, trigger: 'blur' }, { type: 'name' }], },
  { label: '客户联系电话', prop: 'clientPhone', type: 'input', rules: [{ required: true, trigger: 'blur' }, { type: 'phone' }], },
  { label: '客户收货地址', prop: 'clientReceivingAddress', type: 'input', rules: [{ required: true, trigger: 'blur' },], },
  { label: '销售要求到货时间', prop: 'salesRequireArrivalTime', type: 'date', rules: [{ required: false, trigger: 'blur' }], },
  { label: '采购预计到货时间', prop: 'procurementExpectedArrivalTime', type: 'date', rules: [{ required: false, trigger: 'blur' }], },
  { label: '备注', prop: 'note', type: 'date', maxlength: 300, rules: [{ required: false, trigger: 'blur' }], },
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
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      // 遍历表单
      formItems: formItems.filter(item => !this.hide.includes(item.prop)),
    }
  },
}
</script>
<style lang="scss" scoped>
</style>