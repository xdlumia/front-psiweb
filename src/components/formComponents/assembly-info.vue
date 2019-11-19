/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: 徐贺
 * @Last Modified time: 2019-10-25 17:18:25
 * @Description: 库房  组装任务 详情组件 基本信息
 */
<template>
  <div>
    <form-card title='基本信息'>
      <el-row>
        <el-col :span="20">
          <div class="d-text-black">组装人</div>
          <div class="d-text-qgray mt5 mb20">{{data.assemblePersonName}}</div>
        </el-col>
        <el-col :span="20">
          <div class="d-text-black">备注</div>
          <div class="d-text-qgray mt5">{{data.note}}</div>
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
