/*
 * @Author: 赵伦
 * @Date: 2019-10-28 10:05:00
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-27 19:45:20
 * @Description: 审核信息
*/
<template>
  <form-card title="审核信息">
    <div class="h20">
      <el-link
        :underline="false"
        @click="showHis=!showHis"
        class="fr"
        type="primary"
      >{{showHis?'返回':'历史记录'}}</el-link>
    </div>
    <div
      class="progress-list"
      v-if="!showHis"
    >
      <ApproveCard :progress="progressData" />
    </div>
    <div
      class="progress-list"
      v-else
    >
      <ApproveCard
        v-for="(item,index) of this.hisData"
        :key="index"
        :currProgress="item"
        :progress="progressData"
      />
    </div>
  </form-card>
</template>
<script>
import ApproveCard from './approve-card';
import layoutVue from '../layout.vue';

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
      progressData: [
        {
          taskName: '', // 任务节点名称
          taskCode: '', // 任务节点码
          taskStatus: '', // 任务节状态
          approvalName: '', // 审核人 add
          createTime: '', // 审核时间 add
          type: '' // 任务类型
        }
      ], // 当前流程节点
      hisData: [] // 历史审核数据
    };
  },
  async mounted() {
    // 查询当前项共有多少节点
    await this.queryProcessDefinitionSubTask()
    await this.processtaskQueryProcessHistoryEntity()
  },
  methods: {
    // 查询当前项共有多少节点
    async queryProcessDefinitionSubTask() {
      const params = {
        typeArray: [busType[this.busType]]
      }
      const { data } = await this.$api.seeWorkflowService.processdefinitionQueryProcessDefinitionSubTask(params)
      this.progressData = data
    },
    // 查询历史操作
    async processtaskQueryProcessHistoryEntity() {
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
        businessId: this.id || this.$parent.rowData.id // 一般详情都会传rowData 当前行操作数据 里面有id
      }
      const { data } = await this.$api.seeWorkflowService.processtaskQueryProcessHistoryEntity(params)
      this.hisData = data || []
      // 历史记录的最后一个节点就是当前节点
      const lastHis = this.hisData[this.hisData.length - 1]

    }

  }
};
</script>
<style lang="scss" scoped>
</style>
