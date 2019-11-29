/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: 徐贺
 * @Last Modified time: 2019-10-28 14:02:43
 * @Description: 组装商品 
 */
<template>
  <div>
    <form-card title='组装商品'>
      <div slot="title">
        <span>组装商品</span>
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
        :data="data.commodityList"
        border
        size="mini"
        ref="table"
        class="college-main"
        style="max-height:340px"
        row-key="commodityCode"
        :tree-props="{children: 'childrenCommodityList'}"
      >
        <el-table-column
          fixed
          min-width="50"
        ></el-table-column>
        <el-table-column
          v-if="(data.assembleTaskState == 1 || data.assembleTaskState == 2) && data.isHang==0"
          fixed
          prop="title"
          label="操作"
          min-width="120"
          show-overflow-tooltip
        >
          <template
            slot-scope="scope"
            v-if="scope.row.childrenCommodityList"
          >
            <!-- :disabled='scope.row.currAccomplishNum > 0 ? false : true' -->
            <el-button
              type="primary"
              size="mini"
              @click='changeAssemblyVisible(scope.row)'
            >组装</el-button>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          prop="cityName"
          min-width="100"
          label="组装数量"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.accomplishNum || 0}}/{{scope.row.allocationNum || 0}}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          prop="usableNum"
          min-width="100"
          label="可用数量"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.usableNum || '-'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          prop="accomplishNum"
          min-width="100"
          label="机器号/SN码"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span
              class="d-text-blue"
              @click="changeRecord(scope)"
            >{{scope.row.accomplishNum}}</span>
          </template>
        </el-table-column>

        <el-table-column
          fixed
          prop="goodsName"
          min-width="100"
          label="商品名称"
          show-overflow-tooltip
        ></el-table-column>

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
          min-width="80"
          label="备注"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.note}}</span>
          </template>
        </el-table-column>

      </el-table>
    </form-card>
    <commodityAssemblyEdit
      :visible.sync='assemblyVisible'
      v-if="assemblyVisible"
      :data="rowData"
      :detailForm="data"
      @reload='reload'
    />
    <assemblyRecord
      :data='dialogData'
      :drawerData='drawerData'
      :visible.sync='dialogVisible'
      v-if="dialogVisible"
    />
    <FullscreenElement
      :element="$refs.table"
      :visible.sync="showInFullscreen"
    />
    <CommodityDetail
      :code="currentCommodityCode"
      :visible.sync="showCommodityDetail"
      v-if="showCommodityDetail"
    />
  </div>
</template>
<script>
import commodityAssemblyEdit from './commodity-assembly-edit'
import CommodityDetail from '@/views/basicSetting/commodityLibrary/detail.vue';
import FullscreenElement from '@/components/fullscreen-element';
import assemblyRecord from './assembly-record'
export default {
  props: ['data', 'drawerData'],
  data() {
    return {
      dialogVisible: false,
      dialogData: {},
      rowData: {},
      assemblyVisible: false,//组装弹窗
      showInFullscreen: false,
      showCommodityDetail: false,
      currentCommodityCode: '',
      tableData: [{ cityName: '假的' }]
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
    //点击SN码
    changeRecord(scope) {
      this.dialogVisible = true;
      this.dialogData = scope.row
    },
    //点击组装
    changeAssemblyVisible(row) {
      this.rowData = row
      this.assemblyVisible = true
    },
    reload() {
      this.$emit('reload')
    }
  },
  components: {
    commodityAssemblyEdit,
    assemblyRecord,
    FullscreenElement,
    CommodityDetail
  },
}
</script>
<style scoped>
</style>
