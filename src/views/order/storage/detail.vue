/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-13 10:54:49
 * @Description: 采购入库单
*/
<template>
  <sideDetail :status="status" :title="`采购入库单 ${detail?detail.putinCode:''}`" :visible.sync="showDetailPage" @close="close" width="990px">
    <template slot="button">
      <el-button
        @click="$submission('seePsiPurchaseService.purchaseputinSubmission',{ busCode:detail.stockCode },'提交审核')"
        size="mini"
        type="primary"
      >提交审核</el-button>
      <el-button
        @click="$submission('seePsiPurchaseService.purchaseputinUnsubmission',{ busCode:detail.stockCode },'撤销审核')"
        size="mini"
        type="danger"
      >撤销审核</el-button>
      <el-button @click="$submission('seePsiPurchaseService.purchaseputinExamine',{ isAgree:0 },'通过')" size="mini" type="primary">通过</el-button>
      <el-button @click="$submission('seePsiPurchaseService.purchaseputinExamine',{ isAgree:1 },'驳回',true)" size="mini" type="danger">驳回</el-button>
      <el-button @click="showEdit=true" size="mini" type="primary">编辑</el-button>
      <el-button @click="del" size="mini" type="primary">删除</el-button>
      <el-button @click="showReject=true" size="mini" type="primary">退货</el-button>
      <el-button size="mini" type="primary">终止</el-button>
      <el-button size="mini" type="primary">收票申请</el-button>
      <el-button @click="showOrderContract=true" size="mini" type="primary">生成合同</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view">
      <el-tab-pane label="详情">
        <el-form size="mini" v-if="detail" :model="detail">
          <supplierInfo :data="detail" disabled id="supplierInfo" />
          <companyInfo :data="detail" disabled id="companyInfo" />
          <arrivalInfo :data="detail" disabled id="arrivalInfo" v-if="detail.source!='直发单'" />
          <buyingDeliverInfo :data="detail" id="deliverInfo" ref="deliverInfo" v-else />
          <buying-goods-edit
            :data="detail"
            :show="[
            'commodityCode','goodsPic','goodsName','categoryCode','className','specOne','configName','noteText','costAmountPrice','commodityNumber','taxRate','preTaxAmount','inventoryNumber'
          ]"
            disabled
            id="commodityInfo"
          />
          <buying-goods-edit
            :data="detail"
            :show="[
            'commodityCode','goodsPic','goodsName','categoryCode','className','specOne','configName','noteText','costAmountPrice','commodityNumber','taxRate','preTaxAmount','inventoryNumber'
          ]"
            disabled
            fkey="additionalCommodityList"
            v-if="detail.source=='请购单'"
          />
          <paymentLate :data="detail" disabled id="paymentLate" />
          <order-storage-bill :data="form" disabled id="billInfo" />
          <customInfo :data="detail" disabled id="customInfo" />
          <extrasInfo :data="detail" disabled id="extrasInfo" />
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="请购单"></el-tab-pane>
      <el-tab-pane label="直发单">直发单</el-tab-pane>
      <el-tab-pane label="采购单">采购单</el-tab-pane>
      <el-tab-pane label="采购退货单">采购退货单</el-tab-pane>
      <el-tab-pane label="应付账单">应付账单</el-tab-pane>
      <el-tab-pane label="发票记录">发票记录</el-tab-pane>
    </el-tabs>
    <orderReject :params="{
      putinCode:detail.putinCode
    }" :visible.sync="showReject" v-if="detail" />
    <orderContract :visible.sync="showOrderContract" />
    <Edit :rowData="detail" :visible.sync="showEdit" type="edit" v-if="showEdit" />
  </sideDetail>
</template>
<script>
import OrderReject from '../reject/edit'; // 采购退货单
import Edit from './edit'; // 采购入库单编辑
import OrderContract from '@/views/contract/order/edit'; // 采购合同
import VisibleMixin from '@/utils/visibleMixin';

export default {
  mixins: [VisibleMixin],
  components: {
    OrderReject,
    OrderContract,
    Edit
  },
  data() {
    return {
      showEdit: false,
      showReject: false,
      showOrderContract: false,
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
    async del() {
      await this.$confirm('是否确定删除该采购入库单？');
      this.loading = true;
      try {
        await this.$api.seePsiPurchaseService.purchaseputinLogicDelete({
          id: this.detail.id
        });
        console.log('删除采购入库单');
        this.setEdit();
        this.close();
      } catch (error) {}
      this.loading = false;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>