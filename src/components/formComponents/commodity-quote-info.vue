/*
 * @Author: 王晓冬
 * @Date: 2019-10-28 17:05:01
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-18 16:11:27
 * @Description: 新增销售报价单 商品信息 可查看
*/  
<template>
  <form-card
    class="commodity-quote-edit"
    title="商品信息"
  >
    <d-table
      border
      style="max-height:250px"
      api="seePsiSaleService.businesscommodityGetBusinessCommodityList"
      :params="queryForm"
      size="mini"
      :paging="false"
    >
      <el-table-column
        label="商品编号"
        prop="commodityCode"
        min-width="150"
        show-overflow-tooltip
      />

      <el-table-column
        label="商品图片"
        min-width="120"
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
        label="商品名称"
        min-width="110"
        show-overflow-tooltip
      />

      <el-table-column
        label="商品类别"
        min-width="80"
        prop="categoryCode"
      >
        <template slot-scope="scope">
          {{scope.row.categoryCode | dictionary('PSI_SP_KIND')}}
        </template>
      </el-table-column>

      <el-table-column
        label="商品分类"
        min-width="110"
        prop="className"
      />

      <el-table-column
        label="规格"
        min-width="110"
        prop="specOne"
      />

      <el-table-column
        label="备注"
        prop="note"
        min-width="110"
      />

    </d-table>

  </form-card>
</template>
<script>

export default {
  props: ['data'],
  data() {
    return {
      queryForm: {
        busType: 1, // 1报价单 2请购单]
        putawayType: 1,
        busCode: this.data.quotationCode
      },
    };
  },
  methods: {


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
