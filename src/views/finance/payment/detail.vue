/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-21 17:24:43
 * @Description: 付款单
*/
<template>
  <sideDetail :status="status" :visible="showDetailPage" @close="close" title="付款单" v-loading="loading" width="990px">
    <template slot="button">
      <el-button @click="showApply=true" size="mini" type="primary">付款申请</el-button>
      <el-button
        @click="$submission('seePsiFinanceService.paybillPassApproval',{
          apprpvalNode:detail.apprpvalNode,
          id:detail.id,
          processType: 'psi_finance_pay_bill_01'
        },'通过')"
        size="mini"
        type="primary"
      >通过</el-button>
      <el-button
        @click="$submission('seePsiFinanceService.paybillReject',{
          apprpvalNode:detail.apprpvalNode,
          id:detail.id,
          processType: 'psi_finance_pay_bill_01'
        },'驳回',true)"
        size="mini"
        type="danger"
      >驳回</el-button>
      <el-button
        @click="$submission('seePsiFinanceService.paybillAuditApproval',{
          apprpvalNode:detail.apprpvalNode,
          id:detail.id,
          processType: 'psi_finance_pay_bill_01'
        },'复核通过')"
        size="mini"
        type="primary"
      >复核通过</el-button>
      <el-button size="mini" type="primary">付款</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view">
      <el-tab-pane label="详情">
        <el-form size="mini" v-if="detail&&showDetailPage">
          <!-- <approve-panel></approve-panel> -->
          <paybill-detail :data="detail" :hide="['billType','lateFeeAmount']" disabled />
          <payer-info :data="detail" disabled />
          <extras-info :data="detail" @change="saveExtras" can-modify disabled />
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="采购单">采购单</el-tab-pane>
      <el-tab-pane label="换货单">换货单</el-tab-pane>
      <el-tab-pane label="费用单">费用单</el-tab-pane>
      <el-tab-pane label="销售退货单">销售退货单</el-tab-pane>
      <el-tab-pane label="采购入库单">采购入库单</el-tab-pane>
    </el-tabs>
    <Apply :rowData="detail" :visible.sync="showApply" @reload="setEdit(),$reload()" v-if="showApply" />
  </sideDetail>
</template>
<script>
import Apply from './apply'; // 付款单
import VisibleMixin from '@/utils/visibleMixin';

export default {
  mixins: [VisibleMixin],
  components: {
    Apply
  },
  props: {},
  data() {
    return {
      showApply: false
    };
  },
  mounted() {},
  watch: {},
  methods: {
    async getDetail() {
      if (this.code) {
        let {
          data
        } = await this.$api.seePsiFinanceService.paybillGetInfoByCode({
          code: this.code
        });
        return data;
      } else if (this.rowData) {
        return this.rowData;
      }
    },
    async saveExtras({ attachList, note }) {
      this.loading = true;
      try {
        await this.$api.seePsiFinanceService.paybillUpdate({
          id: this.detail.id,
          billCode: this.detail.billCode,
          attachList,
          note
        });
        this.setEdit();
      } catch (error) {}
      this.loading = false;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>