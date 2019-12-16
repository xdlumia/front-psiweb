/*
 * @Author: 赵伦
 * @Date: 2019-10-28 10:05:00
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-16 10:23:17
 * @Description: 审核信息
*/
<template>
  <form-card
    title="审核信息"
    :class="collapse?'approve-box':''"
  >
    <div
      v-if="collapse"
      slot="title"
      class="d-flex"
      style="align-items:center"
    >
      <div @click="collapseShow = !collapseShow">
        审核信息
        <i
          :class="{active:collapseShow}"
          class="collapse-arrow el-icon-arrow-right d-pointer"
        ></i>
      </div>
    </div>

    <transition name="el-zoom-in-top">
      <div
        v-if="collapseShow"
        class="progress-list d-auto-y"
        :style="collapse?'height:140px':''"
      >
        <ApproveCard :progress="progressData" />
      </div>
    </transition>
  </form-card>
</template>
<script>
import ApproveCard from './approve-card';

const busType = {
  '29': 'psi_purchase_stock', //	备货单	采购
  '40': 'psi_purchase_adjust_pric_01', //	采购调价单	采购
  '31': 'psi_purchase_reject_01', //	退货单	采购
  '30': 'psi_purchase_storage_01', //	入库单	采购
  '11': 'psi_purchase_unpack_01', //	拆卸单	采购
  '5': 'psi_purchase_borrow_01', //	借入借出单	采购
  '1': 'psi_wms_swap_01', //	换货单	采购
  '50': 'psi_payment', //	付款单	财务
  '62': 'psi_finance_fee', //	费用单	财务
  '59': 'psi_billing', //	待开票	财务
  '58': 'psi_receipt', //	待收票	财务
  '15': 'psi_sales_quote_01', //	报价单	销售
  '16': 'psi_sales_outlibrary_01', //	销售出库单	销售
  '17': 'psi_sales_return_01', //	销售退货单	销售
  '18': 'psi_sales_exchange_01', //	销售换货单	销售
  '19': 'psi_sales_apportion_01', //	分摊单	销售
  '39': 'psi_adjustPrice_1003', //	销售调价单	销售
  '56': 'psi_sales_adjust_01', //	账单调整单	销售
}
export default {
  props: {
    // 业务类型
    collapse: {
      type: Boolean,
      default: false
    },
    busType: {
      required: false
    },
    id: [Number, String]
  },
  components: {
    ApproveCard
  },
  data() {
    return {
      collapseShow: true,
      progressData: [], // 当前流程节点
    };
  },
  mounted() {
    this.processtaskQueryProcessHistoryEntity()
  },
  computed: {
  },
  watch: {
    '$parent.data.state': {
      handler(val) {
        this.processtaskQueryProcessHistoryEntity()
      }
    }
  },
  methods: {
    // 查询历史操作
    processtaskQueryProcessHistoryEntity() {
      if (!this.busType) {
        this.$message({
          message: '当前审核信息没有传递busType参数',
          type: 'error',
          showClose: true,
        });

        return
      }
      const params = {
        processType: busType[this.busType],
        businessId: this.id || this.$parent.rowData.id || this.$parent.data.id// 一般详情都会传rowData 当前行操作数据 里面有id
      }
      if (this.id || this.$parent.rowData.id || this.$parent.data.id) {
        this.$api.seeWorkflowService.processtaskQueryProcessHistoryEntity(params)
          .then(res => {
            this.progressData = res.data || []
          })
      }
    }
  }
};
</script>
<style scoped lang="scss">
.approve-box {
  position: absolute;
  top: 40px;
  right: 0;
  left: 0;
  z-index: 9;
}
.collapse-arrow {
  transition: all 0.2s;
  &.active {
    transform: rotate(90deg);
  }
}
</style>
