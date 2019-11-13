/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: 徐贺
 * @Last Modified time: 2019-10-25 17:18:25
 * @Description: 库房  拣货单 详情组件 基本信息
 */
<template>
  <div>
    <form-card title='发货信息'>
      <el-row>
        <el-col :span="20">
          <div class="d-text-black">拣货人</div>
          <div class="d-text-qgray mt5 mb20">{{data.pickingPersonName}}</div>
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
