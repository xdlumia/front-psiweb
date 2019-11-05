/*
 * @Author: web.王晓冬
 * @Date: 2019-10-18 09:36:32
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-05 16:00:19
 * @Description: 基本信息 1
 */
<template>
  <form-card title='基本信息'>
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
            v-model="data[item.prop]"
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

  </form-card>
</template>
<script>
let formItems = [
  { label: '客户编号', prop: 'code', type: 'input', rules: [{ required: true }] },
  { label: '客户名称', prop: 'clientName', type: 'input', rules: [{ required: true, }, { type: 'name' }], },
  { label: '联系人', prop: 'linkManName', type: 'input', rules: [{ required: true, }, { type: 'name' }], },
  { label: '联系电话', prop: 'phone', type: 'input', rules: [{ required: true, }, { type: 'phone' }], },
  { label: '客户级别', prop: 'grade', type: 'select', rules: [{ required: false }], dicName: 'PSI_KH_KHJB', },
  { label: '行业', prop: 'trade', type: 'select', rules: [{ required: false }], dicName: 'PSI_KH_HY', },
  { label: '来源', prop: 'source', type: 'select', rules: [{ required: false }], dicName: 'PSI_KHGL_LY', },
  { label: '详细地址', prop: 'address', type: 'input', span: 16, rules: [{ required: false }], },
]
export default {
  props: {
    data: {
      default: () => { return {} }
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
  components: {
  },
}
</script>
<style scoped>
</style>
