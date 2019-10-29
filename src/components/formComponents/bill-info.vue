/*
 * @Author: web.王晓冬
 * @Date: 2019-10-18 09:36:32
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-29 16:08:34
 * @Description: 账单信息
 */
<template>
  <form-card title='账单信息'>
    <el-row>
      <el-col :span="8">
        <div class="d-text-black">结账方式</div>
        <div class="d-text-qgray mt5 mb20">2019-9-21</div>
      </el-col>
    </el-row>
    <d-table
      :paging="false"
      show-summary
      :summary-method="getSummaries"
      api="seePumaidongService.collegeManagerList"
      ref="companyTable"
      style="height:500px"
    >
      <el-table-column
        prop="title"
        label="账期"
        min-width="140"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        min-width="140"
        label="付款时间"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-date-picker
            size="mini"
            value-format="timestamp"
            v-model="scope.row.titme"
            align="right"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        min-width="100"
        label="付款金额"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-input
            size="mini"
            placeholder="请输入"
            v-model="scope.row.id"
          ></el-input>
        </template>
      </el-table-column>
    </d-table>
    <div class="mt10 el-icon-circle-plus-outline"> 增加账期</div>
  </form-card>
</template>
<script>
export default {
  prop: ['data'],
  data() {
    return {
    }
  },
  methods: {
    // 自定义账单金额数据
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((col, index) => {
        if (index == 0) {
          sums[index] = '总价'
        } else if (index == 2) {
          const values = data.map(item => Number(item[col.property]));
          sums[index] = values.reduce((sum, curr) => {
            const val = Number(curr)
            return sum + curr
          }, 0)
        }
      });
      return sums
    },
  },
  components: {
  },
}
</script>
<style scoped>
</style>
