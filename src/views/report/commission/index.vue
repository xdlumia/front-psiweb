/*
 * @Author: 高大鹏
 * @Date: 2019-11-22 16:40:16
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-20 13:47:41
 * @Description: description
*/
<template>
  <div class="wrapper">
    <el-tabs>
      <el-tab-pane label="提成报表"></el-tab-pane>
    </el-tabs>
    <el-form size="mini" :model="queryForm" inline>
      <el-form-item label="选择日期">
        <el-date-picker
          v-model="queryForm.daterange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="timestamp"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <d-table
      :params="queryForm"
      ref="table"
      class="d-table"
      :autoInit="false"
      api="seePsiReportService.royaltyUser"
    >
      <el-table-column label="员工" prop="name"></el-table-column>
      <el-table-column width="140" label="回款销售出库单数量" prop="paidNum"></el-table-column>
      <el-table-column width="140" label="周期回款金额" prop="paidAmount"></el-table-column>
      <el-table-column label="销售额" prop="saleAmount"></el-table-column>
      <el-table-column width="140" label="周期回款比例" prop="paidRatio"></el-table-column>
      <el-table-column label="总毛利润" prop="grossProfit"></el-table-column>
      <el-table-column width="140" label="周期回款毛利润" prop="paidGrossProfit"></el-table-column>
      <el-table-column width="140" label="退货商品毛利润" prop="returnGoodsGrossProfit"></el-table-column>
      <el-table-column label="提成比例" prop="royaltyRatio"></el-table-column>
      <el-table-column label="底薪" prop="baseSalary"></el-table-column>
      <el-table-column label="提成金额" prop="royaltyAmount"></el-table-column>
    </d-table>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data() {
    return {
      queryForm: {
        daterange: [], //
        beginDate: '',
        endDate: '',
        page: 1,
        limit: 15
      }
    }
  },
  watch: {
    'queryForm.daterange': {
      handler(newValue) {
        this.queryForm.beginDate = newValue[0]
        this.queryForm.endDate = newValue[1]
        this.$refs.table.reload()
      }
    }
  },
  components: {
  }
}
</script>

<style scoped lang='scss'>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100%;
  padding: 0 20px;
  .d-table {
    flex: 1;
  }
}
</style>
