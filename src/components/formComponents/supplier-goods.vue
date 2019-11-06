/*
 * @Author: 赵伦
 * @Date: 2019-11-05 16:57:15
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-05 17:39:22
 * @Description: 可供商品
*/
<template>
  <form-card title="可供商品">
    <el-container>
      <!-- <el-aside></el-aside> -->
      <el-main>
        <div>
          <commodity-selector @choose="onChoose" />
        </div>
        <el-table :data="goods">
          <el-table-column :reserve-selection="true" label="商品编号" min-width="100" prop="title" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span class="d-text-blue">{{row.goodsCode}}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" min-width="100" prop="name" show-overflow-tooltip></el-table-column>
          <el-table-column label="商品类别" min-width="100" prop="categoryCode" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{row.categoryCode | dictionary('PSI_SP_KIND')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品分类" min-width="100" prop="cityName" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{ row.firstClassName }}/{{ row.secondClassName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="配置" min-width="100" prop="configName" show-overflow-tooltip></el-table-column>
          <el-table-column label="商品规格" min-width="140" prop="specOne" show-overflow-tooltip></el-table-column>
          <el-table-column label="单位" min-width="80" prop="unit" show-overflow-tooltip></el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </form-card>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      goods: []
    };
  },
  methods: {
    onChoose(e) {
      this.goods = e;
      console.log(e);
      this.data.commonSupplierCommodityEntities = this.goods.map(item => ({
        commodityCode: item.goodsCode,
        commodityId: item.goodsId
      }));
    }
  }
};
</script>
<style lang="scss" scoped>
</style>