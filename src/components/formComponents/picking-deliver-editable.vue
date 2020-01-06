/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: 徐贺
 * @Last Modified time: 2019-10-25 17:18:25
 * @Description: 库房  发货单 详情组件 基本信息
 */
<template>
  <div>
    <form-card title='基本信息'>
      <el-row>
        <el-col :span="8">
          <div class="d-text-qgray">销售单编号</div>
          <div class="d-text-black mt5 mb20">{{data.salesSheetCode | codeSlice}}</div>
        </el-col>
        <el-col :span="8">
          <div class="d-text-qgray">发货时间</div>
          <div class="d-text-black mt5 mb20">{{data.practicalShipmentsTime|timeToStr('YYYY-MM-DD hh:mm:ss')}}</div>
        </el-col>
        <el-col :span="8">
          <div class="d-text-qgray">发货人</div>
          <div class="d-text-black mt5 mb20">{{data.creatorName}}</div>
        </el-col>
        <el-col :span="8">
          <div class="d-text-qgray">收货人</div>
          <div class="d-text-black mt5 mb20">{{data.consignee}}</div>
        </el-col>
        <el-col :span="8">
          <div class="d-text-qgray">收货人电话 </div>
          <div class="d-text-black mt5 mb20">{{data.consigneePhone}}</div>
        </el-col>
        <el-col :span="8">
          <div class="d-text-qgray">收货地址</div>
          <div class="d-text-black mt5 mb20">{{data.consigneeAddress}}</div>
        </el-col>
        <el-col :span="20">
          <div class="d-text-qgray">备注</div>
          <div class="d-text-black mt5">{{data.note}}</div>
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
