/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-28 13:52:05
 * @Description: 库房  拣货单 详情组件 拣货 机器号/SN码
 */
<template>
  <div>
    <form-card title='机器号/SN码'>
      <span class="b mt5">机器号/扫SN码</span>
      <el-input
        v-model='snCode'
        size="mini"
        style="width:200px;"
        class="ml10 mt5"
        v-on:keyup.13.native="shipmentCommodityCheck"
      ></el-input>
      <el-table
        border
        size="mini"
        :data="tableData"
        ref="companyTable"
        class="college-main mt20"
        style="max-height:300px"
      >
        <el-table-column
          min-width="50"
          label="操作"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <i
              @click='deleteUpTable(scope)'
              class="el-icon-error d-pointer"
              style="font-size:20px;color:#F5222D"
            ></i>
          </template>
        </el-table-column>
        <el-table-column
          type='index'
          prop="cityName"
          min-width="80"
          label="编号"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
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
            <el-input
              size='mini'
              v-model="scope.row[item]"
              placeholder="请输入内容"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
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
        <el-table-column
          prop="commodityCode"
          min-width="100"
          label="商品编号"
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
          label="配置"
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
      dialogVisible: false,
      snCode: '',
      tableData: [],
      custom: [],
    }
  },
  mounted() {
    this.commonsystemconfigInfo()
  },
  methods: {
    //回车机器号和SN码 
    shipmentCommodityCheck() {
      this.$api.seePsiWmsService.wmspickingorderShipmentCommodityCheck({ snCode: this.snCode, businessId: this.data.id, commodityList: this.tableData, businessCode: this.data.pickingOrderCode, })
        .then(res => {
          if (res.data) {

            let Index = this.data.commodityList.findIndex((item) => {
              return item.commodityCode == res.data.commodityCode
            })
            if (Number(this.data.commodityList[Index].pickingAccomplishNum) < this.data.commodityList[Index].pickingNum) {
              this.tableData.push(res.data)
              this.data.commodityList[Index].pickingAccomplishNum++
            } else {
              this.$message({
                message: `商品 ${this.data.commodityList[Index].goodsName} 拣货数量大于待拣数量！`,
                type: 'error',
                showClose: true,
              });
            }
          }
          this.snCode = ''
        })
        .finally(() => {

        })
    },
    //删除某一项
    deleteUpTable(scope) {
      this.tableData.splice(scope.$index, 1)
      let Index = this.data.commodityList.findIndex((item) => {
        return item.commodityCode == scope.row.commodityCode
      })
      this.data.commodityList[Index].pickingAccomplishNum--
    },
    //查看自定义头部
    commonsystemconfigInfo() {
      this.$api.seePsiCommonService.commonsystemconfigInfo(null, 2)
        .then(res => {
          if (res.data) {
            this.custom = JSON.parse(res.data.configJson).pickingOrdersConfigArray
          }
        })
        .finally(() => {
        })
    }
  },
  components: {
  },
}
</script>
<style scoped>
</style>
