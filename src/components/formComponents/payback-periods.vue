/*
 * @Author: web.王晓冬
 * @Date: 2019-10-28 17:05:01
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-05 11:02:34
 * @Description: 回款周期
*/  
<template>
  <form-card title="回款周期">
    <echarts :options="orderEchartOption"></echarts>
  </form-card>
</template>
<script>
import echarts from 'vue-echarts';

import 'echarts/lib/chart/bar' //bar图
import 'echarts/lib/component/tooltip' //提示
import 'echarts/lib/component/legend' //类型
export default {
  name: 'paybackPeriods',

  components: { echarts },
  data() {
    return {

    };
  },
  computed: {
    orderEchartOption() {
      return {
        title: {
          text: '回款周期分布'
        },
        // 类型颜色
        color: ['#53c975', '#409EFF'],

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '70px',
          top: '10%',
        },
        legend: {
          data: ['登录天数', '登录时长',]
        },
        series: {
          name: '姓名',
          type: 'pie',
          radius: '55%',
          center: ['40%', '50%'],
          data: data.seriesData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      }
    }
  },
  methods: {

  }
};
</script>
<style lang="scss" scoped>
</style>
