/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-14 20:08:03
 * @Description: 今日应付账单
*/
<template>
  <sideDetail
    :status="status"
    :title="`${pageConfig.title} ${detail?(detail.billCode||''):''}`"
    :visible="showDetailPage"
    @close="close"
    v-loading="loading"
    width="990px"
  >
    <template slot="button">
      <el-button
        @click="showLateAmount=true"
        size="mini"
        type="primary"
        v-if="detail&&detail.settleStatus!=2&&authorityButtons.includes(pageConfig.func.lateFee)"
      >滞纳金</el-button>
      <el-button @click="showLog=true" size="mini" type="primary" v-if="authorityButtons.includes(pageConfig.func.operateRec)">操作记录</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view" v-model="activeTab">
      <el-tab-pane label="详情">
        <el-form size="mini" v-if="isDataReady">
          <paybill-detail :data="detail" disabled />
          <payer-info :data="detail" :type="this.pageConfig.type" disabled />
          <!-- incomeType 收支类型(0收款/1付款） -->
          <payment-log
            :addApi="pageConfig.api.addIncoming"
            :api="pageConfig.api.delIncoming"
            :billAmount="+(Number(detail.billTotalAmount-detail.factAmount)||0).toFixed(2)"
            :billCode="detail.billCode"
            :billId="detail.id"
            :clientType="detail.clientType"
            :data="detail"
            :hide="paymentLogHide"
            :matchApi="pageConfig.api.matchIncoming"
            :pageConfig="pageConfig"
            :type="pageConfig.type"
            @reload="setEdit(),$reload()"
          />
          <invoice-log :busCode="detail.busCode" :data="detail" :pageConfig="pageConfig" :type="pageConfig.type" />
          <paybill-log :billId="detail.id" v-if="pageConfig.show.includes('paybillLog')" />
          <extras-info :can-modify="authorityButtons.includes(pageConfig.func.edit)" :data="detail" @change="saveExtras" disabled />
        </el-form>
      </el-tab-pane>
      <el-tab-pane
        :label="busInfo[detail.busType].title"
        :name="busInfo[detail.busType].listPage"
        v-if="detail.busCode&&busInfo[detail.busType]"
      >
        <FullscreenWrap v-if="isDataReady&&tabStatus[busInfo[detail.busType].listPage]">
          <component
            :button="false"
            :is="busInfo[detail.busType].listPage"
            :params="{page:1,limit:15,[busInfo[detail.busType].codeFilterKey]:detail.busCode,relationCode:detail.billCode}"
          />
        </FullscreenWrap>
      </el-tab-pane>
    </el-tabs>
    <Late :pageConfig="pageConfig" :rowData="detail" :visible.sync="showLateAmount" @reload="setEdit(),$reload()" v-if="showLateAmount" />
    <OperateLog :params="{
      businessId:detail.id
    }" :visible.sync="showLog" v-if="showLog" />
  </sideDetail>
</template>
<script>
import VisibleMixin from '@/utils/visibleMixin';
import BusMixin from '@/views/finance/payment/busMixin';
import Late from './late';
import OperateLog from './operateLog';

export default {
  mixins: [VisibleMixin, BusMixin],
  components: {
    Late,
    OperateLog
  },
  props: {
    pageConfig: Object
  },
  data() {
    return {
      showApply: false,
      showLateAmount: false,
      showLog: false,
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
        // 账单类型（0收款/1付款）
        // prettier-ignore
        return [
          { label: '账单状态', value: this.settleText[this.detail.settleStatus] },
          { label: '逾期状态', value: this.overText[this.detail.overState||0] },
          { label: this.pageConfig.type==0?'总应收金额':'总应付金额', value: this.detail.billTotalAmount },
          { label: this.pageConfig.type==0?'实收金额':'实付金额', value: this.detail.factAmount },
          { label: this.pageConfig.type==1?'收款方':'付款方', value: this.detail.accountName }
        ];
      }
    },
    paymentLogHide() {
      if (!this.detail) return [];
      let hide =
        (this.detail.amount > 0 && this.pageConfig.type == 0 && [0,1].includes(this.detail.settleStatus))
          ? []
          : ['addIncoming', 'matchIncoming'];
      if (
        [2].includes(this.detail.settleStatus) ||
        [4].includes(this.detail.state)
      ) {
        hide.push('delIncoming');
      }
      return hide;
    }
  },
  mounted() {},
  watch: {},
  methods: {
    async getDetail() {
      if (this.code) {
        let { data } = await this.$getApi(this.pageConfig.api.detail)({
          code: this.code
        });
        data.clientAccount = data.fbilClientInfoVo
          ? data.fbilClientInfoVo.account
          : '';
        return data;
      } else if (this.rowData) {
        return this.rowData;
      }
    },
    async saveExtras({ attachList, note }) {
      this.loading = true;
      try {
        await this.$getApi(this.pageConfig.api.update)({
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