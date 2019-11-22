/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-22 16:26:03
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
      <el-button @click="showAddIncoming=true,addIncoming()" size="mini" type="primary">付款</el-button>
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
    <AddIncoming :incomeType="1" :visible.sync="showAddIncoming" code ref="addIncoming" v-if="showAddIncoming" />
  </sideDetail>
</template>
<script>
import Apply from './apply'; // 付款单
import AddIncoming from '@/views/finance/income/add'; // 新增流水
import VisibleMixin from '@/utils/visibleMixin';

export default {
  mixins: [VisibleMixin],
  components: {
    Apply,
    AddIncoming
  },
  props: {},
  data() {
    return {
      showApply: false,
      showAddIncoming: false,
      stateText: {
        '0': '审核中',
        '1': '待复核',
        '2': '已通过',
        '3': '已驳回',
        '4': '已完成',
        '5': '终止',
        '-1': '新建'
      },
      settleText: {
        0: '未结清',
        1: '部分结清',
        2: '已结清',
        3: '已关闭'
      },
      overText: {
        0: '未逾期',
        1: '已逾期'
      }
    };
  },
  computed: {
    status() {
      if (!this.detail) return [];
      else {
        return [
          { label: '账单状态', value: this.stateText[this.detail.state] },
          { label: '逾期状态', value: this.overText[this.detail.overSate||0] },
          { label: '总应付金额', value: this.detail.billTotalAmount },
          { label: '实付金额', value: this.detail.factAmount },
          { label: '付款方', value: this.detail.accountName }
        ];
      }
    }
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
    },
    addIncoming() {
      this.$nextTick(() => {
        Object.assign(this.$refs.addIncoming.form, {
          incomeAmount: this.detail.amount,
          accountDate: +new Date(),
          oppositeAccount: this.detail.accountName,
          accountPhone: this.detail.linkmanPhone
        });
        this.$refs.addIncoming.saveHandle = () => this.saveIncoming();
      });
    },
    async saveIncoming() {
      this.loading = true;
      try {
        await this.$refs.addIncoming.$refs.form.validate();
        await this.$api.seePsiFinanceService.paybillPay(
          Object.assign(
            {
              fbiiCode: this.detail.billCode
            },
            this.$refs.addIncoming.form
          )
        );
      } catch (error) {}
      this.loading = false;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>