/*
 * @Author: web.王晓冬
 * @Date: 2019-10-28 15:44:58
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-29 16:10:11
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
        ref="table"
        maxHeight="350px"
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
      tableData: [],
      // queryFrom: {
      //   busType: 1, // 1报价单 2请购单]
      //   putawayType: 1,
      //   busCode: '',
      // }
    }
  },
  created() {

  },
  watch: {

  },
  methods: {
    businesscommodityGetBusinessCommodityList(params) {
      let api = this.goodsApi.split(',')
      this.$api[api[0]][api[1]](params)
        .then(res => {
          this.tableData = res.data || []
          // 清空商品数量
          this.data.commodityList = []
          this.tableData.forEach(item => {
            // 商品数量-总库存大于0的商品才生成请购单
            let commodityNumber = (item.commodityNumber || 0) - (item.inventoryNumber || 0)
            if (commodityNumber > 0) {
              // 生成请购单商品数量是 请求过来的商品数量-总库存数量
              item.commodityNumber = commodityNumber
              this.data.commodityList.push(item)
            }
          })
        })
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
      return sums
    },
  },
}
</script>
<style scoped>
</style>
