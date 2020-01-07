/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: 徐贺
 * @Last Modified time: 2019-10-28 14:02:43
 * @Description: 组装商品 组装单详情，没有组装按钮
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
        size="mini"
        border
        :data="data.commodityList"
        ref="companyTable"
        row-key="commodityCode"
        class="college-main"
        max-height="200"
        :tree-props="{children: 'childrenCommodityList'}"
      >
        <el-table-column
          fixed
          min-width="50"
        ></el-table-column>
        <el-table-column
          fixed
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
          prop="pickingAccomplishNum"
          min-width="100"
          label="拣货数量"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.pickingAccomplishNum || 0}}</span>
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
            <span>{{scope.row.usableNum || 0}}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          prop="accomplishNum"
          min-width="130"
          label="机器号/SN码"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span
              @click="changeRecord(scope)"
              class="d-text-blue"
            >{{scope.row.accomplishNum}}</span>
          </template>
        </el-table-column>

        <el-table-column
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
            >{{row.commodityCode | codeSlice}}</div>
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
          prop="note"
          min-width="120"
          label="备注"
          show-overflow-tooltip
        ></el-table-column>

      </el-table>
      <FullscreenElement
        :element="$refs.companyTable"
        :visible.sync="showInFullscreen"
      />
      <assemblyRecord
        :data='dialogData'
        :drawerData='drawerData'
        :visible.sync='dialogVisible'
        v-if="dialogVisible"
      />
      <CommodityDetail
        :code="currentCommodityCode"
        :visible.sync="showCommodityDetail"
        v-if="showCommodityDetail"
      />
    </form-card>
  </div>
</template>
<script>
import FullscreenElement from '@/components/fullscreen-element';
import assemblyRecord from './assembly-record'
import CommodityDetail from '@/views/basicSetting/commodityLibrary/detail.vue';
export default {
  props: ['data', 'drawerData'],
  data() {
    return {
      tableData: [{ cityName: 1 }],
      dialogVisible: false,
      dialogData: {},
      showCommodityDetail: false,
      currentCommodityCode: '',
      showInFullscreen: false
    }
  },
  methods: {
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
    }
  },
  components: {
    FullscreenElement,
    assemblyRecord,
    CommodityDetail
  },
}
</script>
<style scoped>
</style>
