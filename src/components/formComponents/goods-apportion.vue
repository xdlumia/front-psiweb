/*
 * @Author: web.王晓冬
 * @Date: 2019-10-28 15:44:58
 * @LastEditors: web.徐贺
 * @LastEditTime: 2020-01-07 14:55:50
 * @Description: 新增费用分摊单商品信息
*/
<template>
  <div>
    <form-card :title="title">
      <el-table
        show-summary
        :summary-method="getSummaries"
        size="mini"
        border
        :data="data"
        lazy
        :load="loadChildren"
        :tree-props="{hasChildren:'configId'}"
        ref="table"
        maxHeight="350px"
      >
        <el-table-column
          prop="commodityCode"
          min-width="100"
          label="商品编号"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.commodityCode | codeSlice}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="goodsPic"
          min-width="100"
          label="商品图片"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-image
              style="width: 90px; height: 40px"
              :src="scope.row.goodsPic"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="goodsName"
          min-width="100"
          label="商品名称"
          show-overflow-tooltip
        />
        <el-table-column
          prop="categoryCode"
          min-width="80"
          label="商品类别"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{scope.row.categoryCode | dictionary('PSI_SP_KIND')}}
          </template>
        </el-table-column>
        <el-table-column
          prop="className"
          min-width="80"
          label="商品分类"
          show-overflow-tooltip
        />
        <el-table-column
          prop="specOne"
          min-width="80"
          label="规格"
          show-overflow-tooltip
        />
        <el-table-column
          prop="configName"
          label="配置"
          min-width="80"
          show-overflow-tooltip
        />
        <el-table-column
          prop="discountSprice"
          min-width="160"
          label="折后销售单价"
          show-overflow-tooltip
        />

        <el-table-column
          prop="commodityNumber"
          min-width="70"
          label="商品数量"
          show-overflow-tooltip
        />

        <el-table-column
          prop="taxRate"
          min-width="70"
          label="税率%"
          show-overflow-tooltip
        />

        <el-table-column
          prop="preTaxAmount"
          min-width="120"
          label="折后总价"
          show-overflow-tooltip
          :formatter="(row)=>((row.commodityNumber||0)*(row.discountSprice||0)).toFixed(2)"
        />
        <el-table-column
          prop="apportionmentAmount"
          min-width="120"
          label="分摊后总价"
          show-overflow-tooltip
        />

      </el-table>
    </form-card>

  </div>
</template>
<script>
export default {
  props: {
    data: Array,
    params: {
      type: Object,
      default: () => ({})
    },
    title: {
      default: '商品信息',
      type: String
    },
    goodsApi: String,
  },
  data() {
    return {
    }
  },
  created() {

  },
  watch: {

  },
  methods: {
    async loadChildren(row, node, cb) {
      let { data } = await this.$api.seePsiCommonService.commonquotationconfigdetailsListConfigByGoodName(
        { commodityCode: row.commodityCode }
      );
      cb(data);
    },
    // 自定义账单金额数据
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((col, index) => {
        if (index == 0) {
          sums[index] = '总价'
        } else if (col.property == 'preTaxAmount') {

          sums[index] = data.reduce((sum, curr) => {
            return sum + (curr.commodityNumber || 0) * (curr.discountSprice || 0)
          }, 0).toFixed(2)
        }
        // 折后金额
        else if (col.property == 'commodityNumber') {
          const values = data.map(item => Number(item[col.property] || 0));
          sums[index] = values.reduce((sum, curr) => {
            return sum + curr
          }, 0)
        }
      });
      return sums
    },
  },
}
</script>
<style scoped>
</style>
