<!--
 * @Author: 高大鹏
 * @Date: 2019-11-15 14:30:04
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-12-20 10:12:40
 * @Description: 基础数据
 -->
<template>
  <div class="mb20">
    <h3 class="b mb5" style="text-indent:20px">基础数据</h3>
    <el-row :gutter="40">
      <el-col :span="6">
        <div class="ba p15 data-item">
          <h5 class="title d-text-qgray">
            <span>今日任务</span>
          </h5>
          <h1 class="number">500/5000</h1>
          <div style="flex:1;display: flex;justify-content: space-around;align-items: flex-end">
            <div
              v-for="(item, index) in taskList"
              :key="index"
              style="background:#1790ff;flex:1;margin-right:10px;"
              :style="{height: item / maxTask * 100 + '%'}"
            ></div>
          </div>
        </div>
      </el-col>
      <el-col :span="6" v-loading="indexCycleTaskLoading">
        <div class="ba p15 data-item">
          <h5 class="title d-text-qgray" style="display:flex;justify-content: space-between;">
            <span>周期任务</span>
            <el-tabs style="margin-top: -10px;" class="no-border-tab" v-model="dateFlag">
              <el-tab-pane label="周" name="1"></el-tab-pane>
              <el-tab-pane label="季" name="3"></el-tab-pane>
            </el-tabs>
            <!-- <div class>
              <span
                :class="{'d-text-blue': dateFlag == 1}"
                class="mr15 d-pointer"
                @click="dateFlag = 1"
              >周</span>
              <span
                :class="{'d-text-blue': dateFlag == 3}"
                class="d-pointer"
                @click="dateFlag = 3"
              >季</span>
            </div>-->
          </h5>
          <h1
            class="number"
          >{{Math.floor(Math.random() * 10000) | thousandBitSeparator}}/{{756690 | thousandBitSeparator}}</h1>
          <div style="flex:1;display: flex;align-items: center">
            <div style="flex:1">
              <el-progress
                :text-inside="true"
                :stroke-width="16"
                :percentage="Math.floor(Math.random() * 100)"
              ></el-progress>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="ba p15 data-item">
          <h5 class="title d-text-qgray">
            <span>库存金额</span>
          </h5>
          <h1 class="number big-text">{{Math.floor(Math.random() * 10000) | thousandBitSeparator}}</h1>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="ba p15 data-item">
          <h5 class="title d-text-qgray">
            <span>财务应收</span>
          </h5>
          <h1 class="number big-text">{{Math.floor(Math.random() * 10000) | thousandBitSeparator}}</h1>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type='text/ecmascript-6'>
import filterMix from './filter'

export default {
  mixins: [filterMix],
  data() {
    return {
      taskList: Array.from({ length: 14 }, () => Math.floor(Math.random() * 100)),
      cycle: 60,
      dateFlag: '1',
      indexCycleTaskLoading: false,
      indexTodayTaskLoading: false
    }
  },
  mounted() {
    console.log(this.taskList)
    this.indexCycleTask(this.dateFlag)
    this.indexTodayTask()
  },
  computed: {
    maxTask() {
      return Math.max(...this.taskList)
    }
  },
  watch: {
    dateFlag(newValue) {
      this.indexCycleTask(newValue)
    }
  },
  methods: {
    // 周期任务
    indexCycleTask(dateFlag) {
      this.indexCycleTaskLoading = true
      this.$api.seePsiReportService.indexCycleTask({ dateFlag }).then(res => {
        console.log(res)
      }).finally(() => { this.indexCycleTaskLoading = false })
    },
    // 今日任务
    indexTodayTask() {
      this.indexTodayTaskLoading = true
      this.$api.seePsiReportService.indexTodayTask().then(res => {
        console.log(res)
      }).finally(() => { this.indexTodayTaskLoading = false })
    }
  }
}
</script>

<style scoped lang='scss'>
/deep/ .el-row {
  margin-left: -25px !important;
  margin-right: -25px !important;
}
.data-item {
  display: flex;
  flex-direction: column;
  height: 120px;
  .title {
    flex: 1;
    display: flex;
    justify-content: space-between;
    i {
      font-size: 18px;
    }
  }
  .number {
    font-size: 40px;
    font-family: "Arial Normal", "Arial";
  }
  .big-text {
    font-size: 48px;
    text-indent: 40px;
  }
  .store {
    width: 100%;
    height: 100%;
  }
  /deep/ .el-slider__runway.disabled .el-slider__bar {
    background: #1790ff;
  }
}
</style>
