/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: 徐贺
 * @Last Modified time: 2019-10-25 17:18:25
 * @Description: 库房  发货单 详情组件 物流
 */
<template>
  <div>
    <form-card
      v-for="(item,index) of data.shipmentsLogisticsList"
      :title="index == 0 ? '物流信息' : ''"
      :key='index'
      class="mb10"
    >
      <el-row>
        <el-col :span="8">
          <div class="d-text-qgray">服务商</div>
          <div class="d-text-black mt5 mb20">{{item.facilitator || '-'}}</div>
        </el-col>
        <el-col :span="8">
          <div class="d-text-qgray">服务类型</div>
          <div class="d-text-black mt5 mb20">{{item.serveType | dictionary('PSI_FWS_FWLX')}}</div>
        </el-col>
        <el-col :span="8">
          <div class="d-text-qgray">运费金额</div>
          <div class="d-text-black mt5 mb20">{{item.logisticsFees || '-'}}</div>
        </el-col>
        <el-col :span="8">
          <div class="d-text-qgray">运单号</div>
          <div class="d-text-black mt5 mb20">{{item.waybillCode || '-'}}</div>
        </el-col>
      </el-row>
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
  components: {
  },
}
</script>
<style scoped>
</style>
