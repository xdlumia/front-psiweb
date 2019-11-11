/*
 * @Author: 赵伦
 * @Date: 2019-11-08 10:30:28
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-11 14:28:00
 * @Description: 采购模块用的商品信息 1
*/
<template>
  <div class="buying-goods-selector">
    <form-card title="商品信息">
      <div slot="title">
        <span>商品信息</span>
        <commodity-selector
          :codes="this.data[fkey]?this.data[fkey].map(item=>item.commodityCode):[]"
          @choose="choose"
          class="ml10"
          v-if="!disabled"
        />
        <span class="fr">
          <span>
            <el-link :underline="false" @click="showInFull=true" type="primary">全屏显示</el-link>
          </span>
        </span>
      </div>
      <el-table
        :data="data[fkey]"
        :style="{height:showInFull?'calc(100% - 40px)':''}"
        :summary-method="getSummaries"
        ref="table"
        show-summary
        size="mini"
      >
        <el-table-column :reserve-selection="true" label="商品编号" min-width="140" prop="title" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span class="d-text-blue">{{row.commodityCode}}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品图片" min-width="100">
          <template slot-scope="{row}">
            <el-image :src="row.goodsPic" class="d-center" fit="fill" style="width: 100px; height: 40px">
              <span slot="error">暂无图片</span>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" min-width="100" prop="commodityName" show-overflow-tooltip></el-table-column>
        <el-table-column label="商品类别" min-width="80" prop="categoryCode" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{row.categoryCode | dictionary('PSI_SP_KIND')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品分类" min-width="80" prop="cityName" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.className }}</span>
          </template>
        </el-table-column>
        <el-table-column label="规格" min-width="80" prop="specOne" show-overflow-tooltip></el-table-column>
        <el-table-column label="待采购数量" min-width="100" prop="waitPurchaseNumber" show-overflow-tooltip v-if="!hide.includes('waitPurchaseNumber')">
          <template slot-scope="{row}">
            <span>{{row.waitPurchaseNumber||'0'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="采购成本价" min-width="100" prop="costAmount" show-overflow-tooltip v-if="!hide.includes('costAmount')">
          <template slot-scope="{row}">
            <span>{{row.costAmount||'-'}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="税率" min-width="60" prop="taxRate" show-overflow-tooltip v-if="!hide.includes('taxRate')">
          <template slot-scope="{row}">
            <span>{{row.taxRate ? row.taxRate + '%' : '-'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="含税总价"
          min-width="70"
          prop="preTaxAmount"
          show-overflow-tooltip
          v-if="!hide.includes('preTaxAmount')"
        >
          <template slot-scope="{row:{taxRate,costAmount,commodityNumber}}">
            <span>{{+Number((costAmount*(1+taxRate)*commodityNumber)||0).toFixed(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="总库存"
          min-width="60"
          prop="inventoryNumber"
          show-overflow-tooltip
          v-if="!hide.includes('inventoryNumber')"
        >
          <template slot-scope="{row}">
            <span>{{row.inventoryNumber||0}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="商品数量"
          min-width="80"
          prop="commodityNumber"
          show-overflow-tooltip
          v-if="!hide.includes('commodityNumber')"
        >
          <template slot-scope="{row,$index}">
            <el-form-item :prop="`${fkey}.${$index}.commodityNumber`" :rules="[{required:true},{type:'positiveNum'}]" size="mini">
              <el-input :disabled="disabled" class="wfull" v-model="row.commodityNumber"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="备注" min-width="240" prop="note" show-overflow-tooltip v-if="!hide.includes('note')">
          <template slot-scope="{row,$index}">
            <el-form-item :prop="`${fkey}.${$index}.note`" size="mini">
              <el-input :disabled="disabled" class="wfull" v-model="row.note"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" min-width="60" show-overflow-tooltip v-if="!disabled">
          <template slot-scope="{row,$index}">
            <i @click="deleteChoose($index)" class="el-icon-error d-pointer" style="font-size:20px;color:#F5222D"></i>
          </template>
        </el-table-column>
      </el-table>
    </form-card>
    <FullscreenElement :element="$refs.table" :visible.sync="showInFull" />
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    hide: {
      type: Array,
      default: () => []
    },
    fkey: {
      type: String,
      default: 'commodityList'
    },
    disabled: Boolean
  },
  data() {
    return {
      showInFull: false
    };
  },
  methods: {
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((col, index) => {
        if (['commodityNumber'].includes(col.property)) {
          let prop = col.property;
          sums[index] = +Number(
            data
              .map(item => Number(item[prop]) || 0)
              .reduce((sum, item) => sum + item, 0)
          ).toFixed(2);
        } else if (['preTaxAmount'].includes(col.property)) {
          sums[index] = +Number(
            data
              .map(
                item =>
                  +Number(
                    item.costAmount *
                      (1 + item.taxRate) *
                      item.commodityNumber || 0
                  ).toFixed(2)
              )
              .reduce((sum, item) => sum + item, 0)
          ).toFixed(2);
        } else if (index == 0) {
          sums[0] = '总计';
        } else sums[index] = '';
      });
      return sums;
    },
    choose(e) {
      this.data[this.fkey] = this.data[this.fkey] || [];
      this.data[this.fkey] = this.data[this.fkey].concat(
        e.map(this.goodToBuyingInfo)
      );
    },
    deleteChoose(i) {
      this.data[this.fkey].splice(i, 1);
    },
    goodToBuyingInfo(good) {
      let target = {
        alterationNumber: '',
        alterationPrice: '',
        apportionmentAmount: '',
        busCode: '',
        busType: '',
        categoryCode: 'categoryCode',
        className: 'className',
        commodityCode: 'commodityCode',
        commodityName: 'goodsName',
        commodityNumber: '',
        configName: 'configName',
        costAmount: 'inventoryPrice',
        discount: '',
        discountSprice: '',
        goodsPic: 'goodsPic',
        inventoryNumber: 'usableInventoryNum',
        isAssembly: '',
        isDirect: '',
        isTeardown: '',
        note: '',
        parentCommodityCode: '',
        pickingNumber: '',
        preTaxAmount: '',
        putawayType: '',
        recentDiscountSprice: '',
        reference: '',
        salesPrice: '',
        shipmentsNumber: '',
        snCode: '',
        specOne: 'specOne',
        taxPrice: '',
        taxRate: 'taxRate',
        taxTotalAmount: '',
        unit: ''
      };
      let nGood = {};
      Object.keys(target).map(key => {
        nGood[key] = target[key] ? good[target[key]] : '';
      });
      return nGood;
    }
  }
};
</script> 
<style lang="scss" scoped>
.buying-goods-selector {
  /deep/ {
    .el-form-item {
      margin-bottom: 0;
    }
    .el-input__suffix {
      display: none;
    }
  }
}
</style>