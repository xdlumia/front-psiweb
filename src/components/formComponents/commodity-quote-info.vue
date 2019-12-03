/*
 * @Author: 王晓冬
 * @Date: 2019-10-28 17:05:01
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-03 11:27:41
 * @Description: 新增销售报价单 商品信息 可查看
*/  
<template>
  <form-card
    class="commodity-quote-edit"
    title="商品信息"
    v-loading="loading"
  >
    <el-table
      show-summary
      sum-text='总计'
      border
      :summary-method="getSummaries"
      :data="goodsData"
      default-expand-all
      :tree-props="{children: 'commonGoodConfigDetailsEntityList'}"
      max-height="400"
      ref="elTable"
      row-key="id"
      size="mini"
    >
      <el-table-column
        show-overflow-tooltip
        prop="commodityCode"
        label="商品编号"
        min-width="150"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="goodsName"
        label="商品名称"
        min-width="150"
      >
      </el-table-column>
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
        show-overflow-tooltip
        label="商品类别"
        min-width="110"
        prop="categoryCode"
      >
        <template slot-scope="scope">
          {{scope.row.categoryCode | dictionary('PSI_SP_KIND')}}
        </template>
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        label="商品分类"
        min-width="110"
        prop="className"
      ></el-table-column>

      <el-table-column
        show-overflow-tooltip
        label="配置"
        min-width="110"
        prop="configName"
      ></el-table-column>

      <el-table-column
        show-overflow-tooltip
        label="规格"
        min-width="110"
        prop="specOne"
      ></el-table-column>

      <el-table-column
        show-overflow-tooltip
        label="销售参考价"
        min-width="110"
        prop="reference"
      ></el-table-column>

      <el-table-column
        show-overflow-tooltip
        label="商品数量"
        prop="commodityNumber"
        min-width="110"
      >
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        label="税率%"
        min-width="100"
        prop="taxRate"
      ></el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="discount"
        label="折扣"
        min-width="110"
      >
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        label="折后销售单价"
        prop="discountSprice"
        min-width="110"
      >
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        label="备注"
        min-width="110"
      >
      </el-table-column>
    </el-table>
  </form-card>
</template>
<script>

export default {
  props: ['data'],
  data() {
    return {
      loading: false,
      goodsData: [],
      queryForm: {
        busType: 1, // 1报价单 2请购单]
        putawayType: 0,
        busCode: this.data.quotationCode
      },
    };
  },
  created() {
    // this.businesscommodityGetBusinessCommodityList(this.data.quotationCode)
  },
  watch: {
    'data.quotationCode': {
      handler(val) {
        if (val) {
          this.businesscommodityGetBusinessCommodityList(this.data.quotationCode)
        }
      }
    }
  },
  methods: {
    businesscommodityGetBusinessCommodityList(quotationCode) {
      this.queryForm.busCode = quotationCode || this.data.quotationCode
      this.loading = true
      this.$api.seePsiSaleService.businesscommodityGetBusinessCommodityList(this.queryForm)
        .then(res => {
          let data = res.data || []
          this.goodsData = this.$$util.formatCommodity(data, 'commonGoodConfigDetailsEntityList')
        })
        .finally(() => {
          this.loading = false
        })
    },
    //算合计的
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计';
          return;
        }
        if (column.property == 'inventoryPrice') {
          const values = data.map((item) => {
            if (item.commodityInfoList && item.commodityInfoList.length > 0) {
              return Number(item.inventoryPrice) * Number(item.commodityInfoList.length)
            }
          });
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        }
      })
      return sums;
    },

  }
};
</script>
<style lang="scss" scoped>
.commodity-quote-edit {
  .el-form-item--mini.el-form-item {
    margin-bottom: 0;
  }
}
.expanded-icons {
  > span {
    display: inline-block;
    width: 16px;
    height: 16px;
    line-height: 16px;
    border: 1px solid #999;
    text-align: center;
  }
}

/deep/.el-table_2_column_13 {
  padding: 0px;
  padding-top: 5px;
}
/deep/.el-input__suffix {
  display: none !important;
}
</style>
