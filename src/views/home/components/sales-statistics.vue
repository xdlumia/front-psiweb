<!--
 * @Author: 高大鹏
 * @Date: 2019-11-15 16:45:27
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-16 13:31:51
 * @Description: description
 -->
<template>
  <div class="mb20">
    <el-row :gutter="40" class="row-layout">
      <el-col :span="12">
        <div style="display: flex;flex-direction: column;">
          <div>
            <h3 class="b mb5" style="text-indent:20px">销售情况</h3>
          </div>
          <div class="ba" style="flex:0 0 540px">
            <div
              class="p20"
              style="display: flex;height:80px;margin-bottom:-50px;box-sizing: border-box;"
            >
              <div style="flex:1">
                <h4>累计销售总额</h4>
                <div>
                  <span
                    class="f24 b mr5 arial"
                  >{{Math.floor(Math.random() * 10000) | thousandBitSeparator}}</span>元
                </div>
              </div>
              <div style="flex:1">
                <h4>累计销售利润</h4>
                <div>
                  <span
                    class="f24 b mr5 arial"
                  >{{Math.floor(Math.random() * 10000) | thousandBitSeparator}}</span>元
                </div>
              </div>
            </div>
            <IEcharts style="width:100%;height:500px;" :option="brokenOptions"></IEcharts>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div style="display: flex;flex-direction: column;">
          <div>
            <h3 class="b mb5" style="text-indent:20px">销售类别占比</h3>
          </div>
          <div class="ba" style="display:flex;flex:0 0 540px">
            <IEcharts style="flex:1;height:500px;" :option="pieOptions"></IEcharts>
            <div style="flex:1;display: flex;align-items: center">
              <el-row style="flex:1" class="mr20">
                <div v-for="(item, index) in mockData" :key="index" class="mb20 d-hidden">
                  <el-col :span="8" class="br">
                    <span
                      style="display:inline-block;width:10px;height:10px;margin-right:10px;"
                      :style="{background: color[index]}"
                    ></span>
                    <span>{{item.name}}</span>
                  </el-col>
                  <el-col :span="4" class="ac">{{Math.floor(item.value / salesSum * 100)}}%</el-col>
                  <el-col :span="12" class="ar">￥{{item.value | thousandBitSeparator}}</el-col>
                </div>
              </el-row>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type='text/ecmascript-6'>
import IEcharts from 'vue-echarts-v3'
import 'echarts/lib/chart/line' // 引入折线
import 'echarts/lib/chart/pie' // 引入饼图
import filterMix from './filter'

export default {
  mixins: [filterMix],
  data() {
    return {
      color: ['#45a1ff', '#5bcb75', '#fcd44b', '#f04864', '#9861e5', '#4ecbcb'],
      mockData: [
        {
          name: 'test1',
          percent: Math.floor(Math.random() * 100),
          value: Math.floor(Math.random() * 10000)
        },
        {
          name: 'test2',
          percent: Math.floor(Math.random() * 100),
          value: Math.floor(Math.random() * 10000)
        },
        {
          name: 'test3',
          percent: Math.floor(Math.random() * 100),
          value: Math.floor(Math.random() * 10000)
        },
        {
          name: 'test4',
          percent: Math.floor(Math.random() * 100),
          value: Math.floor(Math.random() * 10000)
        },
        {
          name: 'test5',
          percent: Math.floor(Math.random() * 100),
          value: Math.floor(Math.random() * 10000)
        },
        {
          name: 'test6',
          percent: Math.floor(Math.random() * 100),
          value: Math.floor(Math.random() * 10000)
        }
      ]
    }
  },
  components: {
    IEcharts
  },
  computed: {
    salesSum() {
      return this.mockData.reduce((val, item) => {
        return val + parseFloat(item.value)
      }, 0)
    },
    brokenOptions() {
      return {
        tooltip: {
          trigger: 'axis'
        },
        color: ['#45a1ff', '#31c15c'],
        bottom: 20,
        height: '400px',
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [320, 332, 301, 1290, 1290, 1290, 1290],
          type: 'line',
          name: '金额'
        }, {
          data: [820, 200, 901, 934, 1290, 1330, 1320],
          type: 'line',
          name: '利润'
        }]
      }
    },
    pieOptions() {
      return {
        tooltip: {
          trigger: 'axis'
        },
        color: this.color,
        height: '500px',
        graphic: {
          type: 'group',
          left: 'center',
          top: 'center',
          right: 'center',
          children: [
            {
              type: 'text',
              left: 'center',
              right: 'center',
              top: 70,
              z: 2,
              zlevel: 100,
              style: {
                text: '销售额',
                fontSize: 14,
                textAlign: 'center',
                fill: '#999999'
              }
            },
            {
              type: 'text',
              left: 'center',
              right: 'center',
              z: 2,
              zlevel: 100,
              style: {
                y: 100,
                text: '￥' + this.$options.filter.thousandBitSeparator(this.salesSum),
                fontSize: 28,
                textAlign: 'center',
                fontFamily: '"Arial Normal", "Arial"'
              }
            }
          ]
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: true,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            itemStyle: { // 此配置
              normal: {
                borderWidth: 4,
                borderColor: '#ffffff'
              }
            },
            data: this.mockData
          }
        ]
      }
    }
  }
}

</script>

<style scoped lang='scss'>
/deep/ .row-layout {
  margin-left: -25px !important;
  margin-right: -25px !important;
}
.arial {
  font-family: "Arial Normal", "Arial";
}
</style>
