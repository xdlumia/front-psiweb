/*
 * @Author: web.王晓冬
 * @Date: 2019-10-28 17:05:01
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-05 17:18:17
 * @Description: 回款周期
*/  
<template>
  <form-card title="回款周期">
    <div class="d-flex">
      <echarts
        style="width:600px"
        :options="echartOption"
      ></echarts>
      <div class="ar">
        <el-date-picker
          class="mt20"
          size="mini"
          v-model="value1"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
        <el-table
          :summary-method="getSummaries"
          show-summary
          class="d-inline mt10"
          :data="pieData"
          size="mini"
        >
          <el-table-column width="30">
            <template slot-scope="scope">
              <span
                class="d-block"
                style="height:11px; background:#000; width:20px; border-radius:5px"
                :style="{'background-color':colors[scope.$index]}"
              ></span>
            </template>
          </el-table-column>
          <el-table-column
            prop="value"
            label="时间"
            width="60"
          />
          <el-table-column
            prop="value"
            label="数量"
            width="60"
          />
          <el-table-column
            prop="value"
            label="占比"
            width="60"
          />
        </el-table>
      </div>
    </div>

  </form-card>
</template>
<script>
import echarts from 'vue-echarts';
import 'echarts/lib/chart/pie' //bar图
import 'echarts/lib/component/tooltip' //提示
import 'echarts/lib/component/title' //类型
let colors = ['#55acee', '#fa9945', '#35ca93', '#788cf0', '#f96604']
export default {
  name: 'paybackPeriods',
  components: { echarts },
  data() {
    return {
      value1: '',
      colors: colors,
      pieData: [
        { value: 0.1, name: '360天以上' },
        { value: 0.1, name: '邮件营销' },
        { value: 0.1, name: '联盟广告' },
        { value: 0.1, name: '视频广告' },
        { value: 0.1, name: '百度' }
      ]
    };
  },
  computed: {
    echartOption() {
      return {
        color: colors,
        title: {
          text: '回款周期分布',
          x: 'left'
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
          data: this.pieData,
        }

      }
    }
  },
  methods: {
    // 自定义账单金额数据
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((col, index) => {
        if (index == 1) {
          sums[index] = '合计'
        } else if (index == 2 || index == 3) {
          const values = data.map(item => Number(item[col.property]));
          sums[index] = values.reduce((sum, curr) => {
            const val = Number(curr)
            return sum + curr
          }, 0)
        }
      });
      return sums
    },
  }
};
</script>
<style lang="scss" scoped>
</style>
