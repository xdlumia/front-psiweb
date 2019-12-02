/*
 * @Author: 赵伦
 * @Date: 2019-10-28 10:05:00
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-02 18:34:54
 * @Description: 审核信息
*/
<template>
  <form-card title="审核信息">
    <div class="progress-list">
      <ApproveCard :progress="progressData" />
    </div>
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
      showHis: false, // 是否查看历史状态
      progressData: [], // 当前流程节点
    };
  },
  async mounted() {
    // 查询当前项共有多少节点
    // await this.queryProcessDefinitionSubTask()
    // await this.processtaskQueryProcessHistoryEntity()
  },
  watch: {
    '$parent.data.id': {
      handler(val) {
        if (val) {
          this.processtaskQueryProcessHistoryEntity()
        }
      }
    }
  },
  methods: {
    // // 查询当前项共有多少节点
    // async queryProcessDefinitionSubTask() {
    //   const params = {
    //     typeArray: [busType[this.busType]]
    //   }
    //   const { data } = await this.$api.seeWorkflowService.processdefinitionQueryProcessDefinitionSubTask(params)
    //   this.progressData = data
    // },
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
<style lang="scss" scoped>
</style>
