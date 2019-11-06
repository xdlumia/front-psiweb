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
          label="调拨数量"
          min-width="120"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.accomplishNum || '0'}}/{{scope.row.total}}</span>
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
              @click="dialogVisible = true"
              class="d-text-blue"
            >{{scope.row.total}}</span>
          </template>
        </el-table-column>

        <el-table-column
          fixed
          prop="shipmentWmsNames"
          min-width="100"
          label="调出库房"
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
        ></el-table-column>
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
        ></el-table-column>

      </el-table>
      <FullscreenElement
        :element="$refs.companyTable"
        :visible.sync="showInFullscreen"
      />
    </form-card>
    <outGoodsRecord :visible.sync='dialogVisible' />
  </div>
</template>

<script>
import outGoodsRecord from './out-goods-record'
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
      showInFullscreen: false
    }
  },
  methods: {
    fullscreen() {
      this.showInFullscreen = true;
    }
  },
  components: {
    outGoodsRecord,
    FullscreenElement
  },
}
</script>
<style scoped>
</style>
