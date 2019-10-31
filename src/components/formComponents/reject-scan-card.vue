/*
 * @Author: 赵伦
 * @Date: 2019-10-30 17:26:29
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-30 17:43:52
 * @Description: 换退货商品扫码卡片 
*/
<template>
  <div>
    <!-- 商品列表 -->
    <el-table
      :data="tableData"
      max-height="400"
      size="mini"
    >
      <el-table-column
        label="换出数量"
        min-width="70"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="商品编号"
        min-width="110"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="库房"
        min-width="70"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="商品类别"
        min-width="110"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="商品分类"
        min-width="110"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="商品名称"
        min-width="110"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="商品配置"
        min-width="110"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="商品规格"
        min-width="110"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="单位"
        min-width="60"
        prop="name"
      ></el-table-column>
    </el-table>
    <div class="mt10 mb10">
      <span class="b">扫SN码/机器号</span>
      <el-input
        size="mini"
        style="width:200px;"
        class="ml10"
        v-model="data"
      ></el-input>
      <span class="fr">
        <span>本次成功扫码</span>
        <span class="b d-text-red">3</span>
        <span>件，历史扫码</span>
        <span class="b d-text-green">5</span>
        <span>件，还需扫码</span>
        <span class="b d-text-blue">127</span>
        <span>件</span>
      </span>
    </div>
    <div class="b">机器号/SN记录</div>
    <el-table
      :data="tableData"
      max-height="400"
      size="mini"
    >
      <el-table-column min-width="60">
        <template>
          <span class="el-icon-circle-close f18 d-pointer d-text-red"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="借入数量"
        min-width="70"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="借入库房"
        min-width="70"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="机器号/SN码"
        min-width="110"
        prop="name"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="返还数量"
        min-width="70"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="返还库房"
        min-width="70"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="机器号/SN码"
        min-width="110"
        prop="name"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="成本单价(含税)"
        min-width="110"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="商品编号"
        min-width="110"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="商品名称"
        min-width="110"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="商品类别"
        min-width="110"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="商品分类"
        min-width="110"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="商品配置"
        min-width="110"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="商品规格"
        min-width="110"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="单位"
        min-width="60"
        prop="name"
      ></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: '',
      tableData: Array(12)
        .fill('')
        .map(() => ({ name: '' }))
    };
  }
};
</script>
<style lang="scss" scoped>
</style>