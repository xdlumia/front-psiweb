/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-09 14:40:11
 * @Description: 采购入库单
*/
<template>
  <sideDetail
    :status="status"
    :title="`采购入库单 ${detail?(detail.putinCode||''):''}`"
    :visible.sync="showDetailPage"
    @close="close"
    v-loading="loading"
    width="990px"
  >
    <template slot="button">
      <el-button
        @click="$submission('seePsiPurchaseService.purchaseputinSubmitApproval',{
          apprpvalNode:detail.apprpvalNode,
          id:detail.id,
        },'提交审核')"
        size="mini"
        type="primary"
        v-if="detail&&[0,5].includes(detail.state)"
      >提交审核</el-button>
      <el-button
        @click="$submission('seePsiPurchaseService.purchaseputinCancel',{
          apprpvalNode:detail.apprpvalNode,
          id:detail.id,
        },'撤销审核')"
        size="mini"
        type="danger"
        v-if="detail&&[1].includes(detail.state)"
      >撤销审核</el-button>
      <el-button
        @click="$submission('seePsiPurchaseService.purchaseputinPassApproval',{
          apprpvalNode:detail.apprpvalNode,
          id:detail.id,
          busCode:detail.putinCode
        },'通过')"
        size="mini"
        type="primary"
        v-if="detail&&[1].includes(detail.state)"
      >通过</el-button>
      <el-button
        @click="$submission('seePsiPurchaseService.purchaseputinReject',{
          apprpvalNode:detail.apprpvalNode,
          id:detail.id,
        },'驳回',true)"
        size="mini"
        type="danger"
        v-if="detail&&[1].includes(detail.state)"
      >驳回</el-button>
      <el-button @click="showEdit=true" size="mini" type="primary" v-if="detail&&[0,5].includes(detail.state)">编辑</el-button>
      <el-button
        @click="$submission('seePsiPurchaseService.purchaseputinLogicDelete',{
          id:detail.id,
        },'删除')"
        size="mini"
        type="danger"
        v-if="detail&&[0,5].includes(detail.state)"
      >删除</el-button>
      <el-button
        :disabled="!(canReject&&detail.isAlteration)"
        @click="showReject=true"
        size="mini"
        type="primary"
        v-if="detail&&[3,4].includes(detail.state)&&detail.source!='直发单'"
      >退货</el-button>
      <el-button
        @click="$submission('seePsiPurchaseService.purchaseputinShutdown',{
          apprpvalNode:detail.apprpvalNode,
          id:detail.id,
          busCode:detail.putinCode
        },'终止')"
        size="mini"
        type="danger"
        v-if="detail&&[3].includes(detail.state)"
      >终止</el-button>
      <el-button @click="collectInvoiceApply" size="mini" type="primary" v-if="detail&&[3,4].includes(detail.state)">收票申请</el-button>
      <el-button @click="generateContract" size="mini" type="primary" v-if="detail&&[3].includes(detail.state)">生成合同</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view" v-model="activeTab">
      <el-tab-pane label="详情">
        <approve-panel :busType="30" :id="detail.id" v-if="isDataReady" />
        <el-form :model="detail" size="mini" v-if="detail">
          <supplierInfo :data="detail" disabled id="supplierInfo" />
          <companyInfo :data="detail" disabled id="companyInfo" />
          <arrivalInfo
            :data="detail"
            :hide="detail.source=='备货单'?['saleTime']:[]"
            :labels="detail.source=='直发单'?{
              saleTime:'销售预计发货时间'
            }:{}"
            disabled
            id="arrivalInfo"
            v-if="detail.source!='直发单'"
          />
          <buyingDeliverInfo :data="detail" disabled id="deliverInfo" ref="deliverInfo" v-else />
          <buying-goods-edit
            :data="detail"
            :show="[
                'commodityCode','goodsPic','goodsName','categoryCode','className','specOne','configName','noteText','purchasePrice','commodityNumber','taxRate','preTaxAmount','inventoryNumber'
              ]"
            :sort="detail.source=='备货单'?[]:['expanded']"
            disabled
            id="commodityInfo"
            priceKey="purchasePrice"
          />
          <buying-goods-edit
            :data="detail"
            :show="[
                'commodityCode','goodsPic','goodsName','categoryCode','className','specOne','configName','noteText','purchasePrice','commodityNumber','taxRate','preTaxAmount','inventoryNumber'
              ]"
            :sort="detail.source=='备货单'?[]:['expanded']"
            disabled
            fkey="additionalCommodityList"
            priceKey="purchasePrice"
            title="附加商品"
            v-if="detail.source=='请购单'"
          />
          <buyingPaymentLate :data="detail" disabled id="paymentLate" />
          <order-storage-bill :data="detail" disabled id="billInfo" />
          <customInfo :data="detail" busType="30" disabled id="customInfo" />
          <extrasInfo :data="detail" disabled id="extrasInfo" />
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="请购单" name="purchaseApplyCode" v-if="detail&&detail.source=='请购单'">
        <FullscreenWrap v-if="isDataReady&&tabStatus.purchaseApplyCode">
          <OrderBuying :button="false" :params="{page:1,limit:15,purchaseApplyCode:detail.joinCode,relationCode:detail.putinCode}" />
        </FullscreenWrap>
      </el-tab-pane>
      <el-tab-pane label="直发单" name="directCode" v-if="detail&&detail.source=='直发单'">
        <FullscreenWrap v-if="isDataReady&&tabStatus.directCode">
          <OrderDirect :button="false" :params="{page:1,limit:15,directCode:detail.joinCode,relationCode:detail.putinCode}" />
        </FullscreenWrap>
      </el-tab-pane>
      <el-tab-pane label="备货单" name="stockCode" v-if="detail&&detail.source=='备货单'">
        <FullscreenWrap v-if="isDataReady&&tabStatus.stockCode">
          <OrderPrepare :button="false" :params="{page:1,limit:15,stockCode:detail.joinCode,relationCode:detail.putinCode}" />
        </FullscreenWrap>
      </el-tab-pane>
      <el-tab-pane label="采购单" name="purchaseOrder">
        <FullscreenWrap v-if="isDataReady&&tabStatus.purchaseOrder">
          <StoragePurchase :button="false" :params="{page:1,limit:15,putinCode:detail.putinCode,relationCode:detail.putinCode}" />
        </FullscreenWrap>
      </el-tab-pane>
      <el-tab-pane label="采购退货单" name="reject">
        <FullscreenWrap v-if="isDataReady&&tabStatus.reject">
          <OrderReject :button="false" :params="{page:1,limit:15,putinCode:detail.putinCode,relationCode:detail.putinCode}" />
        </FullscreenWrap>
      </el-tab-pane>
      <el-tab-pane label="应付账单" name="payable">
        <FullscreenWrap v-if="isDataReady&&tabStatus.payable">
          <FinancePayable :button="false" :params="{page:1,limit:15,busCode:detail.putinCode,relationCode:detail.putinCode}" />
        </FullscreenWrap>
      </el-tab-pane>
      <el-tab-pane label="发票记录" name="invoice">
        <FullscreenWrap v-if="isDataReady&&tabStatus.invoice">
          <FinanceReceipt :button="false" :params="{page:1,limit:15,busCode:detail.putinCode,relationCode:detail.putinCode}" />
        </FullscreenWrap>
      </el-tab-pane>
    </el-tabs>
    <OrderRejectEdit
      :params="{
        putinCode:detail.putinCode,
        companyAccountId:detail.companyAccountId,
        companySettlementId:detail.companySettlementId,
        supplierId:detail.supplierId,
        commodityList:[].concat(detail.commodityList||[],detail.additionalCommodityList||[]).filter(item=>(item.commodityNumber-(item.returenNumber||0)))
      }"
      :visible.sync="showReject"
      @reload="setEdit(),$reload()"
      v-if="detail"
    />
    <orderContract :rowData="orderContractData" :visible.sync="showOrderContract" v-if="showOrderContract" />
    <Edit :rowData="detail" :visible.sync="showEdit" @reload="setEdit(),$reload()" type="edit" v-if="showEdit" />
    <CollectInvoiceDialog :invoiceType="1" :rowData="collectInvoiceData" :visible.sync="showCollectInvoice" v-if="showCollectInvoice" />
  </sideDetail>
</template>
<script>
import OrderRejectEdit from '../reject/edit'; // 采购退货单
import Edit from './edit'; // 采购入库单编辑
import OrderContract from '@/views/contract/order/edit'; // 采购合同
import VisibleMixin from '@/utils/visibleMixin';
import CollectInvoiceDialog from '@/views/finance/receipt/collect-invoice';

export default {
  mixins: [VisibleMixin],
  components: {
    OrderRejectEdit,
    OrderContract,
    Edit,
    CollectInvoiceDialog
  },
  data() {
    return {
      showEdit: false,
      showReject: false,
      showOrderContract: false,
      orderContractData: null,
      stateText: {
        '0': '新建',
        '1': '审核中',
        '2': '销售确认',
        '3': '已通过',
        '4': '已完成',
        '5': '已驳回',
        '6': '已终止'
      },
      collectInvoiceData: null,
      showCollectInvoice: false
    };
  },
  computed: {
    // 是否可以退货
    canReject() {
      if (!this.detail) return false;
      return []
        .concat(
          this.detail.commodityList || [],
          this.detail.additionalCommodityList || []
        )
        .filter(item => item.commodityNumber - (item.returenNumber || 0) > 0)
        .length
        ? true
        : false;
    }
  },
  methods: {
    async getDetail() {
      if (this.code) {
        let {
          data
        } = await this.$api.seePsiPurchaseService.purchaseputinGetByCode(
          null,
          this.code
        );
        data.commodityList = data.commodityList || [];
        console.log(data);
        return data;
      } else if (this.rowData) {
        return this.rowData;
      }
    },
    async generateContract() {
      // 生成采购合同，整理数据结构
      let contract = JSON.parse(JSON.stringify(this.detail));
      if (contract.supplierId) {
        let {
          data
        } = await this.$api.seePsiCommonService.commonsupplierinfoInfo(
          null,
          contract.supplierId
        );
        contract.supplierInfo = data;
        contract.supplierName = data.supplierName;
      }
      contract.shipmentsLogistics = contract.logistics;
      if (contract.purchaseTime) {
        contract.shipmentsLogistics.purchaseTime = contract.purchaseTime;
      }
      if (contract.saleTime) {
        contract.shipmentsLogistics.saleTime = contract.saleTime;
      }
      delete contract.logistics;
      if (contract.companyAccountId && contract.companySettlementId) {
        let {
          data
        } = await this.$api.seeBaseinfoService.commoncorporationSelectForJxc();
        data.some(item => {
          if (item.id == contract.companyAccountId) {
            // 处理合同中的公司字段
            contract.corporation = item;
            contract.corporation.invoiceTitle = item.corporationName;
            contract.corporation.taxpayersNum = item.taxpayersNum;
            contract.corporation.registerAddres = item.address;
            // 处理合同中的公司账号字段
            (item.commonCorporationAccountEntities || []).some(item => {
              if (item.id == contract.companySettlementId) {
                contract.corporationAccount = item;
                contract.corporationAccount.accountBank = item.accountBank;
                contract.corporationAccount.bankAccount = item.account;
                return true;
              }
            });
            delete contract.corporation.commonCorporationAccountEntities;
            return true;
          }
        });
      }
      contract.commodityList = []
        .concat(
          contract.commodityList || [],
          contract.additionalCommodityList || []
        )
        .map(item => {
          item.costAmount = item.purchasePrice;
          return item;
        });
      delete contract.additionalCommodityList;
      contract.totalAmount = contract.putinAmount;
      contract.totalNum = contract.putinNum;
      contract.purchasePutinCode = contract.putinCode;
      delete contract.id;
      delete contract.state;
      contract.source = '采购入库单';
      this.orderContractData = contract;
      this.showOrderContract = true;
    },
    collectInvoiceApply() {
      // 收集
      this.collectInvoiceData = {
        type: 0,
        busCode: this.detail.putinCode,
        busType: 4,
        purchaseId: this.detail.companySettlementId,
        purchaseType: 3,
        marketId: this.detail.supplierId,
        marketType: 1,
        invoiceDetailList: []
          .concat(
            this.detail.commodityList || [],
            this.detail.additionalCommodityList || []
          )
          .map(item => {
            return {
              articleName: item.goodsName,
              commodityCode: item.commodityCode,
              isOrder: 1,
              type: 0,
              taxRate: item.taxRate,
              price: item.purchasePrice,
              quantity: item.commodityNumber
            };
          })
      };
      this.showCollectInvoice = true;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>