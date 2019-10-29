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
          <div class="d-text-qgray mt5 mb20">太上老君</div>
        </el-col>
        <el-col :span="20">
          <div class="d-text-black">备注</div>
          <div class="d-text-qgray mt5">备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注</div>
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
