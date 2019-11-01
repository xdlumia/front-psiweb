/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: 徐贺
 * @Last Modified time: 2019-10-25 17:18:25
 * @Description: 借入借出任务 借入/出信息
 */
<template>
  <div>
    <form-card title='借入/出信息'>
      <el-row>
        <el-col :span="8">
          <div class="d-text-qgray">借入类型</div>
          <div class="d-text-black mt5 mb20">借出</div>
        </el-col>
        <el-col :span="8">
          <div class="d-text-qgray">借出方</div>
          <div class="d-text-black mt5 mb20">北京凡特仁</div>
        </el-col>
        <el-col :span="8">
          <div class="d-text-qgray">服务商名称</div>
          <div class="d-text-black mt5 mb20">张三</div>
        </el-col>
        <el-col :span="8">
          <div class="d-text-qgray">服务类型</div>
          <div class="d-text-black mt5 mb20">马云</div>
        </el-col>
        <el-col :span="8">
          <div class="d-text-qgray">运单号 </div>
          <div class="d-text-black mt5 mb20">13955556666</div>
        </el-col>
        <el-col :span="8">
          <div class="d-text-qgray">物流费用</div>
          <div class="d-text-black mt5 mb20">爱的色放噶少随电我等飞鸽博</div>
        </el-col>
        <el-col :span="8">
          <div class="d-text-qgray">归还时间</div>
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
