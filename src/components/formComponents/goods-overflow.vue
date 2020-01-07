/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: 徐贺
 * @Last Modified time: 2019-10-28 14:02:43
 * @Description: 报溢商品
 */
<template>
  <div>
    <form-card title='报溢商品'>
      <div slot="title">
        <span>{{drawerData.type == 1 ? '报溢商品' : '报损商品'}}</span>
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
        size='mini'
        border
        ref="table"
        :data='detailForm.commondityList'
        class="college-main"
        :load="load"
        row-key="commodityCode"
        lazy
        max-height='300px'
        :tree-props="{children: 'children', hasChildren: 'configId'}"
      >
        <el-table-column
          fixed
          min-width="50"
          prop="name"
        >
        </el-table-column>
        <el-table-column
          fixed
          prop="num"
          min-width="100"
          :label="detailForm.type == 1 ? '报溢数量' : '报损数量'"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          fixed
          prop="wmsName"
          min-width="100"
          :label="detailForm.type == 1 ? '入库库房' : '出库库房'"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          fixed
          prop="num"
          label="机器号/SN码"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span
              @click="getRowData(scope.row)"
              class="d-text-blue"
            >{{scope.row.num}}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          align="left"
          prop="inventoryPrice"
          label="成本金额"
          width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          fixed
          min-width="100"
          label="含税成本金额"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <!-- scope.row.inventoryPrice * 0.01 * scope.row.taxRate -->

            <span>{{scope.row.inventoryPrice + (scope.row.inventoryPrice*scope.row.taxRate*0.01)}}</span>
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
            >{{row.commodityCode | codeSlice}}</div>
          </template>
        </el-table-column>

        <el-table-column
          prop="goodsName"
          min-width="100"
          label="商品名称"
          show-overflow-tooltip
        ></el-table-column>
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
        >
        </el-table-column>

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
            <span>{{scope.row.unit|dictionary('SC_JLDW')}}</span>
          </template>
        </el-table-column>

      </el-table>
    </form-card>
    <overflowSn
      :visible.sync='dialogVisible'
      :data='detailForm'
      :form={commodityCode:rowData.commodityCode,businessCode:drawerData.reportingLossesCode,page:1,limit:20}
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
import overflowSn from './overflow-sn'
import CommodityDetail from '@/views/basicSetting/commodityLibrary/detail.vue';
import FullscreenElement from '@/components/fullscreen-element';
export default {
  props: ['detailForm', 'drawerData'],
  data() {
    return {
      // 查询表单
      queryForm: {
        title: '', // 标题
        city: '', // 城市
        pushTime: '',
        messageType: '',
        status: '',
        page: 1,
        limit: 20
      },
      showInFullscreen: false,
      rowData: {},
      dialogVisible: false,
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
    fullscreen() {
      this.showInFullscreen = true;
    },
    getRowData(row) {
      this.rowData = row
      this.dialogVisible = true
    },
    //表格查询数据懒加载
    load(tree, treeNode, resolve) {
      this.$api.seePsiCommonService.commonquotationconfigdetailsListConfigByGoodName({ page: 1, limit: 50, commodityCode: tree.commodityCode })
        .then(res => {
          let list = res.data || []
          resolve(list)
        })
        .finally(() => {
          treeNode.loading = false
        })
    },
  },
  components: {
    overflowSn,
    FullscreenElement,
    CommodityDetail
  },
}
</script>
<style scoped>
</style>
