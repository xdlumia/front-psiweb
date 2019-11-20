/*
 * @Author: 赵伦
 * @Date: 2019-10-28 10:05:00
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-20 18:26:35
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
    <div v-if="!showHis">
      <ApproveCard :progress="progressData" />
    </div>
    <div
      class
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
  '销售报价单': { //销售报价单
    typeArray: '',
    processType: 'BJD-001',
  },
  '销售出库单': { //销售出库单
    typeArray: '',
    processType: 'XSCKD-001',
  },
  '付款单': { //付款单
    typeArray: '',
    processType: 'FKD-001',
  },
  '销售退货单': { //销售退货单
    typeArray: '',
    processType: 'XSTHD-001',
  },
  '销售换货单': { //销售换货单
    typeArray: '',
    processType: 'XSHHD-001',
  },
  '分摊单': { //分摊单
    typeArray: '',
    processType: 'FT-001',
  }
}
export default {
  props: {
    // 业务类型
    busType: {
      required: false
    },

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
          operatTime: '', //审核时间 add
          type: '',// 任务类型
        }
      ], //当前流程节点
      hisData: [],// 历史审核数据
    };
  },
  async created() {
    await this.queryProcessDefinitionSubTask()
    this.processtaskQueryProcessHistoryEntity()
  },
  methods: {
    // 查询当前项共有多少节点
    queryProcessDefinitionSubTask() {
      let params = {
        // typeArray: [type: '']
      }

      this.$api.seeWorkflowService.processdefinitionQueryProcessDefinitionSubTask(params)
        .then(res => {
          this.progressData = res.data || []
        })
    },
    // 查询历史操作
    processtaskQueryProcessHistoryEntity() {


      let params = {
        processType: this.processType || 'BJD-001',
        businessId: this.$parent.rowData.id //一般详情都会传rowData 当前行操作数据 里面有id
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