/*
 * @Author: 赵伦
 * @Date: 2019-10-28 15:57:28
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-28 16:08:43
 * @Description: 账单调整记录
*/
<template>
  <form-card title="账单调整记录">
    <el-table :data="tableData" size="mini">
      <el-table-column label="账单调整单编号" min-width="80" prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column label="调整前金额" min-width="80" prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column label="调整金额" min-width="80" prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column label="调整后金额" min-width="80" prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column label="调整时间" min-width="80" prop="name" show-overflow-tooltip></el-table-column>
    </el-table>
  </form-card>
</template>
<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => [{ name: 'A1000' }]
    }
  }
};
</script>
<style lang="scss" scoped>
</style>