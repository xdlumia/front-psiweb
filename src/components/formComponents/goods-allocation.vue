/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18  
 * @Last Modified by: 徐贺
 * @Last Modified time: 2019-10-28 14:02:43
 * @Description: 调拨商品
 */
<template>
  <div>
    <form-card title='调拨商品'>
      <div slot="title">
        <span>调拨商品</span>
        <span class="fr">
          <span>
            <el-link
              :underline="false"
              @click="fullscreen"
              type="primary"
            >全屏显示</el-link>
          </span>
        </span>
      </div>
      <el-table
        border
        size='mini'
        :data="form.allocationCommodityList"
        class="college-main"
      >
        <el-table-column
          fixed
          prop="title"
          label="调入数量"
          min-width="120"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.inAccomplishNum || '0'}}/{{scope.row.num}}</span>
          </template>
        </el-table-column>

        <el-table-column
          fixed
          prop="total"
          min-width="100"
          label="机器号/SN码"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span
              @click="getOutGoodsRecord(scope,0)"
              class="d-text-blue"
            >{{scope.row.inAccomplishNum}}</span>
          </template>
        </el-table-column>

        <el-table-column
          fixed
          prop="title"
          label="调出数量"
          min-width="120"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.outAccomplishNum || '0'}}/{{scope.row.num}}</span>
          </template>
        </el-table-column>

        <el-table-column
          fixed
          prop="total"
          min-width="100"
          label="机器号/SN码"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span
              @click="getOutGoodsRecord(scope,1)"
              class="d-text-blue"
            >{{scope.row.outAccomplishNum}}</span>
          </template>
        </el-table-column>

        <!-- <el-table-column
          fixed
          prop="shipmentWmsNames"
          min-width="100"
          label="调出库房"
          show-overflow-tooltip
        ></el-table-column> -->

        <el-table-column
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
          min-width="140"
          label="商品规格"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="unit"
          min-width="80"
          label="单位"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.unit|dictionary('PSI_SP_KIND')}}</span>
          </template>
        </el-table-column>

      </el-table>
      <FullscreenElement
        :element="$refs.companyTable"
        :visible.sync="showInFullscreen"
      />
    </form-card>
    <outGoodsRecord
      :visible.sync='dialogVisible'
      :form='tpForm'
    />
    <CommodityDetail
      :code="currentCommodityCode"
      :visible.sync="showCommodityDetail"
      v-if="showCommodityDetail"
    />
  </div>
</template>

<script>
import outGoodsRecord from './out-goods-record'
import CommodityDetail from '@/views/basicSetting/commodityLibrary/detail.vue';
import FullscreenElement from '@/components/fullscreen-element';
export default {
  props: {
    form: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false,
      showInFullscreen: false,
      showCommodityDetail: false,
      currentCommodityCode: '',
      tpForm: {
        commodityCode: '',
        businessCode: '',
        page: 1,
        limit: 20
      }
    }
  },
  methods: {
    // 打开商品详情
    openCommodityDetail(code) {
      this.showCommodityDetail = true;
      this.currentCommodityCode = code;
    },
    fullscreen() {
      this.showInFullscreen = true;
    },
    //查看商品记录
    getOutGoodsRecord(scope, type) {
      this.dialogVisible = true
      this.tpForm.commodityCode = scope.row.commodityCode
      this.tpForm.businessCode = this.form.allocationOrderCode
      this.tpForm.page = 1
      this.tpForm.limit = 20
      this.tpForm.operation = type//参数，0入库 1 出库 
      this.tpForm.name = '调拨'//区分换货和调拨单
    }
  },
  components: {
    outGoodsRecord,
    FullscreenElement,
    CommodityDetail
  },
}
</script>
<style scoped>
</style>
