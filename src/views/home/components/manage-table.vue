<!--
 * @Author: 高大鹏
 * @Date: 2019-11-15 14:30:04
 * @LastEditors  : 高大鹏
 * @LastEditTime : 2019-12-25 14:47:26
 * @Description: 基础数据
 -->
<template>
  <div class="manage-table box ba">
    <div v-if="paramsData.length">
      <el-row class="table-item" v-for="(item, index) in paramsData" :key="index">
        <el-col class="item-title" :span="4">
          <span class="text">{{item.name}}</span>
        </el-col>
        <el-col class="promotion-right-col" :span="18">
          <el-progress
            :text-inside="true"
            :stroke-width="18"
            :percentage="item.percentage > 100 ? 100 : item.percentage"
          ></el-progress>
        </el-col>
      </el-row>
    </div>
    <div
      v-else
      class="d-text-qgray hfull"
      style="display:flex;justify-content: center;align-items: center;"
    >暂无数据</div>
  </div>
</template>

<script>
export default {
  props: ['paramsData'],

  data () {
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
