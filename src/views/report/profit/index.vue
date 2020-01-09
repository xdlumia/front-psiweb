/*
 * @Author: 赵伦
 * @Date: 2019-12-19 14:25:38
 * @LastEditors: 赵伦
 * @LastEditTime: 2020-01-08 15:08:01
 * @Description: 利润分析报表
*/
<template>
  <div class="wrapper" v-loading="loading">
    <el-tabs>
      <el-tab-pane label="利润分析报表"></el-tab-pane>
    </el-tabs>
    <el-form :model="queryForm" inline size="mini">
      <el-form-item label="选择日期" style="vertical-align:baseline;">
        <el-date-picker
          :clearable="false"
          :default-time="['00:00:00','23:59:59']"
          @change="dateChange"
          end-placeholder="结束日期"
          range-separator="至"
          start-placeholder="开始日期"
          type="daterange"
          v-model="daterange"
          value-format="timestamp"
        ></el-date-picker>
      </el-form-item>
      <el-button @click="makeReport" size="mini" type="primary">生成报表</el-button>
      <el-button @click="download" size="mini" type="primary">下载报表</el-button>
      <!-- 筛选 -->
      <el-popover placement="bottom" trigger="click" v-if="init" v-model="filterPopover" width="280">
        <el-link :underline="false" @click="filterPopover=false" class="el-icon-close close fr" style="margin-top:2px;" title="关闭"></el-link>
        <dFilter :options="filters" @change="makeReport" v-model="queryForm"></dFilter>
        <el-button class="tool-item ml15 fr" icon="iconfont icon-filter" size="mini" slot="reference" title="筛选"></el-button>
      </el-popover>
    </el-form>
    <d-table
      :autoInit="false"
      :params="queryForm"
      :showSummary="true"
      :summary-method="getSummary"
      api="seePsiReportService.saleprofitreportList"
      class="d-table"
      ref="table"
      style="height:calc(100% - 100px);max-height:calc(100% - 100px) !important;width:100%;"
    >
      <el-table-column label="单据编号" min-width="220" prop="dataCode">
        <template slot-scope="{row}">
          <el-link :underline="false" @click="openDetail(row)" class="f12" type="primary">{{row.dataCode|codeSlice}}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="单据类型" min-width="120" prop="paidNum">
        <template slot-scope="{row}">
          <span>{{dataTypeText[row.dataType]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="销售人员" min-width="140" prop="creatorName"></el-table-column>
      <el-table-column label="创建时间" min-width="160" prop="createTime">
        <template slot-scope="{row}">{{row.createTime|timeToStr('YYYY-MM-DD HH:mm:ss')}}</template>
      </el-table-column>
      <el-table-column label="创建部门" min-width="100" prop="deptName"></el-table-column>
      <el-table-column label="客户名称" min-width="140" prop="clientName"></el-table-column>
      <el-table-column label="销售数量" min-width="100" prop="totalSalesNumber"></el-table-column>
      <el-table-column label="销售总金额" min-width="120" prop="salesAmount"></el-table-column>
      <el-table-column label="成本总价" min-width="100" prop="costAmount"></el-table-column>
      <el-table-column label="价税合计" min-width="100" prop="preTaxAmount"></el-table-column>
      <el-table-column label="成本单价" min-width="100" prop="costPrice"></el-table-column>
      <el-table-column label="毛利" min-width="100" prop="profitAmount"></el-table-column>
      <el-table-column label="毛利率" min-width="100" prop="profitRate">
        <template slot-scope="{row}">{{row.profitRate}}%</template>
      </el-table-column>
      <el-table-column label="备注" min-width="140" prop="note"></el-table-column>
    </d-table>
    <component :code="currentBusCode" :is="busInfo[currentBusType].detailPage" :visible.sync="showBusDetail" v-if="showBusDetail" />
  </div>
</template>

<script>
import BusMixin from '@/views/finance/payment';

export default {
  components: {},
  mixins: [BusMixin],
  data() {
    return {
      daterange: [],
      queryForm: {
        // 当前页数
        page: 1,
        // 每页显示记录数
        limit: 20,
        // 最小完成时间
        minFinishDate: '',
        // 最大完成时间
        maxFinishDate: ''
      },
      filterPopover: false,
      // prettier-ignore
      filters: [
        { label: '单据编号', prop: 'dataCode',default:true, },
        { label: '单据类型', prop: 'dataType',type:'select',options:[
          // (0销售出库单，1销售退货单，2销售换货单)
          {label:'销售出库单',value:0},
          {label:'销售退货单',value:1},
          {label:'销售换货单',value:2},
         ],default:true,},
        { label: '创建人', prop: 'creator', type: 'employee',default:true, },
        { label: '创建时间', prop: 'CreateTime', type: 'dateRange',default:true, },
        { label: '创建部门', prop: 'deptTotalCode', type: 'dept',default:true, },
        { label: '客户名称', prop: 'clientName',default:true, },
        { label: '销售数量', prop: 'TotalSalesNumber', type: 'numberRange',default:true },
        { label: '销售总金额', prop: 'SalesAmount', type: 'numberRange',default:true, },
        { label: '成本总价', prop: 'CostAmount', type: 'numberRange',default:true, },
        { label: '税价合计', prop: 'PreTaxAmount', type: 'numberRange',default:true, },
        { label: '成本单价', prop: 'CostPrice', type: 'numberRange',default:true, },
        { label: '毛利', prop: 'ProfitAmount', type: 'numberRange',default:true, },
        { label: '毛利率', prop: 'ProfitRate', type: 'numberRange',default:true, },
      ],
      // 数据类型(0销售出库单，1销售退货单，2销售换货单)
      dataTypeText: {
        0: '销售出库单',
        1: '销售退货单',
        2: '销售换货单'
      },
      showDetail: false,
      currentCode: '',
      currentType: '',
      init: false,
      statistic: {},
      loading: false
    };
  },
  mounted() {},
  methods: {
    dateChange(e) {
      this.queryForm.minFinishDate = e ? e[0] : '';
      this.queryForm.maxFinishDate = e ? e[1] : '';
    },
    openDetail(row) {
      this.openBusPage({
        busCode: row.dataCode,
        busType: row.dataType
      });
    },
    async getStatistic() {
      let {
        data
      } = await this.$api.seePsiReportService.saleprofitreportGetSaleProfitSum(
        this.queryForm
      );
      this.statistic = data;
    },
    async makeReport() {
      if (!(this.queryForm.minFinishDate && this.queryForm.maxFinishDate)) {
        return this.$message({
          message: '请先选择报表时间',
          type: 'warning',
          showClose: true
        });
      }
      this.loading = true;
      try {
        this.init = true;
        await this.getStatistic();
        this.$refs.table.reload(1);
      } catch (error) {}
      this.loading = false;
    },
    getSummary(param) {
      let { columns, data } = param;
      data = data || [];
      const sums = [];
      columns.forEach((col, index) => {
        if (
          [
            'totalSalesNumber',
            'salesAmount',
            'costAmount',
            'preTaxAmount',
            'profitAmount',
            'profitRate',
            'costPrice'
          ].includes(col.property)
        ) {
          let prop = col.property;
          sums[index] =
            +Number(this.statistic[prop]).toFixed(2) +
            (prop == 'profitRate' ? '%' : '');
        } else if (index == 0) {
          sums[0] = '总计';
        } else sums[index] = '';
      });
      return sums;
    },
    async download() {
      if (!(this.queryForm.minFinishDate && this.queryForm.maxFinishDate)) {
        return this.$message({
          message: '请先选择报表时间',
          type: 'warning',
          showClose: true
        });
      }
      let { data } = await this.$api.seePsiReportService.saleprofitreportExport(
        this.queryForm
      );
      let a = document.createElement('a');
      a.href = data;
      a.download = '利润分析报表';
      a.target = '_blank';
      a.click();
    }
  }
};
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
