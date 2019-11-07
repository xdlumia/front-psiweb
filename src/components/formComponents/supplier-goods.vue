/*
 * @Author: 赵伦
 * @Date: 2019-11-05 16:57:15
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-07 11:39:46
 * @Description: 可供商品 以调试 1
*/
<template>
  <form-card title="可供商品">
    <el-container class="supplier-goods-form-card">
      <el-aside v-if="showCat">
        <commodity-cat :mainCat.sync="params.categoryCode" :subCat.sync="params.goodClassId" @change="getSupplierGoods()" />
      </el-aside>
      <el-main>
        <div>
          <commodity-selector @choose="onChoose" />
        </div>
        <component
          :autoInit="false"
          :data="goods"
          :is="supplierId?'d-table':'el-table'"
          :params="params"
          api="seePsiCommonService.commonsuppliercommodityList"
          ref="table"
          style="height:calc(100% - 40px);margin-top:10px;"
        >
          <el-table-column label="操作" min-width="60" prop="title" show-overflow-tooltip>
            <template slot-scope="{$index}">
              <el-link :underline="false" @click="remove($index)" class="el-icon-remove f20"></el-link>
            </template>
          </el-table-column>
          <el-table-column label="商品编号" min-width="200" prop="title" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span class="d-text-blue">{{row.goodsCode}}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" min-width="100" prop="goodsName" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{row.name||row.goodsName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品类别" min-width="80" prop="categoryCode" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{row.categoryCode | dictionary('PSI_SP_KIND')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品分类" min-width="100" prop="className" show-overflow-tooltip></el-table-column>
          <el-table-column label="配置" min-width="100" prop="configName" show-overflow-tooltip></el-table-column>
          <el-table-column label="商品规格" min-width="140" prop="specOne" show-overflow-tooltip></el-table-column>
          <el-table-column label="单位" min-width="80" prop="unit" show-overflow-tooltip></el-table-column>
        </component>
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
    showCat: Boolean,
    supplierId: [String, Number]
  },
  data() {
    return {
      goods: [],
      mainCat: '',
      subCat: '',
      params: {
        supplierId: '',
        categoryCode: '',
        goodClassId: '',
        page: 1,
        limit: 15
      },
      loading: false
    };
  },
  methods: {
    onChoose(e) {
      let ori = this.goods.reduce((data, item) => {
        data[item.goodsCode] = item;
        return data;
      }, {});
      let goods = e.filter(item => !ori[item.goodsCode]);
      if (this.supplierId) {
        !(async () => {
          this.loading = true;
          try {
            await Promise.all(goods.map(this.addGoods));
            this.getSupplierGoods();
          } catch (error) {}
          this.loading = false;
        })();
        return;
      }
      this.goods = this.goods.concat(goods);
      this.data.commonSupplierCommodityEntities = this.goods.map(item => ({
        commodityCode: item.goodsCode,
        commodityId: item.id
      }));
    },
    remove(e) {
      if (this.supplierId) {
        return this.delGoods(this.goods[e]);
      }
      this.data.commonSupplierCommodityEntities.splice(e, 1);
      this.goods.splice(e, 1);
    },
    async getSupplierGoods() {
      this.params.supplierId = this.supplierId;
      this.$refs.table.reload(1);
    },
    async delGoods(row) {
      await this.$confirm('是否确认删除?');
      this.loading = true;
      await this.$api.seePsiCommonService.commonsuppliercommodityLogicDelete({
        id: row.id
      });
      this.loading = false;
      this.getSupplierGoods();
    },
    async addGoods(item) {
      await this.$api.seePsiCommonService.commonsuppliercommoditySave({
        commodityCode: item.goodsCode,
        commodityId: item.id,
        supplierId: this.supplierId
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>