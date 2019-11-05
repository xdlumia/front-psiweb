/*
 * @Author: web.王晓冬
 * @Date: 2019-10-28 17:05:01
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-05 11:39:35
 * @Description: 回款周期
*/  
<template>
  <form-card title="回款周期">
    <echarts :options="echartOption"></echarts>
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
    echartOption() {
      return {
        color: ['#000', '#ccc'],
        title: {
          text: '同名数量统计',
          subtext: '纯属虚构',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{b} : {c} ({d}%)"
        },
        series: {
          name: '姓名',
          type: 'pie',
          radius: '55%',
          center: ['40%', '50%'],
          label: {
            normal: {
              formatter: "{b} : {c} ({d}%)",
            }
          },
          data: [
            { value: 0.1, name: '360天以上' },
            { value: 0.1, name: '邮件营销' },
            { value: 0.1, name: '联盟广告' },
            { value: 0.1, name: '视频广告' },
            { value: 0.1, name: '百度' },
            { value: 0.1, name: '谷歌' },
            { value: 0.1, name: '必应' },
            { value: 0.1, name: '其他' }],
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
