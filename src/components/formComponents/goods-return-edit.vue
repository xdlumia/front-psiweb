/*
 * @Author: web.王晓冬
 * @Date: 2019-10-28 15:44:58
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-15 19:13:56
 * @Description: 换货商品信息 -退货商品商品信息
*/
<template>
  <div>
    <form-card :title="true">
      <div slot="title">
        <span>{{title}}</span>
        <span class="f14 ml30">
          报价单:
          <el-select
            size="mini"
            :disabled="disabled"
            v-model="data.quotationCode"
          >
            <el-option
              v-for="item in options"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </span>

      </div>
      <el-table
        show-summary
        :summary-method="getSummaries"
        size="mini"
        border
        :data="data.businessCommoditySaveVoList || []"
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
          prop="specOne"
          min-width="80"
          label="规格"
          show-overflow-tooltip
        />

        <el-table-column
          prop="costAmount"
          min-width="80"
          label="销售成本"
          show-overflow-tooltip
        />

        <el-table-column
          prop="salesNumber"
          min-width="70"
          label="销售数量"
          show-overflow-tooltip
        />
        <el-table-column
          prop="refundNumber"
          min-width="100"
          label="退货商品数量"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-form-item
              class="mb0"
              :prop="`businessCommoditySaveVoList.${scope.$index}.refundNumber`"
              :rules="[{required:false},{type:'positiveNum'}]"
            >
              <el-input
                size="mini"
                @input="sumTaxPrice(scope.row,scope.$index)"
                :disabled="disabled"
                :show-word-limit="false"
                v-model="scope.row.refundNumber"
              />
            </el-form-item>
          </template>
        </el-table-column>

        <el-table-column
          min-width="100"
          label="退货单价"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-form-item
              class="mb0"
              :prop="`businessCommoditySaveVoList.${scope.$index}.salesPrice`"
              :rules="[{required:false},{type:'price'}]"
            >
              <el-input
                size="mini"
                @input="sumTaxPrice(scope.row, scope.$index)"
                :disabled="disabled"
                :show-word-limit="false"
                v-model="scope.row.salesPrice"
              ></el-input>
            </el-form-item>
          </template>
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
          prop="note"
          min-width="120"
          label="是否拆卸"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-form-item
              class="mb0"
              prop="isTeardown"
            >
              <el-switch
                :disabled="disabled"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.isTeardown"
              ></el-switch>
            </el-form-item>
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
import { log } from 'util'
export default {
  props: {
    data: {
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
      tableData: [],
      quotationCode: this.options[0] || '',
      queryFrom: {
        busType: 1,
        putawayType: 1,
        busCode: '',
      }
    }
  },
  watch: {
    'data.quotationCode': {
      handler(val) {
        this.$nextTick(() => {
          this.queryFrom.busCode = this.data.quotationCode
          this.businesscommodityGetBusinessCommodityList()
        })
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    businesscommodityGetBusinessCommodityList() {
      this.$api.seePsiSaleService.businesscommodityGetBusinessCommodityList(this.queryFrom)
        .then(res => {
          this.data.businessCommoditySaveVoList = res.data || []
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
        } else if (col.property == 'taxPrice' || col.property == 'taxTotalAmount') {
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
