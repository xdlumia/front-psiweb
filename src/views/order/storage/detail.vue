/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-20 17:29:16
 * @Description: 采购入库单
*/
<template>
  <sideDetail :status="status" :title="`采购入库单 ${detail?detail.putinCode:''}`" :visible.sync="showDetailPage" @close="close" width="990px">
    <template slot="button">
      <el-button
        @click="$submission('seePsiPurchaseService.purchaseputinSubmitApproval',{
          apprpvalNode:detail.apprpvalNode,
          id:detail.id,
        },'提交审核')"
        size="mini"
        type="primary"
      >提交审核</el-button>
      <el-button
        @click="$submission('seePsiPurchaseService.purchaseputinCancel',{
          apprpvalNode:detail.apprpvalNode,
          id:detail.id,
        },'撤销审核')"
        size="mini"
        type="danger"
      >撤销审核</el-button>
      <el-button
        @click="$submission('seePsiPurchaseService.purchaseputinPassApproval',{
          apprpvalNode:detail.apprpvalNode,
          id:detail.id,
        },'通过')"
        size="mini"
        type="primary"
      >通过</el-button>
      <el-button
        @click="$submission('seePsiPurchaseService.purchaseputinReject',{
          apprpvalNode:detail.apprpvalNode,
          id:detail.id,
        },'驳回',true)"
        size="mini"
        type="danger"
      >驳回</el-button>
      <el-button @click="showEdit=true" size="mini" type="primary">编辑</el-button>
      <el-button
        @click="$submission('seePsiPurchaseService.purchaseputinLogicDelete',{
          id:detail.id,
        },'删除')"
        size="mini"
        type="primary"
      >删除</el-button>
      <el-button @click="showReject=true" size="mini" type="primary">退货</el-button>
      <el-button
        @click="$submission('seePsiPurchaseService.purchaseputinShutdown',{
          apprpvalNode:detail.apprpvalNode,
          id:detail.id,
        },'终止')"
        size="mini"
        type="danger"
      >终止</el-button>
      <el-button size="mini" type="primary">收票申请</el-button>
      <el-button @click="generateContract" size="mini" type="primary">生成合同</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view">
      <el-tab-pane label="详情">
        <el-form :model="detail" size="mini" v-if="detail">
          <supplierInfo :data="detail" disabled id="supplierInfo" />
          <companyInfo :data="detail" disabled id="companyInfo" />
          <arrivalInfo :data="detail" disabled id="arrivalInfo" v-if="detail.source!='直发单'" />
          <buyingDeliverInfo :data="detail" disabled id="deliverInfo" ref="deliverInfo" v-else />
          <buying-goods-edit
            :data="detail"
            :show="[
            'commodityCode','goodsPic','goodsName','categoryCode','className','specOne','configName','noteText','purchasePrice','commodityNumber','taxRate','preTaxAmount','inventoryNumber'
          ]"
            disabled
            id="commodityInfo"
            priceKey="purchasePrice"
          />
          <buying-goods-edit
            :data="detail"
            :show="[
            'commodityCode','goodsPic','goodsName','categoryCode','className','specOne','configName','noteText','purchasePrice','commodityNumber','taxRate','preTaxAmount','inventoryNumber'
          ]"
            disabled
            fkey="additionalCommodityList"
            priceKey="purchasePrice"
            v-if="detail.source=='请购单'"
          />
          <buyingPaymentLate :data="detail" disabled id="paymentLate" />
          <order-storage-bill :data="detail" disabled id="billInfo" />
          <customInfo :data="detail" disabled id="customInfo" />
          <extrasInfo :data="detail" disabled id="extrasInfo" />
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="请购单" name="purchaseApplyCode" v-if="detail&&detail.source=='请购单'">
        <FullscreenWrap v-if="showDetailPage&&!loading&&detail">
          <OrderBuying :button="false" :params="{page:1,limit:15,purchaseApplyCode:detail.joinCode}" />
        </FullscreenWrap>
      </el-tab-pane>
      <el-tab-pane label="直发单" name="directCode" v-if="detail&&detail.source=='直发单'">
        <FullscreenWrap v-if="showDetailPage&&!loading&&detail">
          <OrderDirect :button="false" :params="{page:1,limit:15,directCode:detail.joinCode}" />
        </FullscreenWrap>
      </el-tab-pane>
      <el-tab-pane label="备货单" name="stockCode" v-if="detail&&detail.source=='备货单'">
        <FullscreenWrap v-if="showDetailPage&&!loading&&detail">
          <OrderPrepare :button="false" :params="{page:1,limit:15,stockCode:detail.joinCode}" />
        </FullscreenWrap>
      </el-tab-pane>
      <el-tab-pane label="采购单">采购单</el-tab-pane>
      <el-tab-pane label="采购退货单">
        <FullscreenWrap v-if="showDetailPage&&!loading&&detail">
          <OrderReject :button="false" :params="{page:1,limit:15,putinCode:detail.putinCode}" />
        </FullscreenWrap>
      </el-tab-pane>
      <el-tab-pane label="应付账单">应付账单</el-tab-pane>
      <el-tab-pane label="发票记录">发票记录</el-tab-pane>
    </el-tabs>
    <OrderRejectEdit
      :params="{
      putinCode:detail.putinCode,
      companyAccountId:detail.companyAccountId,
      companySettlementId:detail.companySettlementId,
      supplierId:detail.supplierId,
      commodityList:[].concat(detail.commodityList||[],detail.additionalCommodityList||[])
    }"
      :visible.sync="showReject"
      v-if="detail"
    />
    <orderContract :rowData="orderContractData" :visible.sync="showOrderContract" v-if="showOrderContract" />
    <Edit :rowData="detail" :visible.sync="showEdit" @reload="setEdit(),getDetail()" type="edit" v-if="showEdit" />
  </sideDetail>
</template>
<script>
import OrderRejectEdit from '../reject/edit'; // 采购退货单
import Edit from './edit'; // 采购入库单编辑
import OrderContract from '@/views/contract/order/edit'; // 采购合同
import VisibleMixin from '@/utils/visibleMixin';

export default {
  mixins: [VisibleMixin],
  components: {
    OrderRejectEdit,
    OrderContract,
    Edit
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
        '3': '已通过',
        '4': '已完成',
        '5': '已驳回',
        '6': '已终止'
      }
    };
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
      console.log(contract);
      this.orderContractData = contract;
      this.showOrderContract = true;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>