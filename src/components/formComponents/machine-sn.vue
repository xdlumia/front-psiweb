/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-28 13:52:05
 * @Description: 库房  销售单 详情组件 出库商品弹出框 机器号/SN码
 */
<template>
  <div>
    <form-card title='机器号/SN码'>
      <!-- data.isAssembly == 1 代表组装  组装 是入库  operation   -0入库    -1出库-->
      <d-table
        api="seePsiWmsService.wmsflowrecordList"
        :params="{commodityCode:data.commodityCode,businessCode:detailForm.salesSheetCode,page:1,limit:15,operation:data.isAssembly == 1 ? 0 : 1}"
        ref="companyTable"
        @response='response'
        class="college-main"
        style="height:200px"
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
          v-for="(item,index) of custom"
          :key="index"
          min-width="150"
          :label="item"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row[item]}}</span>
          </template>
        </el-table-column>
        <!-- v-if="data.isAssembly == 1" -->
        <el-table-column
          fixed
          prop="wmsName"
          min-width="100"
          :label="data.isAssembly == 1 ? '组装库房' : '拣货库房'"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="operator"
          min-width="100"
          :label="data.isAssembly == 1 ? '组装人' : '拣货人'"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="createTime"
          :label="data.isAssembly == 1 ? '组装时间' : '拣货时间'"
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
  props: ['data', 'detailForm'],
  data() {
    return {
      custom: []
    }
  },
  methods: {
    response(res) {
      let tableData = res.data || []
      tableData.forEach((item) => {
        if (item.fieldList.length > 0) {
          item.fieldList.forEach((item1) => {
            item[item1.fieldVal] = item1.fieldCode
            if (!this.custom.includes(item1.fieldVal)) {
              this.custom.push(item1.fieldVal)
            }
          })
        }
      })
    }
  },
  components: {
  },
}
</script>
<style lang="scss" scoped>
/deep/.el-dialog__footer {
  text-align: center !important;
}
</style>
