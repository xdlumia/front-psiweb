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
      :title="index == 1 ? '物流信息' : ''"
      v-for="index of 3"
      :key='index'
      class="mb10"
    >
      <el-row>
        <el-col :span="8">
          <div class="d-text-qgray">服务商</div>
          <div class="d-text-black mt5 mb20">顺丰</div>
        </el-col>
        <el-col :span="8">
          <div class="d-text-qgray">服务类型</div>
          <div class="d-text-black mt5 mb20">空运</div>
        </el-col>
        <el-col :span="8">
          <div class="d-text-qgray">运费金额</div>
          <div class="d-text-black mt5 mb20">500.00</div>
        </el-col>
        <el-col :span="8">
          <div class="d-text-qgray">运单号</div>
          <div class="d-text-black mt5 mb20">86867457547</div>
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
