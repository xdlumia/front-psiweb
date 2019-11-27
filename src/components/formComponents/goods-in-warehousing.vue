<template>
  <!-- 退入库商品 -->
  <form-card title='退入库商品'>
    <div
      v-for="(item,index) of goodsData"
      :key="index"
    >
      <el-table
        border
        size='mini'
        :data='[item]'
        ref="table"
        class="mt15"
        style="max-height:300px"
      >
        <el-table-column
          fixed
          min-width="70"
          label="入库数量"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <!-- 扫码数量 -->
            <span>{{scope.row.scanNumber || 0}}/{{scope.row.commodityNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          prop="commodityCode"
          label="商品编号"
          min-width="100"
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
            <span>{{scope.row.categoryCode | dictionary('PSI_SP_KIND')}}</span>
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
          label="商品配置"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="specOne"
          min-width="100"
          label="商品规格"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="unit"
          min-width="100"
          label="单位"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.unit|dictionary('SC_JLDW')}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt10 mb10">
        <span class="b mt5">机器号/SN码</span>
        <el-input
          :disabled="item.commodityNumber==0"
          @keyup.native.13="shipmentCommodityCheck(item)"
          size="mini"
          v-model="item.snCode"
          style="width:200px;"
          class="ml10 mt5"
        >
          <el-button
            slot="append"
            @click="shipmentCommodityCheck(item)"
          >确定</el-button>
        </el-input>
        <span class="fr d-text-black mr10 mt5">
          <span>本次成功扫码 </span>
          <span class="b d-text-red f16">{{item.scanNumber || 0}}</span>
          <span> 件，历史扫码 </span>
          <span class="b d-text-green f16">{{item.hisScanNumber||0}}</span>
          <span> 件，还需扫码 </span>
          <span class="b d-text-blue f16">{{item.commodityNumber||0}}</span>
          <span> 件</span>
        </span>
      </div>
    </div>
  </form-card>
</template>
<script>

export default {
  components: {
  },
  props: {
    rowData: Object,
    params: Object,
    data: {},
  },
  computed: {
  },
  data() {
    return {
      goodsData: [], //商品列表
      tableData: [],
    };
  },
  mounted() {
    this.businesscommodityGetBusinessCommodityList()
  },
  methods: {
    businesscommodityGetBusinessCommodityList() {
      this.$api.seePsiSaleService.businesscommodityGetBusinessCommodityList(this.params)
        .then(res => {
          let data = res.data || []
          // parentCommodityCode 只展示有父级商品code的产品
          this.goodsData = data.filter(item => !item.parentCommodityCode)
        })
    },
    //回车机器号和SN码
    shipmentCommodityCheck(item) {
      if (!this.data.wmsId) {
        this.$message({
          type: 'error',
          message: '请先选择入库库房!',
          showClose: true
        })
        return
      }
      let params = {
        snCode: item.snCode,
        commodityCode: item.commodityCode,
        putawayCommodityList: [],
        categoryCode: item.categoryCode,
        wmsId: this.data.wmsId
      }
      this.$api.seePsiWmsService.wmsinventorydetailPutawayCommodityCheck(params)
        .then(res => {
          let data = res.data || {}
          this.data.sacnData.push({ ...item, ...data })
          // 本次扫码次数
          item.scanNumber++
          // 历史扫码次数
          item.hisScanNumber++
          item.commodityNumber--
        })
    }
  }
};
</script>
<style lang="scss" scoped>
</style>