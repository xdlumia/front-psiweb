<template>
  <div class v-loading="loading">
    <form-card title="配置信息">
      <el-table :data="tableData" size="mini">
        <el-table-column label="商品编号" prop="commodityCode">
          <template slot-scope="scope">
            <span
              type="text"
              style="padding:0"
              class="d-text-blue d-pointer"
              @click="show(scope.row)"
            >{{scope.row.commodityCode}}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="goodsName"></el-table-column>
        <el-table-column label="商品分类" prop="className"></el-table-column>
        <el-table-column label="商品数量" prop="commodityNum"></el-table-column>
      </el-table>
    </form-card>
    <goodsDetail v-if="showDetail" :visible.sync="showDetail" :rowData="rowData" :code="code" :button="false"></goodsDetail>
  </div>
</template>

<script type='text/ecmascript-6'>
import goodsDetail from '@/views/basicSetting/commodityLibrary/detail'
export default {
  props: {
    quotationId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      tableData: [],
      showDetail: false,
      rowData: {},
      code: null
    }
  },
  components: {
    goodsDetail
  },
  mounted() {
    if (this.quotationId) {
      this.commonquotationconfigdetailsListConfigByGoodName(this.quotationId)
    }
  },
  methods: {
    show(row) {
      this.rowData = row
      this.code = row.commodityCode
      this.showDetail = true
    },
    commonquotationconfigdetailsListConfigByGoodName(quotationId) {
      this.loading = true
      this.$api.seePsiCommonService.commonquotationconfigdetailsListConfigByGoodName({ quotationId }).then(res => {
        this.tableData = res.data || []
      }).finally(() => { this.loading = false })
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
