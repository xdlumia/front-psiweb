<template>
  <!-- 扫描记录 -->
  <form-card
    title='扫描记录'
    class='wfull'
  >
    <el-table
      border
      size='mini'
      :data='[rowData]'
      ref="table"
      class="college-main mt15"
      style="max-height:300px"
    >
      <el-table-column
        fixed
        min-width="80"
        label="操作"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <i
            class="el-icon-delete-solid d-text-red"
            @click="delRecord(scope)"
          ></i>
        </template>
      </el-table-column>
      <el-table-column
        fixed
        prop="commodityCode"
        label="编号"
        min-width="160"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        fixed
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
        label="状态"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="goodsName"
        label="SN码"
        min-width="140"
        show-overflow-tooltip
      >
        <template slot-scope="scope">{{scope.row.createTime | timeToStr('YYYY-MM-DD HH:mm:ss')}}</template>
      </el-table-column>
      <el-table-column
        prop="configName"
        min-width="100"
        label="机器码"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="specOne"
        min-width="100"
        label="入库库房"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="unit"
        min-width="100"
        label="入库人"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span>{{scope.row.categoryCode|dictionary('SC_JLDW')}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="unit"
        min-width="100"
        label="入库时间"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span>{{scope.row.createdTime|timeToStr}}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed
        prop="commodityCode"
        label="商品编号"
        min-width="160"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span>{{scope.row.commodityCode}}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed
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
        label="商品名称"
        min-width="140"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="configName"
        min-width="100"
        label="配置"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="specOne"
        min-width="100"
        label="商品规格"
        show-overflow-tooltip
      ></el-table-column>
    </el-table>

  </form-card>
</template>
<script>

export default {
  components: {
  },
  props: {

    rowData: {
      type: Object,
    },
    form: {},
    drawerData: {}
  },
  computed: {
  },
  data() {
    return {
      activeName: '',
      usableList: [],
      tableData: [],
      snCode: '',
      wmsId: '',//库房id
    };
  },
  mounted() {

  },
  methods: {
    //回车机器号和SN码
    shipmentCommodityCheck() {
      if (this.wmsId) {
        if ((this.rowData.commodityNumber - (this.rowData.putinNumber || 0) - this.tableData.length) != 0) {
          this.$api.seePsiWmsService.wmsinventorydetailPutawayCommodityCheck({ snCode: this.snCode, commodityCode: this.rowData.commodityCode, putawayCommodityList: this.tableData, categoryCode: this.rowData.categoryCode, wmsId: this.wmsId })
            .then(res => {
              if (res.data) {
                this.tableData.push(res.data)
              }
            })
            .finally(() => {

            })
        } else {
          this.$message({
            type: 'error',
            message: '当前商品待入库数量已为0!'
          })
        }

      } else {
        this.$message({
          type: 'error',
          message: '请先选择入库库房!'
        })
      }
    },
    //删除某条
    delRecord(scope) {
      this.tableData.splice(scope.$index, 1)
    },
  }
};
</script>
<style lang="scss" scoped>
</style>