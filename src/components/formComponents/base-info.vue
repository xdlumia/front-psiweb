/*
 * @Author: web.王晓冬
 * @Date: 2019-10-18 09:36:32
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-06 15:12:46
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

  </form-card>
</template>
<script>
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
      items: [
        { label: '客户编号', prop: 'code', type: 'input', rules: [{ required: true && !this.disabled, trigger: 'blur' }] },
        { label: '客户名称', prop: 'clientName', type: 'input', rules: [{ required: true && !this.disabled, trigger: 'blur' }, { type: 'name' }], },
        { label: '联系人', prop: 'linkManName', type: 'input', rules: [{ required: true && !this.disabled, trigger: 'blur' }, { type: 'name' }], },
        { label: '联系电话', prop: 'phone', type: 'input', rules: [{ required: true && !this.disabled, trigger: 'blur' }, { type: 'phone' }], },
        { label: '客户级别', prop: 'grade', type: 'select', rules: [{ required: false }], dicName: 'PSI_KH_KHJB', },
        { label: '行业', prop: 'trade', type: 'select', rules: [{ required: false }], dicName: 'PSI_KH_HY', },
        { label: '来源', prop: 'source', type: 'select', rules: [{ required: false }], dicName: 'PSI_KHGL_LY', },
        { label: '详细地址', prop: 'address', type: 'input', maxlength: 50, span: 16, rules: [{ required: false }], },
        { label: '备注', prop: 'note', maxlength: 300, span: 16, type: 'input', rules: [{ required: false }], },
      ]
    }
  },
  computed: {
    formItems() {
      return this.items.filter(item => !this.hide.includes(item.prop))
    }
  },
  components: {
  },
}
</script>
<style scoped>
</style>
