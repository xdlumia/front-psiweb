/*
 * @Author: 赵伦
 * @Date: 2019-12-19 14:25:38
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-19 14:46:53
 * @Description: 利润分析报表
*/
<template>
  <div class="wrapper">
    <el-tabs>
      <el-tab-pane label="利润分析报表"></el-tab-pane>
    </el-tabs>
    <el-form :model="queryForm" inline size="mini">
      <el-form-item label="选择日期">
        <el-date-picker
          end-placeholder="结束日期"
          range-separator="至"
          start-placeholder="开始日期"
          type="daterange"
          v-model="queryForm.daterange"
          value-format="timestamp"
        ></el-date-picker>
      </el-form-item>
      <el-button size="mini" type="primary">生成报表</el-button>
      <el-button size="mini" type="primary">下载报表</el-button>
      <!-- 筛选 -->
      <el-popover placement="bottom" trigger="click" v-model="filterPopover" width="280">
        <el-link :underline="false" @click="filterPopover=false" class="el-icon-close close fr" style="margin-top:2px;" title="关闭"></el-link>
        <dFilter :form="queryForm"></dFilter>
        <el-button class="tool-item ml15" icon="iconfont icon-filter" size="mini" slot="reference" title="筛选"></el-button>
      </el-popover>
    </el-form>
    <d-table :autoInit="false" :params="queryForm" api="seePsiReportService.royaltyUser" class="d-table" ref="table">
      <el-table-column label="单据编号" prop="name"></el-table-column>
      <el-table-column label="单据类型" prop="paidNum" width="140"></el-table-column>
      <el-table-column label="创建人" prop="paidAmount" width="140"></el-table-column>
      <el-table-column label="创建时间" prop="saleAmount"></el-table-column>
      <el-table-column label="创建部门" prop="paidRatio" width="140"></el-table-column>
      <el-table-column label="客户名称" prop="grossProfit"></el-table-column>
      <el-table-column label="销售数量" prop="paidGrossProfit" width="140"></el-table-column>
      <el-table-column label="销售总金额" prop="returnGoodsGrossProfit" width="140"></el-table-column>
      <el-table-column label="成本总价" prop="royaltyRatio"></el-table-column>
      <el-table-column label="价税合计" prop="baseSalary"></el-table-column>
      <el-table-column label="毛利" prop="royaltyAmount"></el-table-column>
      <el-table-column label="毛利率" prop="royaltyAmount"></el-table-column>
      <el-table-column label="备注" prop="royaltyAmount"></el-table-column>
    </d-table>
  </div>
</template>

<script>
import dFilter from '@/components/filter';

export default {
  data() {
    return {
      queryForm: {
        daterange: [], //
        beginDate: '',
        endDate: '',
        page: 1,
        limit: 15
      },
      filterPopover: false
    };
  },
  watch: {
    'queryForm.daterange': {
      handler(newValue) {
        this.queryForm.beginDate = newValue[0];
        this.queryForm.endDate = newValue[1];
        this.$refs.table.reload();
      }
    }
  },
  components: {
    dFilter
  }
};
</script>

<style scoped lang='scss'>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 20px;
  .d-table {
    flex: 1;
  }
}
</style>
