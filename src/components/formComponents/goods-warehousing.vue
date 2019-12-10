  /*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: 徐贺
 * @Last Modified time: 2019-10-28 14:02:43
 * @Description: 入库商品
 */
<template>
  <div>
    <form-card title='入库商品'>
      <div slot="title">
        <span>入库商品</span>
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
        :data='data.commodityList'
        ref="companyTable"
        class="college-main"
        style="max-height:300px"
      >
        <el-table-column
          fixed
          prop="title"
          label="操作"
          min-width="120"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-button
              v-if="authorityButtons.includes('psi_wms_purchase_04')"
              :disabled='Number(scope.row.putinNumber) >= scope.row.commodityNumber'
              type="primary"
              size="mini"
              @click="changeWareVisible(scope)"
            >入库</el-button>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          min-width="100"
          label="入库数量"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{scope.row.putinNumber || 0}}/{{scope.row.commodityNumber}}</template>
        </el-table-column>
        <!-- <el-table-column
          fixed 
          prop="teardownNumber"
          min-width="100"
          label="拆卸数量"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{scope.row.teardownNumber}}/{{scope.row.commodityNumber}}</template>
        </el-table-column> -->
        <el-table-column
          label="机器号/SN码"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span
              class="d-text-blue"
              @click="changeWareDisabledVisible(scope)"
            >{{scope.row.putinNumber || 0}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="isTeardown"
          min-width="100"
          label="是否拆卸"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span class="">{{scope.row.isTeardown == 1 ? '是' : '-'}}</span>
          </template>
        </el-table-column>

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
            <span>{{scope.row.categoryCode|dictionary('SC_JLDW')}}</span>
          </template>
        </el-table-column>

      </el-table>
      <FullscreenElement
        :element="$refs.companyTable"
        :visible.sync="showInFullscreen"
      />
    </form-card>
    <purchaseWarehousing
      :visible.sync='wareVisible'
      :rowData='dialogData'
      :drawerData='drawerData'
      v-if="wareVisible"
      @reload='reload'
    />
    <purchaseWareDisabled
      :visible.sync='wareDisabledVisible'
      :dialogData='dialogData'
      :drawerData='drawerData'
      v-if="wareDisabledVisible"
    />
    <CommodityDetail
      :code="currentCommodityCode"
      :visible.sync="showCommodityDetail"
      v-if="showCommodityDetail"
    />
  </div>
</template> 
<script>
import FullscreenElement from '@/components/fullscreen-element';
import purchaseWarehousing from './purchase-warehousing'
import CommodityDetail from '@/views/basicSetting/commodityLibrary/detail.vue';
import purchaseWareDisabled from './purchase-ware-disabled'

export default {
  props: ['data', 'drawerData'],
  data() {
    return {
      dialogVisible: false,
      showInFullscreen: false,
      wareDisabledVisible: false,
      showCommodityDetail: false,
      currentCommodityCode: '',
      wareVisible: false,
      dialogData: {
      },
      row: {}
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
    //点击SN码一栏
    changeWareDisabledVisible(scope) {
      this.wareDisabledVisible = true
      this.dialogData = scope.row
    },
    //点击入库
    changeWareVisible(scope) {
      this.wareVisible = true
      this.dialogData = scope.row
    },
    reload() {
      this.$emit('reload')
    }
  },
  components: {
    purchaseWarehousing,
    FullscreenElement,
    purchaseWareDisabled,
    CommodityDetail
  },
}
</script>
<style scoped>
</style>
