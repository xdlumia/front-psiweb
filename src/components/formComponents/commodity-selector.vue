/*
 * @Author: 赵伦
 * @Date: 2019-10-31 15:05:34
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-06 10:18:15
 * @Description: 商品输入选框 字段已绑定 1 
*/
<template>
  <span class="d-inline d-relative">
    <el-select
      :loading="loading"
      :remote-method="search"
      @change="onSelect"
      filterable
      placeholder="请选择"
      popper-class="custom-goods-selector"
      remote
      size="mini"
      v-model="value"
    >
      <el-option :key="item.goodsCode" :label="item.name" :value="item.goodsCode" v-for="(item,i) in options">
        <el-row>
          <el-col :span="6" class="b d-text-black" v-if="i==0">商品名称</el-col>
          <el-col :span="18" class="b d-text-black" v-if="i==0">商品编号</el-col>
          <el-col :span="6" class="d-hidden d-elip">{{item.name}}</el-col>
          <el-col :span="18" class="d-hidden d-elip">
            <span :title="item.goodsCode">{{item.goodsCode}}</span>
          </el-col>
        </el-row>
      </el-option>
    </el-select>
    <i @click="openDialog" class="el-icon-plus d-text-blue d-absolute f18 b d-pointer select-icon"></i>
    <commodity-choose :visible.sync="showCommodityGoods" @choose="choose" v-if="showCommodityGoods||showed" />
  </span>
</template>
<script>
export default {
  data() {
    return {
      showCommodityGoods: false,
      value: '',
      options: [],
      showed: false,
      loading: false,
      searchTable: {}
    };
  },
  mounted() {
    this.search();
  },
  methods: {
    openDialog() {
      this.showCommodityGoods = true;
      this.showed = true;
    },
    choose(e) {
      this.$emit('choose', e);
    },
    async search(words = '') {
      words = String(words).trim();
      if (this.searchTable[words]) {
        return (this.options = this.searchTable[words]);
      }
      this.loading = true;
      let { data } = await this.$api.seeGoodsService.goodsSelectGoodsList({
        page: 1,
        limit: 5,
        goodsName: words
      });
      this.options = data || [];
      this.loading = false;
      this.searchTable[words] = data;
    },
    onSelect(e) {
      this.$emit('choose', this.options.filter(item => item.goodsCode == e));
      this.value = '';
    }
  }
};
</script>
<style lang="scss" scoped>
.select-icon {
  right: 8px;
  z-index: 200;
  top: 5px;
  background-color: #fff;
}
</style>
<style lang="scss">
.custom-goods-selector {
  .el-select-dropdown__item {
    &:first-child {
      height: 68px;
    }
  }
}
</style>
