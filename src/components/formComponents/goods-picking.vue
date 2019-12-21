/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: 徐贺
 * @Last Modified time: 2019-10-28 14:02:43
 * @Description: 拣货商品
 */
<template>
  <div>
    <form-card title='拣货商品'>
      <div slot="title">
        <span>拣货商品</span>
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
        ref="table"
        class="college-main"
        max-height="300"
      >
        <el-table-column
          fixed
          prop="title"
          label="拣货数量"
          min-width="120"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.pickingAccomplishNum}}/{{scope.row.pickingNum}}</span>
          </template>
        </el-table-column>

        <el-table-column
          fixed
          prop="pickingAccomplishNum"
          min-width="100"
          label="机器号/SN码"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span
              @click="changeDialog(scope.row)"
              class="d-text-blue"
            >{{scope.row.pickingAccomplishNum}}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="usableNum"
          min-width="100"
          label="可用库存"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.usableNum || 0}}</span>
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
    </form-card>
    <pickingJsn
      :visible.sync='dialogVisible'
      :data='row'
      :drawerData='data'
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
import pickingJsn from './picking-jsn'
import CommodityDetail from '@/views/basicSetting/commodityLibrary/detail.vue';
import FullscreenElement from '@/components/fullscreen-element';
export default {
  props: ['data'],
  data() {
    return {
      dialogVisible: false,
      row: {},
      showCommodityDetail: false,
      currentCommodityCode: '',
      showInFullscreen: false
    }
  },
  methods: {
    // 打开商品详情
    openCommodityDetail(code) {
      this.showCommodityDetail = true;
      this.currentCommodityCode = code;
    },
    changeDialog(row) {
      this.row = row
      this.dialogVisible = true
    },
    fullscreen() {
      this.showInFullscreen = true;
    }
  },
  components: {
    pickingJsn,
    FullscreenElement,
    CommodityDetail
  },
}
</script>
<style scoped>
</style>
