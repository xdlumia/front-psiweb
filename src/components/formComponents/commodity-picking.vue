/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-28 11:25:09
 * @Description: 库房  销售单 详情组件 出库商品弹出框 商品拣货
 */
<template>
  <div>
    <form-card title='商品拣货'>
      <el-table
        border
        size='mini'
        :data="[data]"
        ref="companyTable"
        class="college-main"
      >
        <el-table-column
          fixed
          prop="shipmentsNumber"
          min-width="100"
          label="拣货数量"
          show-overflow-tooltip
        ></el-table-column>
        <!-- <el-table-column
          fixed
          prop="commodityCode"
          label="商品编号"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span class="d-text-blue">{{scope.row.commodityCode}}</span>
          </template>
        </el-table-column> -->
        <el-table-column
          fixed
          prop="categoryCode"
          min-width="100"
          label="商品类别"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          fixed
          prop="className"
          min-width="100"
          label="商品分类"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="goodsName"
          min-width="100"
          label="商品名称"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="configName"
          min-width="100"
          label="商品配置"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="specOne"
          label="商品规格"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span class="d-text-blue">{{scope.row.specOne}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="unit"
          min-width="80"
          label="单位"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
    </form-card>
  </div>
</template>
<script>
export default {
  props: ['data'],
  data() {
    return {
    }
  },
  methods: {
    //点击机器号和SN码
  },
  components: {
  },
}
</script>
<style scoped>
</style>
