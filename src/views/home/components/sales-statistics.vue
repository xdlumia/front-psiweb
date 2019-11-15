<!--
 * @Author: 高大鹏
 * @Date: 2019-11-15 16:45:27
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-15 19:11:10
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
                  <span class="f24 b mr5 arial">124,543,233</span>元
                </div>
              </div>
              <div style="flex:1">
                <h4>累计销售利润</h4>
                <div>
                  <span class="f24 b mr5 arial">12,123</span>元
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
            <div style="flex:1">232322323233</div>
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

export default {
  data() {
    return {
    }
  },
  components: {
    IEcharts
  },
  computed: {
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
                text: '￥19999',
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
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ]
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
