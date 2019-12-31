/*
 * @Author: 赵伦
 * @Date: 2019-11-22 11:35:40
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-31 15:03:17
 * @Description: 发票内容 商品列表 已绑定 1
*/
<template>
  <form-card
    :class="[(data.invoiceDetailList || []).filter(item=>item.type==0).length?'':'no-goods']"
    class="invoice-goods"
    title="发票内容"
  >
    <el-table
      :data="(data.invoiceDetailList || []).filter(item=>item.type==0)"
      :summary-method="getSum"
      show-summary
      size="mini"
    >
      <el-table-column
        label="商品编号"
        min-width="140"
        prop="commodityCode"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="商品名称"
        min-width="100"
        prop="articleName"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="商品数量"
        min-width="100"
        prop="quantity"
        show-overflow-tooltip
      >
        <template slot-scope="{$index,row}">
          <el-form-item
            :prop="`invoiceDetailList.${$index}.quantity`"
            :rules="[{required:true},{type:'positiveNum'}]"
            size="mini"
          >
            <el-input
              :disabled="disabled"
              class="wfull"
              v-model="row.quantity"
            ></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column
        label="商品无税单价"
        min-width="140"
        prop="price"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="商品税率"
        min-width="100"
        prop="taxRate"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="商品含税单价"
        min-width="140"
        prop="taxPrice"
        show-overflow-tooltip
      >
        <template slot-scope="{row}">
          <span>{{+Number(+row.price * (1+(row.taxRate/100))).toFixed(2)||0}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="商品无税总价"
        min-width="140"
        prop="beforeTaxAmount"
        show-overflow-tooltip
      >
        <template slot-scope="{row}">
          <span>{{calcBeforeTaxAmount(row)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="商品含税总价"
        min-width="140"
        prop="afterTaxAmount"
        show-overflow-tooltip
      >
        <template slot-scope="{row}">
          <span>{{calcAfterTaxAmount(row)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="是否与订单一致"
        min-width="140"
        prop="isOrder"
        show-overflow-tooltip
      >
        <template slot-scope="{row}">
          <span>{{row.isOrder==0?'否':'是'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        min-width="100"
        v-if="!disabled"
      >
        <template slot-scope="{row}">
          <i
            @click="deleteChoose(row)"
            class="el-icon-error d-pointer f20 d-text-qgray"
          ></i>
        </template>
      </el-table-column>
    </el-table>
  </form-card>
</template>
<script>
export default {
  props: {
    data: {
      default: () => {
        return {
          invoiceDetailList: [{ type: 0 }]
        };
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hide: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    calcBeforeTaxAmount(row) {
      return +Number(+row.price * Number(row.quantity)).toFixed(2) || 0;
    },
    calcAfterTaxAmount(row) {
      return (
        +Number(
          +row.price * (1 + row.taxRate / 100) * Number(row.quantity)
        ).toFixed(2) || 0
      );
    },
    getSum(param) {
      let { columns, data } = param;
      data = data || [];
      const sums = [];
      columns.forEach((col, index) => {
        if (['quantity'].includes(col.property)) {
          let prop = col.property;
          sums[index] = +Number(
            data
              .map(item => Number(item[prop]) || 0)
              .reduce((sum, item) => sum + item, 0)
          ).toFixed(2);
        } else if (['beforeTaxAmount'].includes(col.property)) {
          sums[index] = +Number(
            data
              .map(item => this.calcBeforeTaxAmount(item))
              .reduce((sum, item) => sum + item, 0)
          ).toFixed(2);
        } else if (['afterTaxAmount'].includes(col.property)) {
          sums[index] = +Number(
            data
              .map(item => this.calcAfterTaxAmount(item))
              .reduce((sum, item) => sum + item, 0)
          ).toFixed(2);
        } else if (index == 0) {
          sums[0] = '总计';
        } else sums[index] = '';
      });
      return sums;
    },

    deleteChoose(row) {
      let index = this.data.invoiceDetailList.indexOf(row);
      if (index >= 0) {
        this.data.invoiceDetailList.splice(index, 1);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.invoice-goods {
  /deep/ {
    .el-form-item {
      margin-bottom: 0;
      .el-form-item__error {
        position: relative;
      }
    }
    .el-input__suffix {
      display: none;
    }
  }
  &.no-goods {
    /deep/ {
      .el-card {
        display: none;
      }
    }
  }
}
</style>