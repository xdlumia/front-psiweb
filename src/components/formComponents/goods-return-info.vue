/*
 * @Author: web.王晓冬
 * @Date: 2019-10-28 15:44:58
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-04 21:45:49
 * @Description: 退货商品商品信息
*/
<template>
  <div>
    <form-card :title="title">
      <el-table
        show-summary
        :summary-method="getSummaries"
        size="mini"
        border
        :data="data || []"
        default-expand-all
        :tree-props="{children: 'children'}"
        row-key="id"
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
        >
          <template slot-scope="scope">
            <el-image
              :src="scope.row.goodsPic"
              class="d-center"
              fit="contain"
              style="width: 100px; height: 40px"
            >
              <span slot="error">暂无图片</span>
            </el-image>
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
          prop="alterationNumber"
          min-width="80"
          label="退货数量"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span class="d-text-blue">{{scope.row.alterationNumber}}/{{scope.row.commodityNumber}}</span>
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
          prop="inventoryPrice"
          min-width="80"
          label="销售成本"
          show-overflow-tooltip
        />

        <el-table-column
          prop="commodityNumber"
          min-width="70"
          label="销售数量"
          show-overflow-tooltip
        />

        <el-table-column
          prop="alterationPrice"
          min-width="100"
          label="退货单价"
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
          prop="taxPrice"
          min-width="120"
          label="税后退货单价"
          show-overflow-tooltip
        />
        <el-table-column
          prop="taxTotalAmount"
          min-width="120"
          label="税后总价"
          show-overflow-tooltip
        />
        <el-table-column
          prop="isTeardown"
          min-width="120"
          label="是否拆卸"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-switch
              :disabled="disabled"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.isTeardown"
            ></el-switch>
          </template>

        </el-table-column>
        <el-table-column
          prop="note"
          min-width="120"
          label="备注"
          show-overflow-tooltip
        />
      </el-table>
    </form-card>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    from: String,
    data: Array,
    params: {
      type: Object,
      default: () => ({})
    },
    form: {
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
    // 销售单编号列表下拉
    options: Array
  },
  data() {
    return {
      // queryFrom: {
      //   busType: 1, // 1报价单 2请购单]
      //   putawayType: 1,
      //   busCode: '',
      // }
    }
  },
  watch: {

  },
  created() {

  },
  methods: {
    // 自定义账单金额数据
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((col, index) => {
        if (index == 0) {
          sums[index] = '总价'
        } else if (col.property == 'taxPrice' || col.property == 'taxTotalAmount') {
          const values = data.map(item => Number(item[col.property] || 0));
          sums[index] = values.reduce((sum, curr) => {
            const val = Number(curr)
            return sum + curr
          }, 0).toFixed(2)
        }
        //获取税后总价
        if (col.property == 'taxTotalAmount') {
          this.form.shouldRefundAmount = sums[index]
        }
      });
      return sums
    },
  },
}
</script>
<style scoped>
</style>
