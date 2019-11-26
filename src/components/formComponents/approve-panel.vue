/*
 * @Author: 赵伦
 * @Date: 2019-10-28 10:05:00
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-26 10:12:37
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
    <div class="progress-list" v-if="!showHis">
      <ApproveCard :progress="progressData" />
    </div>
    <div
      class="progress-list"
      v-else
    >
      <ApproveCard />
      <ApproveCard />
    </div>
  </form-card>
</template>
<script>
import ApproveCard from './approve-card';

let busType = {
  '15': 'BJD-001',//销售报价单
  '16': 'XSCKD-001', //销售出库单
  '50': 'FKD-001',//付款单
  '17': 'XSTHD-001',//销售退货单
  '18': 'XSHHD-001',//销售换货单
  '19': 'FT-001',//分摊单
  '39': 'psi_adjustPrice_1003 ',//销售调价单
  '29': 'psi_purchase_stock',//备货单
  '40': 'psi_purchase_adjust_pric_01',//采购调价单
  '31': 'psi_purchase_alteration_01',//待审批采购退货单
  '30': 'psi_purchase_putin_01',//待审批采购入库单
  '56': 'TTZD-001',//账单调整单
  '9998': 'psi_purchase_stock_01',//换货单
}
export default {
  props: {
    apprpvalNode: [Number, String],
    // 业务类型
    busType: {
      required: false,
      default: 'BJD-001'
    },
    id:[Number,String]

  },
  components: {
    ApproveCard
  },
  data() {
    return {
      showHis: false, //是否查看历史状态
      progressData: [
        {
          taskName: '',//任务节点名称
          taskCode: '',// 任务节点码
          taskStatus: '',// 任务节状态
          approvalName: '', //审核人 add
          createTime: '', //审核时间 add
          type: '',// 任务类型
        }
      ], //当前流程节点
      hisData: [],// 历史审核数据
    };
  },
  async mounted() {
    await this.queryProcessDefinitionSubTask()
    this.processtaskQueryProcessHistoryEntity()
  },
  methods: {
    // 查询当前项共有多少节点
    queryProcessDefinitionSubTask() {
      let params = {
        typeArray: [busType[this.busType]]
      }
      this.$api.seeWorkflowService.processdefinitionQueryProcessDefinitionSubTask(params)
        .then(res => {
          this.progressData = res.data || []
        })
    },
    // 查询历史操作
    processtaskQueryProcessHistoryEntity() {


      let params = {
        processType: busType[this.busType],
        businessId: this.id || this.$parent.rowData.id //一般详情都会传rowData 当前行操作数据 里面有id
      }
      this.$api.seeWorkflowService.processtaskQueryProcessHistoryEntity(params)
        .then(res => {
          console.log(res.data);
        })
    }

  },
};
</script>
<style lang="scss" scoped>
</style>