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
          <div class="d-text-black mt5 mb20">XSD20190201000001</div>
        </el-col>
        <el-col :span="8">
          <div class="d-text-qgray">发货时间</div>
          <div class="d-text-black mt5 mb20">2019-9-21 10:04:38</div>
        </el-col>
        <el-col :span="8">
          <div class="d-text-qgray">发货人</div>
          <div class="d-text-black mt5 mb20">张三</div>
        </el-col>
        <el-col :span="8">
          <div class="d-text-qgray">收货人</div>
          <div class="d-text-black mt5 mb20">马云</div>
        </el-col>
        <el-col :span="8">
          <div class="d-text-qgray">收货人电话 </div>
          <div class="d-text-black mt5 mb20">13955556666</div>
        </el-col>
        <el-col :span="8">
          <div class="d-text-qgray">收货地址</div>
          <div class="d-text-black mt5 mb20">爱的色放噶少随电我等飞鸽博</div>
        </el-col>
        <el-col :span="20">
          <div class="d-text-qgray">备注</div>
          <div class="d-text-black mt5">备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注</div>
        </el-col>

      </el-row>
    </form-card>
  </div>
</template>
<script>
export default {
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
