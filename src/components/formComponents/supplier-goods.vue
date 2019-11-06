/*
 * @Author: 赵伦
 * @Date: 2019-11-05 16:57:15
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-06 18:07:51
 * @Description: 可供商品 以调试 1
*/
<template>
  <form-card title="可供商品">
    <el-container class="supplier-goods-form-card">
      <el-aside v-if="showCat">
        <commodity-cat />
      </el-aside>
      <el-main>
        <div>
          <commodity-selector @choose="onChoose" />
        </div>
        <el-table :data="goods">
          <el-table-column :reserve-selection="true" label="操作" min-width="100" prop="title" show-overflow-tooltip>
            <template slot-scope="{$index}">
              <el-link :underline="false" @click="remove($index)" class="el-icon-remove d-text-red f20"></el-link>
            </template>
          </el-table-column>
          <el-table-column :reserve-selection="true" label="商品编号" min-width="100" prop="title" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span class="d-text-blue">{{row.goodsCode}}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" min-width="100" prop="goodsName" show-overflow-tooltip></el-table-column>
          <el-table-column label="商品类别" min-width="100" prop="categoryCode" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{row.categoryCode | dictionary('PSI_SP_KIND')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品分类" min-width="100" prop="className" show-overflow-tooltip></el-table-column>
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
    },
    showCat: Boolean
  },
  data() {
    return {
      goods: []
    };
  },
  methods: {
    onChoose(e) {
      let ori = this.goods.reduce((data, item) => {
        data[item.goodsCode] = item;
        return data;
      }, {});
      this.goods = this.goods.concat(e.filter(item => !ori[item.goodsCode]));
      this.data.commonSupplierCommodityEntities = this.goods.map(item => ({
        commodityCode: item.goodsCode,
        commodityId: item.id
      }));
    },
    remove(e) {
      this.data.commonSupplierCommodityEntities.splice(e, 1);
      this.goods.splice(e, 1);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>