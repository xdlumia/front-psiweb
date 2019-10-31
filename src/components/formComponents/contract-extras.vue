/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-31 18:14:31
 * @Description: 合同模板--补充信息，自定义内容
*/
<template>
  <form-card title="补充信息（合同模板自定义内容）">
    <el-table :data="tableData" size="mini">
      <el-table-column label="属性名称" min-width="80" prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column label="属性内容" min-width="200" prop="value" show-overflow-tooltip>
        <template>
          <el-input disabled></el-input>
        </template>
      </el-table-column>
    </el-table>
  </form-card>
</template>
<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => [{ name: '安装系统', value: '邮箱' }]
    },
    options: [],
    form: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang="scss" scoped>
</style>