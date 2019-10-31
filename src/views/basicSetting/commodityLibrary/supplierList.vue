<!-- "/**",
      "* 供应商列表    物品管理组件",
      "* @author web-徐贺",
      "* @params ////",
      "* @date 2018年8月15日",
      "**/",
      "-->
<template>
   <div>
       <span class="d-text-blcak f18 b">供应商列表</span>
       <el-table
       border
        class="mt20"
        style="width: 100%;border:1px solid #ebebeb;"
        :data="supplierList">
        <el-table-column
            prop="code"
            label="供应商编号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="shortName"
            label="供应商简称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址">
        </el-table-column>
        </el-table>
        <!-- <el-pagination
          class="mt30 mr"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage1"
          :page-size="100"
          layout="total, prev, pager, next"
          :total="1000">
        </el-pagination> -->
   </div>
</template>

<script>
export default {
  props: ['popupRight'],
  data () {
    return {
      currentPage1: 5,
      supplierList: []// 供应商列表数据
    }
  },
  computed: {
  },
  created () {
  },
  watch: {
  },
  methods: {
    getSuppliersByGoodsId () { // 供应商列表查询
      this.$api.seeSupplyChianService.getSuppliersByGoodsId({code: this.popupRight.goodsCode}) // 获取供应商列表
        .then(res => {
          this.supplierList = res.data
        }).catch(ero => {})
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style>
</style>
