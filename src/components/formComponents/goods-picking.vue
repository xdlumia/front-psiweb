/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: 徐贺
 * @Last Modified time: 2019-10-28 14:02:43
 * @Description: 拣货商品
 */
<template>
  <div>
    <form-card title='拣货商品'>
      <el-table
        border
        size='mini'
        :data='data.commodityList'
        ref="companyTable"
        class="college-main"
        style="max-height:300px"
      >
        <el-table-column
          fixed
          prop="title"
          label="拣货数量"
          min-width="120"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.pickingAccomplishNum}}/{{scope.row.pickingNum}}</span>
          </template>
        </el-table-column>

        <el-table-column
          fixed
          prop="pickingAccomplishNum"
          min-width="100"
          label="机器号/SN码"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span
              @click="changeDialog(scope.row)"
              class="d-text-blue"
            >{{scope.row.pickingAccomplishNum}}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="usableNum"
          min-width="100"
          label="可用库存"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="commodityCode"
          label="商品编号"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span class="d-text-blue">{{scope.row.commodityCode}}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="categoryCode"
          min-width="100"
          label="商品类别"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.categoryCode|dictionary('PSI_SP_KIND')}}</span>
          </template>
        </el-table-column>
        <el-table-column
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
          min-width="140"
          label="商品规格"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="note"
          min-width="120"
          label="备注"
          show-overflow-tooltip
        ></el-table-column>

      </el-table>
    </form-card>
    <pickingJsn
      :visible.sync='dialogVisible'
      :data='row'
      :drawerData='data'
    />
  </div>
</template>
<script>
import pickingJsn from './picking-jsn'
export default {
  props: ['data'],
  data() {
    return {
      dialogVisible: false,
      row: {}
    }
  },
  methods: {
    changeDialog(row) {
      this.row = row
      console.log(row, 'rowrowrowrow')
      this.dialogVisible = true
    }
  },
  components: {
    pickingJsn
  },
}
</script>
<style scoped>
</style>
