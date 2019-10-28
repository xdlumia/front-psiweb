/*
 * @Author: web.王晓冬
 * @Date: 2019-10-18 09:36:32
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-26 16:04:51
 * @Description: 基本信息
 */
<template>
  <form-card title='基本信息'>
    <el-row>
      <el-col :span="8">
        <div class="d-text-black">滞纳金方案</div>
        <div class="d-text-qgray mt5 mb20">2019-9-21</div>
      </el-col>
      <el-col :span="8">
        <div class="d-text-black">滞纳金比例</div>
        <div class="d-text-qgray mt5 mb20">陆运</div>
      </el-col>
      <el-col :span="8">
        <div class="d-text-black">滞纳金间隔</div>
        <div class="d-text-qgray mt5 mb20">自提</div>
      </el-col>
      <el-col :span="8">
        <div class="d-text-blank">滞纳金上限</div>
        <div class="d-text-qgray mt5 mb20">不控</div>
      </el-col>
    </el-row>
  </form-card>
</template>
<script>
export default {
  prop: ['data'],
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
