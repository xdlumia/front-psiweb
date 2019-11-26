/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 徐贺
 * @LastEditTime: 2019-10-26 18:17:56
 * @Description: 库房分布
*/
<template>
  <el-dialog
    :visible.sync="visible"
    title="库房分布"
    @close='close'
    v-dialogDrag
  >
    <el-container
      style="padding:0;max-height:700px;"
      class="d-auto-y"
    >
      <el-main style="padding:0;max-height:700px;">

        <form-card title='商品信息'>
          <el-table
            border
            :data="[drawerData]"
            size="mini"
          >
            <el-table-column
              label="商品编号"
              min-width="140"
              prop="commodityCode"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="商品类别"
              min-width="100"
              prop="categoryCode"
              show-overflow-tooltip
            >
              <template slot-scope="scope">{{scope.row.categoryCode | dictionary('PSI_SP_KIND')}}</template>
            </el-table-column>
            <el-table-column
              label="商品分类"
              min-width="100"
              prop="className"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="商品名称"
              min-width="100"
              prop="goodsName"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="商品配置"
              min-width="100"
              prop="configName"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="商品规格"
              min-width="140"
              prop="specOne"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="单位"
              min-width="80"
              prop="unit"
              show-overflow-tooltip
            >
              <template slot-scope="scope">{{scope.row.unit | dictionary('SC_JLDW')}}</template>
            </el-table-column>
          </el-table>
        </form-card>

        <form-card title='库房分布'>
          <d-table
            :paging="false"
            style="height:300px"
            border
            api="seePsiWmsService.wmsinventoryQueryInventoryDistribution"
            :params="{commodityCode:drawerData.commodityCode}"
            size="mini"
          >
            <el-table-column
              type='index'
              label="编号"
              min-width="100"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="库房"
              min-width="120"
              prop="wmsName"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="可用库存"
              min-width="120"
              prop="usableInventoryNum"
              show-overflow-tooltip
            >
              <template slot-scope="scope">{{scope.row.usableInventoryNum || 0}}</template>
            </el-table-column>
            <el-table-column
              label="待出库数量"
              min-width="120"
              prop="waitPutawayNum"
              show-overflow-tooltip
            >
              <template slot-scope="scope">{{scope.row.waitPutawayNum || 0}}</template>
            </el-table-column>
            <el-table-column
              label="待入库数量"
              min-width="100"
              prop="waitShipmentNum"
              show-overflow-tooltip
            >
              <template slot-scope="scope">{{scope.row.waitShipmentNum || 0}}</template>
            </el-table-column>
            <el-table-column
              label="锁库量"
              min-width="140"
              prop="lockInventoryNum"
              show-overflow-tooltip
            >
              <template slot-scope="scope">{{scope.row.lockInventoryNum || 0}}</template>
            </el-table-column>
          </d-table>
        </form-card>
      </el-main>
    </el-container>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        @click="close"
        size="small"
      >关 闭</el-button>
      <el-button
        type="primary"
        @click="close"
        size="small"
      >保 存</el-button>
    </span>
  </el-dialog>
</template>
<script>

export default {
  components: {
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    drawerData: {}
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  data() {
    return {
      activeName: '',
      tableData: [{ name: '写的假的' }]
    };
  },
  mounted() { },
  methods: {
    handleClick({ label, name }) {
      this.activeName = '';
    },
    close() {
      this.$emit('update:visible', false)
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>