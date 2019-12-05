/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-05 11:23:24
 * @Description: 审核采购时间
*/
<template>
  <div>
    <el-dialog
      :visible.sync="showEditPage"
      width="920px"
      title="采购入库单"
      @close="close"
      v-dialogDrag
      v-loading="loading"
    >
      <!-- 报价单信息 -->
      <order-storage
        class="dialog"
        :button="false"
        :filter="false"
        api="seePsiSaleService.salesshipmentListByShipmentCode"
        :params="{shipmentCode :rowData.shipmentCode }"
      />
      <div class="ac">
        <el-button
          type="primary"
          size="small"
          @click="passApproval"
        >同意所有时间</el-button>
        <el-button
          type="danger"
          size="small"
          @click="pause"
        >不同意并终止</el-button>
        <el-button
          size="small"
          @click="close"
        >取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

import VisibleMixin from '@/utils/visibleMixin';
export default {
  mixins: [VisibleMixin],
  components: {
  },
  data() {
    return {

    }
  },
  watch: {

  },
  created() {
  },
  mounted() {

  },
  computed: {

  },
  methods: {
    // 同意所有时间
    passApproval() {
      let params = {
        id: this.rowData.id,
        processType: 'psi_sales_outlibrary_01',
        apprpvalNode: 'psi_sales_outlibrary_12'
      }
      this.$submission('seePsiSaleService.salesshipmentPurchaseTimeApproval', params, '采购入库审核')
    },
    // 不同意并终止
    pause() {
      let params = {
        id: this.rowData.id,
        processType: 'psi_sales_outlibrary_01',
        apprpvalNode: 'psi_sales_outlibrary_12'
      }
      this.$submission('seePsiSaleService.salesshipmentReject', params, '不同意')
    },
  }
}
</script>
<style lang="scss" scoped>
</style>
