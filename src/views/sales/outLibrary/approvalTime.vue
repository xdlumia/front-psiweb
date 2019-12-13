/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-13 17:25:32
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
      <div class="dialog">
        <tableView
          :customHeaders="customHeaders"
          :filter="false"
          :exportButton="false"
          api="seePsiSaleService.salesshipmentListByShipmentCode"
          :params="{shipmentCode :rowData.shipmentCode }"
          ref="tableView"
          :column="false"
          title="采购入库单"
        >
          <template slot-scope="{column,row,value,prop}">
            <span v-if="prop=='putinCode'">
              <el-link
                :underline="false"
                @click="currentVisible = true, currentCode=value"
                class="f12"
                type="primary"
              >{{value}}</el-link>
            </span>
            <span v-else-if="prop=='quotationCode'">
              <el-link
                :underline="false"
                @click="quotationVisible=true, quotationCode = value"
                class="f12"
                type="primary"
              >{{value}}</el-link>
            </span>
            <span
              v-else-if="prop=='purchaseTime'"
              :class="row.purchaseTime && row.purchaseTime>row.saleTime?'d-text-red':''"
            >
              {{value}}
            </span>
            <!-- 销售库用到这个页面但是接口没有返回状态 -->
            <span v-else-if="prop=='state'">
              {{stateText[row.state]}}
            </span>
            <span v-else>{{value}}</span>
          </template>
        </tableView>
      </div>
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
      <Detail
        :code="currentCode"
        :visible.sync="currentVisible"
        v-if="currentVisible"
      />
      <!-- 销售报价单详情侧边弹出框 -->
      <quote-details
        v-if="quotationVisible"
        :visible.sync="quotationVisible"
        :code="quotationCode"
      ></quote-details>
    </el-dialog>
  </div>
</template>
<script>

import VisibleMixin from '@/utils/visibleMixin';
import Detail from '@/views/order/storage/detail';
import quoteDetails from '@/views/sales/quote/quote-details.vue';

export default {
  mixins: [VisibleMixin],
  components: {
    Detail,
    quoteDetails
  },
  data() {
    return {
      stateText: {
        '0': '新建',
        '1': '审核中',
        '2': '销售确认',
        '3': '已通过',
        '4': '已完成',
        '5': '已驳回',
        '6': '已终止'
      },
      currentCode: '',
      currentVisible: false,
      quotationCode: '',
      quotationVisible: false,
      // TODO销售要求到货时间 采购预计到货时间 报价单编号字段没有对应
      customHeaders: [
        { columnName: "采购入库单编号", columnFields: "putinCode", },
        { columnName: "报价单编号", columnFields: "quotationCode", },
        { columnName: "单据状态", columnFields: "state", },
        { columnName: "销售要求到货时间", columnFields: "saleTime", },
        { columnName: "采购预计到货时间", columnFields: "purchaseTime", },
        { columnName: "单据创建人", columnFields: "creatorName", },
        { columnName: "创建部门", columnFields: "deptName", },
        { columnName: "创建时间", columnFields: "createTime", },
      ]
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
    async passApproval() {
      let params = {
        id: this.rowData.id,
        processType: 'psi_sales_outlibrary_01',
        apprpvalNode: 'psi_sales_outlibrary_12'
      }
      await this.$submission('seePsiSaleService.salesshipmentPurchaseTimeApproval', params, '采购入库审核')
      this.$emit('reload')
      this.close()
    },
    // 不同意并终止
    async pause() {
      let params = {
        id: this.rowData.id,
        processType: 'psi_sales_outlibrary_01',
        apprpvalNode: 'psi_sales_outlibrary_12'
      }
      await this.$submission('seePsiSaleService.salesshipmentReject', params, '不同意')
      this.$emit('reload')
      this.close()
    },
  }
}
</script>
<style lang="scss" scoped>
</style>
