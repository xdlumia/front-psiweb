/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2020-01-06 11:26:43
 * @Description: 换货单
*/
<template>
  <sideDetail
    :status="status"
    :title="`换货单 ${detail?(codeSlice(detail.swapOrderCode)||''):''}`"
    :visible="showDetailPage"
    @close="close"
    v-loading="loading"
    width="990px"
  >
    <template slot="button">
      <el-button
        @click="$submission('seePsiWmsService.wmsswaporderSubmitApproval',{
          apprpvalNode:detail.apprpvalNode,
          id:detail.id,
        },'提交审核')"
        size="mini"
        type="primary"
        v-if="detail&&[0,-1].includes(detail.swapState)&&authorityButtons.includes('psi_wms_swap_04')"
      >提交审核</el-button>
      <el-button
        @click="$submission('seePsiWmsService.wmsswaporderCancel',{
          apprpvalNode:detail.apprpvalNode,
          id:detail.id,
        },'撤销审核')"
        size="mini"
        type="danger"
        v-if="detail&&[1].includes(detail.swapState)&&authorityButtons.includes('psi_wms_swap_07')"
      >撤销审核</el-button>
      <el-button
        @click="$submission('seePsiWmsService.wmsswaporderPassApproval',{
          apprpvalNode:detail.apprpvalNode,
          id:detail.id,
          busCode:detail.swapOrderCode
        },'通过')"
        size="mini"
        type="primary"
        v-if="detail&&[1].includes(detail.swapState)&&authorityButtons.includes('psi_wms_swap_02')"
      >通过</el-button>
      <el-button
        @click="$submission('seePsiWmsService.wmsswaporderReject',{
          apprpvalNode:detail.apprpvalNode,
          id:detail.id,
        },'驳回',true)"
        size="mini"
        type="danger"
        v-if="detail&&[1].includes(detail.swapState)&&authorityButtons.includes('psi_wms_swap_08')"
      >驳回</el-button>
      <el-button
        @click="showEdit=true"
        size="mini"
        type="primary"
        v-if="detail&&[0,-1].includes(detail.swapState)&&authorityButtons.includes('psi_wms_swap_05')"
      >编辑</el-button>
      <el-button
        @click="$submission('seePsiWmsService.wmsswaporderDelete',{
          id:detail.id
        },'删除')"
        size="mini"
        type="danger"
        v-if="detail&&[0,-1].includes(detail.swapState)&&authorityButtons.includes('psi_wms_swap_06')"
      >删除</el-button>
      <!-- <el-button @click="showExchangeGoods=true" size="mini" type="primary">换货扫码</el-button> -->
    </template>
    <el-tabs class="wfull hfull tabs-view" v-model="activeTab">
      <el-tab-pane label="详情">
        <approve-panel :busType="1" :id="detail.id" v-if="isDataReady" />
        <el-form :model="detail" ref="form" size="mini">
          <exchange-info :data="detail" disabled id="exchangeInfo" />
          <buying-exchange-goods :data="detail" disabled exchangeType="in" id="inGoods" />
          <buying-exchange-goods :data="detail" disabled exchangeType="out" id="outGoods" />
          <orderStorageBill :data="detail" :hide="['isBillFee']" :type="3" disabled feeDetailCode="ZD_DY_LX-4-3" id="billInfo" />
          <customInfo :data="detail" busType="1" disabled id="customInfo"></customInfo>
          <extrasInfo :data="detail" disabled id="extrasInfo"></extrasInfo>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="付款单" name="bill">
        <FullscreenWrap v-if="isDataReady&&tabStatus.bill">
          <FinancePayment :button="false" :params="{page:1,limit:15,busCode:detail.swapOrderCode,relationCode:detail.swapOrderCode}" />
        </FullscreenWrap>
      </el-tab-pane>
      <el-tab-pane label="应收账单" name="bill2">
        <FullscreenWrap v-if="isDataReady&&tabStatus.bill2">
          <FinanceReceivable :button="false" :params="{page:1,limit:15,busCode:detail.swapOrderCode,relationCode:detail.swapOrderCode}" />
        </FullscreenWrap>
      </el-tab-pane>
      <el-tab-pane label="发票管理" name="invoice">
        <!-- 待收票 -->
        <FullscreenWrap v-if="isDataReady&&tabStatus.invoice&&detail.swapOutMoney>detail.swapInMoney">
          <FinanceReceipt :button="false" :params="{page:1,limit:15,busCode:detail.swapOrderCode,relationCode:detail.swapOrderCode}" />
        </FullscreenWrap>
        <!-- 待开票 -->
        <FullscreenWrap v-if="isDataReady&&tabStatus.invoice&&detail.swapOutMoney<=detail.swapInMoney">
          <FinanceBilling :button="false" :params="{page:1,limit:15,busCode:detail.swapOrderCode,relationCode:detail.swapOrderCode}" />
        </FullscreenWrap>
      </el-tab-pane>
    </el-tabs>
    <Edit :rowData="detail" :visible.sync="showEdit" @reload="setEdit(),$reload()" type="edit" v-if="showEdit" />
    <exchange-sweepcode :rowData="getExchangeGoods()" :visible.sync="showExchangeGoods" v-if="showExchangeGoods" />
  </sideDetail>
</template>
<script>
import VisibleMixin from '@/utils/visibleMixin';
import Edit from './edit';

export default {
  mixins: [VisibleMixin],
  components: {
    Edit
  },
  props: {},
  data() {
    return {
      showEdit: false,
      showExchangeGoods: false,
      stateText: {
        '0': '新建',
        '1': '审核中',
        '2': '待换货',
        '3': '部分换货',
        '4': '完成换货',
        '-1': '已驳回'
      }
    };
  },
  computed: {
    status() {
      if (!this.detail) return [];
      else {
        return [
          { label: '状态', value: this.stateText[this.detail.swapState] },
          { label: '单据创建人', value: this.detail.creatorName },
          { label: '创建部门', value: this.detail.deptName },
          { label: '创建时间', value: this.detail.createTime, isTime: true },
          { label: '来源', value: this.detail.source }
        ];
      }
    }
  },
  mounted() {},
  watch: {},
  methods: {
    async getDetail() {
      if (this.code) {
        let { data } = await this.$api.seePsiWmsService.wmsswaporderGetByCode(
          null,
          this.code
        );
        []
          .concat(data.putinCommodityList, data.putoutCommodityList)
          .map(item => {
            item.commodityCode =
              item.swapOutCommodityCode || item.swapInCommodityCode;
          });
        return data;
      } else if (this.rowData) return this.rowData;
    },
    getExchangeGoods() {
      return {
        businessCode: this.detail.swapOrderCode,
        inCommodityList: this.detail.putinCommodityList.map(item => ({
          ...item
        })),
        outCommodityList: this.detail.putoutCommodityList.map(item => ({
          ...item
        }))
      };
    }
  }
};
</script>
<style lang="scss" scoped>
</style>