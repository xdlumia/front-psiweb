/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: 徐贺 
 * @Last Modified time: 2019-10-28 14:02:43
 * @Description: 商品明细
 */
<template>
  <div>
    <form-card title='商品明细'>
      <div slot="title">
        <span>商品明细</span>
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
        api="seePsiWmsService.wmsflowrecordList"
        :params="{page:1,limit:20,commodityCode:drawerData.commodityCode,operation:0,isUsable:1}"
        ref="table"
        style="height: calc(100vh - 350px);"
      >
        <!-- <el-table-column
          min-width="120"
          label="操作"
          show-overflow-tooltip
        >
          <template slot-scope="">
            <el-button
              type="primary"
              size="mini"
            >解除锁定</el-button>
          </template>
        </el-table-column> -->
        <el-table-column
          type='index'
          min-width="50"
          label="编号"
          show-overflow-tooltip
        ></el-table-column>
        <!-- <el-table-column
          prop="categoryCode"
          min-width="100"
          label="锁定状态"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{scope.row.categoryCode|dictionary('PSI_SP_KIND')}}</template>
        </el-table-column>
        <el-table-column
          prop="commodityCode"
          min-width="150"
          label="锁定状态关联报价单"
          show-overflow-tooltip
        >
          <template slot-scope="scope"><span class="d-text-blue">{{scope.row.commodityCode}}</span></template>
        </el-table-column> -->
        <el-table-column
          prop="commodityCode"
          min-width="140"
          label="商品编号"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="categoryCode"
          min-width="100"
          label="商品类别"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{scope.row.categoryCode|dictionary('PSI_SP_KIND')}}</template>
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
          label="商品规格"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.specOne}}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="configName"
          min-width="100"
          label="配置"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="snCode"
          min-width="140"
          label="SN码"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="robotCode"
          min-width="140"
          label="机器号"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="wmsName"
          min-width="100"
          label="入库库房"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="operator"
          min-width="100"
          label="入库人"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="createTime"
          label="入库时间"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{scope.row.createTime | timeToStr('YYYY-MM-DD HH:mm:ss')}}</template>
        </el-table-column>
        <el-table-column
          prop="businessCode"
          min-width="140"
          label="关联业务编号"
          show-overflow-tooltip
        ></el-table-column>
      </d-table>
      <FullscreenElement
        :element="$refs.table"
        :visible.sync="showInFullscreen"
      />
    </form-card>
  </div>
</template>
<script>
import FullscreenElement from '@/components/fullscreen-element';
export default {
  props: ['drawerData'],
  data() {
    return {
      // 查询表单
      queryForm: {
        page: 1,
        limit: 20
      },
      showInFullscreen: false,
      dialogVisible: false,
    }
  },
  methods: {
    fullscreen() {
      this.showInFullscreen = true;
    },
  },
  components: {
    FullscreenElement
  },
}
</script>
<style scoped>
</style>
