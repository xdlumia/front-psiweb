/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-28 11:25:09
 * @Description: 库房  销售单 详情组件 出库商品弹出框 商品拣货
 */
<template>
  <div>
    <form-card :title="data.isAssembly == 1 ? '商品组装' : '商品拣货'">
      <el-table
        border
        size='mini'
        :data="[data]"
        ref="companyTable"
        class="college-main"
      >
        <el-table-column
          v-if="data.isAssembly == 1"
          fixed
          align="left"
          prop="taxTotalAmount"
          label="总组装数量"
          width="100"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.accomplishNum===null ? '-' : scope.row.accomplishNum }}/{{scope.row.allocationNum===null ? '-' : scope.row.allocationNum }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="data.isAssembly == 0"
          fixed
          prop="pickingNum"
          min-width="100"
          label="拣货数量"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          fixed
          prop="commodityCode"
          label="商品编号"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            <div
              @click="openCommodityDetail(row.commodityCode)"
              class="d-text-blue d-elip d-pointer"
            >{{row.commodityCode}}</div>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          prop="categoryCode"
          min-width="100"
          label="商品类别"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.categoryCode|dictionary('PSI_SP_KIND')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          prop="className"
          min-width="100"
          label="商品分类"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="goodsName"
          min-width="100"
          label="商品名称"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="configName"
          min-width="100"
          label="商品配置"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="specOne"
          label="商品规格"
          min-width="140"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="unit"
          min-width="80"
          label="单位"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.unit|dictionary('SC_JLDW')}}</span>
          </template>
        </el-table-column>
      </el-table>
    </form-card>
    <CommodityDetail
      :code="currentCommodityCode"
      :visible.sync="showCommodityDetail"
      v-if="showCommodityDetail"
    />
  </div>
</template>
<script>
import CommodityDetail from '@/views/basicSetting/commodityLibrary/detail.vue';
export default {
  props: ['data'],
  data() {
    return {
      showCommodityDetail: false,
      currentCommodityCode: '',
    }
  },
  methods: {
    // 打开商品详情
    openCommodityDetail(code) {
      this.showCommodityDetail = true;
      this.currentCommodityCode = code;
    },
  },
  components: {
    CommodityDetail
  },
}
</script>
<style scoped>
</style>
