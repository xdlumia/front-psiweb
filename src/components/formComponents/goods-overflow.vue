/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: 徐贺
 * @Last Modified time: 2019-10-28 14:02:43
 * @Description: 报溢商品
 */
<template>
  <div>
    <form-card title='报溢商品'>
      <el-table
        size='mini'
        border
        :data='detailForm.commondityList'
        class="college-main"
        style="height:calc(100vh - 340px)"
      >
        <el-table-column
          fixed
          prop="num"
          min-width="100"
          label="报溢数量"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          fixed
          prop="wmsName"
          min-width="100"
          label="入库库房"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          fixed
          prop="num"
          label="机器号/SN码"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span
              @click="dialogVisible = true"
              class="d-text-blue"
            >{{scope.row.num}}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          align="left"
          prop="inventoryPrice"
          label="成本金额"
          width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          fixed
          min-width="100"
          label="含税成本金额"
          show-overflow-tooltip
        >
          <template slot-scope="">
            <!-- scope.row.inventoryPrice * 0.01 * scope.row.inventoryPricetaxRate -->
            <span>不知道咋算</span>
          </template>
        </el-table-column>
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
          prop="goodsName"
          min-width="100"
          label="商品名称"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="categoryCode"
          min-width="100"
          label="商品类别"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="className"
          min-width="100"
          label="商品分类"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.unit|dictionary('PSI_SP_KIND')}}</span>
          </template>
        </el-table-column>

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
          prop="unit"
          min-width="80"
          label="单位"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.unit|dictionary('SC_JLDW')}}</span>
          </template>
        </el-table-column>

      </el-table>
    </form-card>
    <overflowSn
      :visible.sync='dialogVisible'
      :form={commodityCode:detailForm.commodityCode,businessCode:drawerData.reportingLossesCode,page:1,limit:20}
    />
  </div>

</template>
<script>
import overflowSn from './overflow-sn'
export default {
  props: ['detailForm', 'drawerData'],
  data() {
    return {
      // 查询表单
      queryForm: {
        title: '', // 标题
        city: '', // 城市
        pushTime: '',
        messageType: '',
        status: '',
        page: 1,
        limit: 20
      },
      dialogVisible: false,
    }
  },
  methods: {
  },
  components: {
    overflowSn
  },
}
</script>
<style scoped>
</style>
