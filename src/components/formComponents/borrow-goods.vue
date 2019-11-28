/*
 * @Author: 赵伦
 * @Date: 2019-10-28 17:05:01
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-28 15:36:20
 * @Description: 借入/借出商品
*/  
<template>
  <form-card class="borrow-goods" title="借入/借出商品">
    <div slot="title">
      <span>借入/借出商品</span>
      <span class="fr">
        <span>
          <el-link :underline="false" @click="fullscreen" type="primary">全屏显示</el-link>
        </span>
      </span>
    </div>
    <el-table :data="data.commodityList||[]" max-height="400" ref="elTable" row-key="name" size="mini">
      <el-table-column class-name="hide-children" fixed min-width="1" width="1"></el-table-column>
      <el-table-column fixed min-width="40">
        <template slot-scope="{row}">
          <div class="expanded-icons d-text-gray" v-if="row.children&&row.children.length">
            <span @click="expand(row)" class="el-icon-plus d-pointer" v-if="!row.expanded"></span>
            <span @click="expand(row)" class="el-icon-minus d-pointer" v-else></span>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed label="借入数量" min-width="70" prop="borrowLoanNum">
        <template slot-scope="{row}">
          <span>{{row.borrowLoanAccomplishNum}}/{{row.borrowLoanNum}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed label="借入库房" min-width="120" prop="borrowWmsName" show-overflow-tooltip></el-table-column>
      <el-table-column fixed label="机器号/SN码" min-width="100" prop="borrowLoanAccomplishNum" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span
            @click="visible=true,currentCode=row.commodityCode,operationType=0"
            class="d-text-blue d-pointer"
          >{{row.borrowLoanAccomplishNum}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed label="返还数量" min-width="70" prop="returnNum">
        <template slot-scope="{row}">
          <span>{{row.returnAccomplishNum}}/{{row.returnNum}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed label="返还库房" min-width="120" prop="returnWmsName" show-overflow-tooltip></el-table-column>
      <el-table-column fixed label="机器号/SN码" min-width="100" prop="returnAccomplishNum" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span
            @click="visible=true,currentCode=row.commodityCode,operationType=1"
            class="d-text-blue d-pointer"
          >{{row.returnAccomplishNum}}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品编号" min-width="130" prop="commodityCode">
        <template slot-scope="{row}">
          <div class="d-elip">
            <el-link :underline="false" class="f12" type="primary" @click="showCommodityDetail=true,currentCommodityCode=row.commodityCode">{{row.commodityCode}}</el-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" min-width="100" prop="goodsName" show-overflow-tooltip></el-table-column>
      <el-table-column label="商品图片" min-width="100" prop="title" show-overflow-tooltip>
        <template slot-scope="{row}">
          <el-image :src="row.goodsPic" class="d-center" fit="fill" style="width: 100px; height: 40px">
            <span slot="error">暂无图片</span>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="商品类别" min-width="80" prop="categoryCode" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{row.categoryCode | dictionary('PSI_SP_KIND')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品分类" min-width="100" prop="className" show-overflow-tooltip></el-table-column>
      <el-table-column label="配置" min-width="100" prop="configName" show-overflow-tooltip></el-table-column>
      <el-table-column label="商品规格" min-width="140" prop="specOne" show-overflow-tooltip></el-table-column>
      <el-table-column label="单位" min-width="80" prop="unit" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{row.unit | dictionary('SC_JLDW')}}</span>
        </template>
      </el-table-column>
    </el-table>
    <FullscreenElement :element="$refs.elTable" :visible.sync="showInFullscreen" />
    <commodityRecordBorrow
      :params="{
      commodityCode:currentCode,
      businessCode:data.borrowLoanCode,
      operation:operationType
    }"
      :visible.sync="visible"
      v-if="visible"
    />
    <CommodityDetail :code="currentCommodityCode" :visible.sync="showCommodityDetail" v-if="showCommodityDetail" />
  </form-card>
</template>
<script>
import FullscreenElement from '@/components/fullscreen-element';
import commodityRecordBorrow from './commodity-record-borrow';
import CommodityDetail from '@/views/basicSetting/commodityLibrary/detail.vue';

export default {
  components: {
    FullscreenElement,
    commodityRecordBorrow,
    CommodityDetail
  },
  props: {
    data: {
      default: () => {
        return {
          commodityList: []
        };
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hide: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentCode: '',
      currentCommodityCode: '',
      showInFullscreen: false,
      showCommodityDetail: false,
      operationType: 0,
      visible: false
    };
  },
  methods: {
    getData(data) {
      console.log(data);
    },
    expand(row) {
      this.$set(row, 'expanded', !row.expanded);
      this.$refs.elTable.toggleRowExpansion(row, row.expanded);
    },
    fullscreen() {
      this.showInFullscreen = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.borrow-goods {
  /deep/ {
    .el-form-item {
      margin-bottom: 0;
      .el-form-item__error {
        position: relative;
      }
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
}
</style>
