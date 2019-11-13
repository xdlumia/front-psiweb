/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-28 13:52:05
 * @Description: 库房  销售单 详情组件 出库商品弹出框 机器号/SN码
 */
//  :params="{commodityCode:data.commodityCode,businessCode:data.pickingOrderCode,page:1,limit:15}"
<template>
  <div>
    <form-card title='机器号/SN码'>
      <d-table
        api="seePsiWmsService."
        :params="{commodityCode:data.commodityCode,businessCode:data.pickingOrderCode,page:1,limit:15}"
        ref="companyTable"
        class="college-main"
        style="height:calc(100vh - 340px)"
      >
        <el-table-column
          fixed
          type='index'
          min-width="80"
          label="编号"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          fixed
          prop="snCode"
          label="SN码"
          min-width="160"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.snCode}}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          prop="robotCode"
          label="机器号"
          min-width="160"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.robotCode}}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          prop="cityName"
          min-width="100"
          label="自定义项"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          fixed
          prop="wmsName"
          min-width="100"
          label="拣货库房"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="operator"
          min-width="100"
          label="拣货人"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="拣货时间"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{scope.row.createTime | timeToStr('YYYY-MM-DD HH:mm:ss')}}</template>
        </el-table-column>
      </d-table>
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
