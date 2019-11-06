<!--
 * @Author: 高大鹏
 * @Date: 2019-11-06 17:45:14
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-06 19:20:27
 * @Description: 商品信息
 -->
<template>
  <div class>
    <form-card :title="true">
      <div slot="title">
        <span class="mr20">商品信息</span>
        <commodity-selector @choose="choose"></commodity-selector>
      </div>
      <el-table
        :data="goods"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column label="商品编号" prop="goodsCode" width="200px" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span class="d-text-blue">{{row.goodsCode}}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品图片">
          <template slot-scope="scope">
            <img
              v-if="scope.row.goodsPic"
              :src="scope.row.goodsPic"
              style="object-fit: fill;width: 100%"
            />
            <span v-else class="d-text-qgray">暂无图片</span>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="goodsName"></el-table-column>
        <el-table-column label="商品类别">
          <template slot-scope="scope">{{scope.row.categoryCode | dictionary('PSI_SP_KIND')}}</template>
        </el-table-column>
        <el-table-column label="商品分类" prop="className"></el-table-column>
        <el-table-column label="规格" prop="specOne"></el-table-column>
        <el-table-column label="配置" prop="configName"></el-table-column>
        <el-table-column label="总库存" prop="usableInventoryNum"></el-table-column>
      </el-table>
    </form-card>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data() {
    return {
      goods: []
    }
  },
  components: {
  },
  methods: {
    choose(goods) {
      this.goods = goods
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
