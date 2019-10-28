/*
 * @Author: 赵伦
 * @Date: 2019-10-28 15:57:28
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-28 16:05:48
 * @Description: 收支流水
*/
<template>
  <form-card title="收支流水">
    <div slot="title">
      <span>收支流水</span>
      <span class="fr">
        <el-link :underline="false" class="mr10" type="primary">+新建</el-link>
        <el-link :underline="false" type="primary">匹配</el-link>
      </span>
    </div>
    <el-table :data="tableData" size="mini">
      <el-table-column label="流水号" min-width="80" prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column label="对方名称" min-width="80" prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column label="提交时间" min-width="80" prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column label="收支状态" min-width="80" prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column label="流水金额" min-width="80" prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column label="该账单匹配金额" min-width="80" prop="name" show-overflow-tooltip></el-table-column>
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