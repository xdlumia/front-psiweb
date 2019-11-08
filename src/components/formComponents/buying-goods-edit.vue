/*
 * @Author: 赵伦
 * @Date: 2019-11-08 10:30:28
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-08 14:21:40
 * @Description: 采购模块用的商品信息 1
*/
<template>
  <div class="buying-goods-selector">
    <form-card title="商品信息">
      <div slot="title">
        <span>商品信息</span>
        <commodity-selector :codes="goods.map(item=>item.commodityCode)" @choose="choose" class="ml10" />
        <span class="fr">
          <span>
            <el-link :underline="false" @click="showInFull=true" type="primary">全屏显示</el-link>
          </span>
        </span>
      </div>
      <el-table :data="goods" :style="{height:showInFull?'calc(100% - 40px)':''}" ref="table" show-summary size="mini">
        <el-table-column :reserve-selection="true" label="商品编号" min-width="600" prop="title" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span class="d-text-blue">{{row.commodityCode}}</span>
            0
            <commodity-selector @choose="choose" v-model="row.commodityName" />
            <commodity-selector @choose="choose" code="code" v-model="row.commodityCode" />
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
        <el-table-column label="采购成本价" min-width="100" prop="costAmount" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{row.costAmount||'-'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="税率" min-width="60" prop="taxRate" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{row.taxRate ? row.taxRate + '%' : '-'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="含税总价" min-width="70" prop="preTaxAmount" show-overflow-tooltip>
          <template slot-scope="{row:{taxRate,costAmount,commodityNumber}}">
            <span>{{+Number((costAmount*(1+taxRate)*commodityNumber)||0).toFixed(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="总库存" min-width="60" prop="usableInventoryNum" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{row.usableInventoryNum||0}}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品数量" min-width="80" prop="commodityNumber" show-overflow-tooltip>
          <template slot-scope="{row}">
            <el-form-item :rules="[{type:'positiveNum'}]" size="mini">
              <el-input class="wfull" v-model="row.commodityNumber"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="备注" min-width="240" prop="note" show-overflow-tooltip>
          <template slot-scope="{row}">
            <el-form-item size="mini">
              <el-input class="wfull" v-model="row.note"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="60" show-overflow-tooltip>
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
    }
  },
  data() {
    return {
      showInFull: false,
      goods: []
    };
  },
  methods: {
    getSummaries() {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价';
          return;
        }
      });

      return sums;
    },
    choose(e) {
      this.goods = this.goods.concat(e.map(this.goodToBuyingInfo));
      console.log(e);
    },
    deleteChoose(i) {
      this.goods.splice(i, 1);
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
        commodityCode: 'goodsCode',
        commodityName: 'goodsName',
        commodityNumber: '',
        configName: 'configName',
        costAmount: 'inventoryPrice',
        discount: '',
        discountSprice: '',
        goodsPic: '',
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