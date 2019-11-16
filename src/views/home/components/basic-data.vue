<!--
 * @Author: 高大鹏
 * @Date: 2019-11-15 14:30:04
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-16 13:31:24
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
            <div>
              <el-tooltip content="Top Left 提示文字" placement="top">
                <i class="el-icon-warning-outline" style="font-size:16px;"></i>
              </el-tooltip>
            </div>
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
      <el-col :span="6">
        <div class="ba p15 data-item">
          <h5 class="title d-text-qgray">
            <span>周期任务</span>
            <div class="d-text-blue">
              <span class="mr15">周</span>
              <span>季</span>
            </div>
          </h5>
          <h1 class="number">{{Math.floor(Math.random() * 10000) | thousandBitSeparator}}/{{756690 | thousandBitSeparator}}</h1>
          <div style="flex:1;display: flex;align-items: center">
            <!-- <el-slider v-model="cycle" disabled :show-tooltip="false"></el-slider> -->
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
            <div>
              <el-tooltip content="Top Left 提示文字" placement="top">
                <i class="el-icon-warning-outline" style="font-size:16px;"></i>
              </el-tooltip>
            </div>
          </h5>
          <h1 class="number">{{Math.floor(Math.random() * 10000) | thousandBitSeparator}}</h1>
          <div style="flex:1;">
            <IEcharts class="store" style="width:100%;height:100%;" :options="options"></IEcharts>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="ba p15 data-item">
          <h5 class="title d-text-qgray">
            <span>财务应收</span>
            <div>
              <el-tooltip content="Top Left 提示文字" placement="top">
                <i class="el-icon-warning-outline" style="font-size:16px;"></i>
              </el-tooltip>
            </div>
          </h5>
          <h1 class="number">{{Math.floor(Math.random() * 10000) | thousandBitSeparator}}</h1>
          <div style="flex:1;display: flex;justify-content: space-between;align-items: center">
            <div style="flex:1;display: flex;align-items: center">
              <span style="flex:0 0 50%;">周同比</span>
              <i class="el-icon-caret-bottom mr10" style="font-size:20px;color:#f5202d"></i>
              <span>12％</span>
            </div>
            <span style="flex:1;display: flex;align-items: center">
              <span style="flex:0 0 50%;">日环比</span>
              <i class="el-icon-caret-top mr10" style="font-size:20px;color:#94da78"></i>
              <span>11％</span>
            </span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type='text/ecmascript-6'>
import IEcharts from 'vue-echarts'
import 'echarts/lib/chart/themeRiver' // 引入河流图
import filterMix from './filter'

export default {
  mixins: [filterMix],
  data() {
    return {
      taskList: Array.from({ length: 14 }, () => Math.floor(Math.random() * 100)),
      cycle: 60
    }
  },
  mounted() {
    console.log(this.taskList)
  },
  computed: {
    maxTask() {
      return Math.max(...this.taskList)
    },
    options() {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            lineStyle: {
              color: 'rgba(0,0,0,0.2)',
              width: 0,
              type: 'solid'
            }
          }
        },
        color: ['#9760e4'],
        left: 0,
        right: 0,
        width: '100%',
        height: '100%',
        singleAxis: {
          top: 0,
          bottom: 0,
          axisTick: {},
          axisLabel: {},
          type: 'time',
          axisPointer: {
            animation: false,
            label: {
              show: false
            }
          },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            type: 'themeRiver',
            itemStyle: {
              emphasis: {
                shadowBlur: 0,
                shadowColor: '#9760e4'
              }
            },
            label: {
              show: false
            },
            data: [
              ['2015/11/08', 10, 'DQ'], ['2015/11/09', 7, 'DQ'], ['2015/11/10', 16, 'DQ'],
              ['2015/11/11', 20, 'DQ'], ['2015/11/12', 31, 'DQ'], ['2015/11/13', 16, 'DQ'],
              ['2015/11/14', 7, 'DQ'], ['2015/11/15', 10, 'DQ'], ['2015/11/16', 17, 'DQ']
            ]
          }
        ]
      }
    }
  },
  components: {
    IEcharts
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
  .store {
    width: 100%;
    height: 100%;
  }
  /deep/ .el-slider__runway.disabled .el-slider__bar {
    background: #1790ff;
  }
}
</style>
