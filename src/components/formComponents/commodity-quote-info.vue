/*
 * @Author: 王晓冬
 * @Date: 2019-10-28 17:05:01
 * @LastEditors: 赵伦
 * @LastEditTime: 2020-01-07 13:53:22
 * @Description: 新增销售报价单 商品信息 可查看
*/  
<template>
  <form-card
    class="commodity-quote-edit"
    title="商品信息"
    v-loading="loading"
  >
    <div class="mb10">
      <el-form-item
        prop="isTax"
        label="是否含税"
      >
        <el-select
          placeholder="请选择"
          v-model="data.isTax"
          disabled
        >
          <el-option
            :key="item.value"
            :label="item.label"
            :value="item.value"
            v-for="item in [
              {label:'含税',value:0},
              {label:'未税',value:1},
            ]"
          ></el-option>
        </el-select>
      </el-form-item>
    </div>
    <el-table
      show-summary
      sum-text='总计'
      border
      :summary-method="getSummaries"
      :data="data.commodityEntityList"
      lazy
      :load="loadChildren"
      :tree-props="{hasChildren:'configId'}"
      row-key="id"
      max-height="400"
      ref="elTable"
      size="mini"
    >
      <el-table-column
        show-overflow-tooltip
        prop="commodityCode"
        label="商品编号"
        min-width="150"
      >
        <template slot-scope="{row}">
          <span
            class="d-text-blue d-pointer"
            @click="showCommodityDetail=true,currentCommodityCode=row.commodityCode"
          >{{row.commodityCode | codeSlice}}</span>
        </template>
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
            fit="contain"
            class="d-center"
          >
            <span
              slot="error"
              class="d-text-qgray"
            >暂无图片</span>
          </el-image>
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
      >
        <template slot-scope="{row}">
          <span>{{(!data.isTax)?row.taxRate:0}}</span>
        </template>
      </el-table-column>

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
        <template slot-scope="{row}">
          <span v-if="!row.parentCommodityCode">{{row.discountSprice||0}}</span>
        </template>
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        label="是否直发"
        min-width="110"
      >
        <template
          slot-scope="scope"
          v-if="!scope.row.parentCommodityCode"
        >
          <el-switch
            disabled
            :active-value="1"
            :inactive-value="0"
            :value="scope.row.isDirect"
          ></el-switch>
        </template>
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        label="是否组装"
        min-width="110"
      >
        <template
          slot-scope="{row}"
          v-if="!row.parentCommodityCode&&row.categoryCode=='PSI_SP_KIND-1'&&(row.configId||row.configName||row.isMachine)"
        >
          <el-switch
            :active-value="1"
            :inactive-value="0"
            disabled
            :value="row.isAssembly"
          ></el-switch>
        </template>
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        label="备注"
        min-width="110"
        prop="note"
      >
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        label="库存数量"
        prop="inventoryNumber"
        min-width="110"
      >
        <template slot-scope="{row}">
          <span>{{row.inventoryNumber||row.usableInventoryNum||0}}</span>
        </template>
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        label="最近销售价"
        prop="recentDiscountSprice"
        min-width="110"
      >
        <template slot-scope="{row}">
          <span>{{row.recentDiscountSprice}}</span>
        </template>
      </el-table-column>
    </el-table>
    <CommodityDetail
      :code="currentCommodityCode"
      :visible.sync="showCommodityDetail"
      v-if="showCommodityDetail"
    />
  </form-card>
</template>
<script>
import CommodityDetail from '@/views/basicSetting/commodityLibrary/detail.vue';

export default {
  props: ['data'],
  components: {
    CommodityDetail
  },
  data() {
    return {
      loading: false,
      goodsData: [],
      queryForm: {
        busType: 1, // 1报价单 2请购单]
        putawayType: 0,
        busCode: this.data.quotationCode
      },
      currentCommodityCode: '',
      showCommodityDetail: false
    };
  },
  created() {
    // this.businesscommodityGetBusinessCommodityList(this.data.quotationCode)
  },
  watch: {

  },
  methods: {
    async loadChildren(row, node, cb) {
      if (row.children) cb(row.children)
      let {
        data
      } = await this.$api.seePsiCommonService.commonquotationconfigdetailsListConfigByGoodName(
        {
          commodityCode: row.commodityCode
        }
      );
      if(data.length){
        let { data: childList } = await this.$api.seePsiSaleService.businesscommodityQueryGoodsList({
          commodityCodes: data.map(item => item.commodityCode),
        })
        let businessInfo = childList.reduce((data, item) => {
          data[item.commodityCode] = item;
          return data;
        }, {})

        data.map(child => {
          child.parentCommodityCode = row.commodityCode
          child.commodityNumber = child.commodityNum
          child.reference = child.saleReferencePrice
          child.discountSprice = '-'
          child.recentDiscountSprice = businessInfo[child.commodityCode] ? (businessInfo[child.commodityCode].recentDiscountSprice || 0) : 0
        })
      }
      cb(data);
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
        else if (['reference', 'commodityNumber', 'inventoryNumber',].includes(column.property)) {
          sums[index] = +Number(data.reduce((num, item) => {
            return num + +Number(item[column.property] || 0)
          }, 0)).toFixed(2) || 0;
        }
        else if (['discountSprice', 'recentDiscountSprice'].includes(column.property)) {
          sums[index] = +Number(data.reduce((num, item) => {
            return num + (+Number(item[column.property] || 0) * item.commodityNumber)
          }, 0)).toFixed(2) || 0;
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
