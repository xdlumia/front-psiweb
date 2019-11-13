/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: 徐贺
 * @Last Modified time: 2019-10-25 17:18:25
 * @Description: 采购  采购单 详情组件 收货信息
 */
<template>
  <div>
    <form-card title='收货信息'>
      <el-row>
        <el-col :span="8">
          <div class="d-text-qgray">预计收货日期</div>
          <div class="d-text-black mt5 mb20">{{data.purchaseTime | timeToStr('YYYY-MM-DD HH:mm:ss')}}</div>
        </el-col>
        <el-col :span="8">
          <div class="d-text-qgray">物流公司</div>
          <div class="d-text-black mt5 mb20">{{data.serviceName}}</div>
        </el-col>
        <el-col :span="8">
          <div class="d-text-qgray">物流单号</div>
          <div class="d-text-black mt5 mb20">{{data.logisticsSn}}</div>
        </el-col>
        <el-col :span="8">
          <div class="d-text-qgray">物流方式</div>
          <div class="d-text-black mt5 mb20">{{data.logisticsModelCode|dictionary('PSI_FWS_FWLX')}}</div>
        </el-col>
        <el-col :span="8">
          <div class="d-text-qgray">是否到付</div>
          <div class="d-text-black mt5 mb20">{{data.totalAmount == 1 ? '是' : '否'}}</div>
        </el-col>
        <el-col :span="8">
          <div class="d-text-qgray">物流费用</div>
          <div class="d-text-black mt5 mb20">{{data.totalAmount}}</div>
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
    }
  },
  components: {
  },
}
</script>
<style scoped>
</style>
