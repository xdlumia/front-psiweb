/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: 徐贺
 * @Last Modified time: 2019-10-25 17:18:25
 * @Description: 库存详情
 */
<template>
  <div>
    <form-card title='库存详情'>
      <el-row class="d-text-qgray b">
        <el-col :span="2">
          可用库存
        </el-col>
        <el-col :span="1">
          =
        </el-col>
        <el-col :span="2">
          实物库存
        </el-col>
        <el-col :span="1">
          +
        </el-col>
        <el-col :span="2">
          入库量
        </el-col>
        <el-col :span="1">
          -
        </el-col>
        <el-col :span="2">
          出库量
        </el-col>
        <el-col :span="1">
          +
        </el-col>
        <el-col :span="2">
          待入库量
        </el-col>
        <el-col :span="1">
          -
        </el-col>
        <el-col :span="2">
          待出库量
        </el-col>
        <el-col :span="1">
          -
        </el-col>
        <el-col :span="2">
          锁库量
        </el-col>
      </el-row>
      <el-row class='mt10 d-text-black b'>
        <el-col
          :span="3"
          class="d-text-red"
        >
          10
        </el-col>
        <el-col :span="3">
          0
        </el-col>
        <el-col :span="3">
          0
        </el-col>
        <el-col :span="3">
          0
        </el-col>
        <el-col :span="3">
          0
        </el-col>
        <el-col :span="3">
          20
        </el-col>
        <el-col :span="2">
          10
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
