/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-28 14:02:43 
 * @Description: 库房  销售单 详情组件 出库商品
 */
<template>
  <div>
    <form-card title='出库商品'>
      <div slot="title">
        <span>出库商品</span>
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
      <d-table
        api="seePsiSaleService.businesscommodityGetBusinessCommodityList"
        :params="{busCode:detailForm.salesSheetCode,busType:5}"
        ref="companyTable"
        class="college-main"
        style="min-height:250px"
        :tree-props="{children: 'id', hasChildren: 'id'}"
      >
        <el-table-column
          fixed
          prop="shipmentsNumber"
          min-width="100"
          label="发货数量"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          fixed
          prop="pickingNumber"
          min-width="100"
          label="拣货数量"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          fixed
          align="left"
          prop="taxTotalAmount"
          label="总组装数量"
          width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          fixed
          prop="snCode"
          label="机器号/SN码"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span
              @click="getTableVisible(scope.row)"
              class="d-text-blue"
            >{{scope.row.snCode}}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          prop="alterationNumber"
          min-width="100"
          label="出库数量"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          fixed
          prop="isTeardown"
          min-width="100"
          label="是否组装"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="goodsName"
          min-width="100"
          label="商品名称"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="inventoryNumber"
          min-width="100"
          label="可用库存"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="commodityCode"
          label="商品编号"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span class="d-text-blue">{{scope.row.commodityCode}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="categoryCode"
          min-width="100"
          label="商品类别"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span class="d-text-blue">{{scope.row.categoryCode|dictionary('PSI_SP_KIND')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="className"
          min-width="100"
          label="商品分类"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="specOne"
          min-width="140"
          label="商品规格"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="configName"
          min-width="100"
          label="商品配置"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="unit"
          min-width="80"
          label="单位"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span class="d-text-blue">{{scope.row.unit|dictionary('SC_JLDW')}}</span>
          </template>
        </el-table-column>

      </d-table>
      <FullscreenElement
        :element="$refs.companyTable"
        :visible.sync="showInFullscreen"
      />
      <el-dialog
        title="机器号/SN码记录"
        :visible.sync="dialogVisible"
        width="600"
        v-dialogDrag
      >
        <commodityPicking :data='rowData' />
        <machineSn :data='rowData' />
      </el-dialog>
    </form-card>
  </div>
</template>
<script>
import commodityPicking from '@/components/formComponents/commodity-picking'
import FullscreenElement from '@/components/fullscreen-element';
import machineSn from '@/components/formComponents/machine-sn'
export default {
  props: ['detailForm'],
  data() {
    return {
      rowData: {},
      dialogVisible: false,
      showInFullscreen: false
    }
  },
  methods: {
    //点击机器号和SN码
    getTableVisible(row) {
      this.dialogVisible = true
      this.rowData = row
      console.log(this.rowData, 'this.rowDatathis.rowDatathis.rowDatathis.rowData')
    },
    fullscreen() {
      this.showInFullscreen = true;
    }
  },
  components: {
    commodityPicking,
    machineSn,
    FullscreenElement
  },
}
</script>
<style scoped>
</style>
