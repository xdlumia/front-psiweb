/*
 * @Author: 赵伦
 * @Date: 2019-10-31 15:05:34
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-31 15:39:07
 * @Description: 商品输入选框
*/
<template>
  <span class="d-inline d-relative">
    <el-select filterable placeholder="请选择" size="mini" v-model="value">
      <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in options">
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
      </el-option>
    </el-select>
    <i @click="showCommodityGoods=true" class="el-icon-plus d-text-blue d-absolute f18 b d-pointer select-icon"></i>
    <commodity-choose :visible.sync="showCommodityGoods" />
  </span>
</template>
<script>
export default {
  data() {
    return {
      showCommodityGoods: false,
      value: '',
      options: []
    };
  },
  methods: {}
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
