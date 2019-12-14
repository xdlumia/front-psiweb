/*
 * @Author: web.王晓冬
 * @Date: 2019-10-28 15:44:58
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-14 14:45:50
 * @Description: 退货商品商品信息
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
        :data="returnTableData || []"
        lazy
        :load="loadChildren"
        :tree-props="{hasChildren:'configId'}"
        row-key="id"
        ref="table"
      >
        <el-table-column
          min-width="80"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              class="el-icon-remove f18"
              @click="del(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="commodityCode"
          min-width="100"
          label="商品编号"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{scope.row.commodityCode}}
          </template>
        </el-table-column>
        <el-table-column
          prop="goodsName"
          min-width="100"
          label="商品名称"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{scope.row.goodsName}}
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

        <!-- <el-table-column
          prop="costAmount"
          min-width="80"
          label="销售成本"
          show-overflow-tooltip
        /> -->

        <el-table-column
          prop="customNumber"
          min-width="70"
          label="销售数量"
          show-overflow-tooltip
        />
        <el-table-column
          prop="commodityNumber"
          min-width="100"
          label="退货商品数量"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-form-item
              class="mb0"
              :prop="'businessCommoditySaveVoList.' + scope.$index + '.commodityNumber'"
              :rules="[{required:false},{type:'positiveNum'}]"
            >
              <el-input
                size="mini"
                @input="sumTaxPrice(scope.row,scope.$index)"
                :disabled="disabled"
                :show-word-limit="false"
                v-model="scope.row.commodityNumber"
              />
            </el-form-item>
          </template>
        </el-table-column>

        <el-table-column
          prop="alterationPrice"
          min-width="100"
          label="退货单价"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-form-item
              class="mb0"
              :prop="`businessCommoditySaveVoList.${scope.$index}.alterationPrice`"
              :rules="[{required:false},{type:'price'}]"
            >
              <el-input
                size="mini"
                @input="sumTaxPrice(scope.row, scope.$index)"
                :disabled="disabled"
                :show-word-limit="false"
                v-model="scope.row.alterationPrice"
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
          label="备注"
          show-overflow-tooltip
        />
      </el-table>
    </form-card>
    <!-- 对退货的商品进行编辑 -->
    <goods-exchange-edit
      v-if="from=='exchange'"
      :data="data"
      title="换出商品信息"
    ></goods-exchange-edit>
  </div>
</template>
<script>

import { watch } from 'fs'
export default {
  components: {},
  props: {
    from: String,
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
    // 销售单编号列表下拉
    options: Array
  },
  data() {
    return {
      returnTableData: [],
      // queryFrom: {
      //   busType: 1, // 1报价单 2请购单]
      //   putawayType: 1,
      //   busCode: '',
      // }
    }
  },
  watch: {
    'data.quotationCode': {
      handler(val) {
        if (!val) return
        this.salesquotationQueryMayCommodity()
      },
      deep: true,
      immediate: true
    }
  },
  computed: {},
  created() {

  },
  methods: {
    async loadChildren(row, node, cb) {
      let { data } = await this.$api.seePsiCommonService.commonquotationconfigdetailsListConfigByGoodName(
        { commodityCode: row.commodityCode }
      );
      cb(data);
    },
    // 删除退货
    del(row) {
      let index = this.data.businessCommoditySaveVoList.findIndex(item => item.id == row.id)
      this.data.businessCommoditySaveVoList.splice(index, 1)
      // this.returnTableData.splice(index, 1)
    },
    salesquotationQueryMayCommodity() {
      this.$api.seePsiSaleService.salesquotationQueryMayCommodity({ quotaionCode: this.data.quotationCode })
        .then(res => {
          let data = res.data || []
          this.data.businessCommoditySaveVoList = data
          this.data.businessCommoditySaveVoList.map(item => {
            item.customNumber = item.commodityNumber
            item.commodityNumber = item.actionableNumber || 0
          })
          // 直接使用this.data.businessCommoditySaveVoList数据响应不过来
          this.returnTableData = this.data.businessCommoditySaveVoList

          // this.data.exChangeCommodityList 是临时数据 存放换货后的数据
          if (this.data.exChangeCommodityList) {
            this.data.exChangeCommodityList = []
          }
        })
    },
    sumTaxPrice(row, index) {
      if (row.commodityNumber > row.actionableNumber) {
        this.$message({
          message: `退货商品数量超过${row.actionableNumber || 0},不能退货`,
          type: 'error',
          showClose: true,
        });
        row.commodityNumber = row.actionableNumber
        return
      }

      let taxRate = (row.taxRate || 100) / 100  ///税率
      let commodityNumber = row.commodityNumber || 0 //退货数量
      let alterationPrice = row.alterationPrice || 0 //退货单价
      // 税后销售单价  公式:销售单价 * (1-税率)
      row.taxPrice = (alterationPrice * (1 - taxRate)).toFixed(2)
      // 销售税后总价  公式:税后销售单价 * 退货数量
      row.taxTotalAmount = (commodityNumber * row.taxPrice).toFixed(2)

    },
    // 自定义账单金额数据
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((col, index) => {
        if (index == 0) {
          sums[index] = '总价'
        } else if (['taxPrice', 'alterationPrice', 'taxTotalAmount', 'customNumber', 'commodityNumber'].includes(col.property)) {
          let values = data.map(item => Number(item[col.property] || 0));
          if (['customNumber', 'commodityNumber'].includes(col.property)) {
            sums[index] = values.reduce((sum, curr) => {
              const val = Number(curr)
              return sum + curr
            }, 0)
          } else if (['alterationPrice',].includes(col.property)) {
            values = data.map(item => Number(item[col.property] || 0) * (item.commodityNumber || 0));
            sums[index] = values.reduce((sum, curr) => {
              const val = Number(curr)
              return sum + curr
            }, 0)
          } else {
            sums[index] = values.reduce((sum, curr) => {
              const val = Number(curr)
              return sum + curr
            }, 0).toFixed(2)
          }

        }
        //获取应退金额
        if (col.property == 'alterationPrice') {
          this.data.shouldRefundAmount = sums[index]
        }
        //获取销售数量
        if (col.property == 'customNumber') {
          this.data.salesNumber = sums[index]
        }
        //获取退货数量
        if (col.property == 'commodityNumber') {
          this.data.totalRefundNumber = sums[index]
        }
      });
      return sums
    },
  },
}
</script>
<style scoped>
</style>
