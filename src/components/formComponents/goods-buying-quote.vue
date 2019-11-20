/*
 * @Author: web.王晓冬
 * @Date: 2019-10-28 15:44:58
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-20 14:59:40
 * @Description: 生成请购单商品信息
*/
<template>
  <div>
    <form-card :title="title">
      <el-table
        show-summary
        :summary-method="getSummaries"
        size="mini"
        border
        :data="tableData || []"
        ref="table"
      >
        <el-table-column
          prop="commodityCode"
          min-width="100"
          label="商品编号"
          show-overflow-tooltip
        />

        <el-table-column
          prop="goodsName"
          min-width="100"
          label="商品名称"
          show-overflow-tooltip
        />
        <el-table-column
          prop="goodsPic"
          min-width="100"
          label="商品图片"
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
          prop="configName"
          label="配置"
          min-width="80"
          show-overflow-tooltip
        />
        <el-table-column
          prop="note"
          min-width="120"
          label="备注"
          show-overflow-tooltip
        />
        <el-table-column
          prop="specOne"
          min-width="80"
          label="规格"
          show-overflow-tooltip
        />

        <el-table-column
          prop="salesPrice"
          min-width="80"
          label="销售单价"
          show-overflow-tooltip
        />

        <el-table-column
          prop="commodityNumber"
          min-width="70"
          label="商品数量"
          show-overflow-tooltip
        />

        <el-table-column
          min-width="100"
          label="退货单价"
          prop="salesPrice"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="taxRate"
          min-width="70"
          label="税率%"
          show-overflow-tooltip
        />

        <el-table-column
          prop="preTaxAmount"
          min-width="120"
          label="含税总价"
          show-overflow-tooltip
        />
        <el-table-column
          prop="inventoryNumber"
          min-width="120"
          label="总库存"
          show-overflow-tooltip
        />

      </el-table>
    </form-card>

  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    params: {
      type: Object,
      default: () => ({})
    },
    title: {
      default: '退货商品信息',
      type: String
    },
    disabled: {
      default: false,
      type: Boolean
    },
  },
  data() {
    return {
      tableData: [],
      // queryFrom: {
      //   busType: 1, // 1报价单 2请购单]
      //   putawayType: 1,
      //   busCode: '',
      // }
    }
  },
  created() {
    this.businesscommodityGetBusinessCommodityList()
  },
  watch: {

  },
  methods: {
    businesscommodityGetBusinessCommodityList() {
      this.$api.seePsiSaleService.businesscommodityGetBusinessCommodityList(this.params)
        .then(res => {
          this.tableData = res.data || []
        })
    },
    sumTaxPrice(row, index) {
      let taxRate = (row.taxRate || 100) / 100  ///税率
      let refundNumber = row.refundNumber || 1 //退货数量
      let salesPrice = row.salesPrice || 1 //销售单价
      // 税后销售单价  公式:销售单价 * (1-税率)
      row.taxPrice = salesPrice * (1 - taxRate)
      // 销售税后总价  公式:税后销售单价 * 销售数量
      row.taxTotalAmount = (refundNumber * row.taxPrice).toFixed(2)

    },
    // 自定义账单金额数据
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((col, index) => {
        if (index == 0) {
          sums[index] = '总价'
        } else if (col.property == 'commodityNumber' || col.property == 'preTaxAmount') {
          const values = data.map(item => Number(item[col.property] || 0));
          sums[index] = values.reduce((sum, curr) => {
            const val = Number(curr)
            return sum + curr
          }, 0)
        }
      });
      //获取税后总价
      this.data.shouldRefundAmount = sums[13]
      return sums
    },
  },
}
</script>
<style scoped>
</style>
