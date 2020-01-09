/*
 * @Author: web.王晓冬
 * @Date: 2019-10-28 15:44:58
 * @LastEditors: 赵伦
 * @LastEditTime: 2020-01-08 15:04:14
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
        :data="data.commodityList"
        default-expand-all
        :tree-props="{children: 'children'}"
        row-key="id"
        ref="table"
      >
        <el-table-column
          prop="commodityCode"
          min-width="220"
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
        show-overflow-tooltip
        label="商品图片"
        min-width="120"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 90px; height: 40px"
            :src="scope.row.goodsPic"
          />
        </template>
      </el-table-column>
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
          prop="reference"
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
          show-overflow-tooltip
          label="是否组装"
          min-width="110"
        >
          <template
            slot-scope="{row}"
            v-if="!row.parentCommodityCode&&row.categoryCode=='PSI_SP_KIND-1'"
          >
            <el-switch
              :active-value="1"
              :inactive-value="0"
              disabled
              v-model="row.isAssembly"
            ></el-switch>
          </template>
        </el-table-column>

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
      default: '商品信息',
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
          let data = res.data || []
          this.tableData = res.data || []
          // 清空商品数量
          this.data.commodityList = []
          this.tableData = this.$$util.formatCommodity(data)
          this.tableData.forEach(item => {
            // 商品数量-总库存大于0的商品才生成请购单
            let commodityNumber = (item.commodityNumber || 0) - (item.inventoryNumber || 0)
            if (commodityNumber > 0&&item.isDirect!=1) {
              // 生成请购单商品数量是 请求过来的商品数量-总库存数量
              item.commodityNumber = commodityNumber
              item.preTaxAmount = +Number(item.reference*commodityNumber*(1+item.taxRate/100)).toFixed(2)
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
