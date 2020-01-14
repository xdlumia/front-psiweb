/*
 * @Author: 赵伦
 * @Date: 2019-12-25 14:42:32
 * @LastEditors: 赵伦
 * @LastEditTime: 2020-01-14 16:59:47
 * @Description: 仅显示商品列表
*/
<template>
  <el-table :data="data" border max-height="350px" ref="kind2" size="mini">
    <el-table-column label="商品编号" min-width="100" show-overflow-tooltip>
      <template slot-scope="scope">
        <span class="d-text-blue">{{scope.row.goodsCode|codeSlice}}</span>
      </template>
    </el-table-column>
    <el-table-column label="商品名称" min-width="80" prop="name"></el-table-column>
    <el-table-column label="商品类别" prop="categoryCode" width="130">
      <template slot-scope="{row}">
        <span>{{row.categoryCode | dictionary('PSI_SP_KIND')}}</span>
      </template>
    </el-table-column>
    <el-table-column label="商品分类" prop="secondClassName" width="130"></el-table-column>
    <el-table-column label="规格" min-width="80" prop="specOne" />
    <el-table-column label="销售参考价" prop="saleReferencePrice" width="90" />
  </el-table>
</template>
<script>
export default {
  props: {
    data: Array
  }
};
</script>