/*
 * @Author: 赵伦
 * @Date: 2019-10-28 15:57:28
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-28 16:07:25
 * @Description: 开票记录
*/
<template>
  <form-card title="开票记录">
    <el-table :data="tableData" size="mini">
      <el-table-column label="购买方名称" min-width="80" prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column label="发票号码" min-width="80" prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column label="开票金额" min-width="80" prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column label="开票时间" min-width="80" prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column label="状态" min-width="80" prop="name" show-overflow-tooltip></el-table-column>
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