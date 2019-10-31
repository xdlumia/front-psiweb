/*
 * @Author: web.王晓冬
 * @Date: 2019-10-31 16:31:36
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-31 17:35:44
 * @Description: 报价单筛选
*/

<template>
  <el-form
    ref="form"
    label-position="top"
    size="mini"
    :model="form"
  >
    <el-form-item
      v-for="(item,index) of filterList"
      :key="index"
      :label="item.label"
      :prop="item.prop"
    >
      <!-- 输入框 -->
      <el-input
        v-if="item.type == 'input'"
        v-model="form[item.prop]"
        :placeholder="`请输入${item.label}`"
        @keyup.native.13="submitFilter"
      >
        <el-button
          @click="submitFilter"
          slot="append"
          icon="el-icon-search"
        ></el-button>
      </el-input>
      <!-- 选择 -->
      <el-select
        @change="submitFilter"
        class="wfull"
        v-else-if="item.type == 'select'"
        v-model="form[item.prop]"
        placeholder="请选择"
      >
        <el-option
          v-for="sub of item.options"
          :key="sub.label"
          :label="sub.label"
          :value="sub.label"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: {
    form: {
      type: Object,
      default: () => {
        return {}
      },
    }
  },
  data() {
    return {
      options: [
        { label: 'lable' },
        { label: 'lable3' },
      ],
      // 遍历表单内容
      filterList: [
        { label: '报价单编号', prop: 'title', type: 'input' },
        { label: '销售出库单编号', prop: 'city', type: 'input' },
        { label: '单据状态', prop: 'pushTime', type: 'select', options: [] },
        { label: '客户名称', prop: 'status', type: 'input' },
        { label: '创建人', prop: 'messageType', type: 'select' }
      ]
    }
  },
  mounted() {
    setTimeout(() => {
      this.filterList[2].options = [
        { label: 'lable' },
        { label: 'lable3' },
      ]
    }, 2000)

  },
  methods: {
    submitFilter() {
      this.$emit('submit-filter')
    },
  },
  components: {
  },
}
</script>
<style scoped>
</style>
