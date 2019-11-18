<!--
 * @Author: 高大鹏
 * @Date: 2019-11-15 14:30:04
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-15 17:42:33
 * @Description: 基础数据
 -->
<template>
  <div class="manage-table box ba">
    <el-row class="table-item" v-for="(item, index) in paramsData" :key="index">
      <el-col class="item-title" :span="4">
        <span class="text" v-text="item.title"></span>
      </el-col>
      <el-col class="promotion-right-col" :span="18">
        <el-progress :text-inside="true" :stroke-width="18" :percentage="item.percent"></el-progress>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ['paramsData'],

  data() {
    return {

    }
  }
}
</script>

<style scoped lang='scss'>
/deep/ .el-row {
  margin-left: 0px !important;
  margin-right: 0px !important;
}
</style>
