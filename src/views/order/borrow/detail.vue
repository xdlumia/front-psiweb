/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-13 19:02:27
 * @Description: 借入借出详情
*/
<template>
  <sideDetail :status="status" :visible.sync="showDetailPage" @close="$emit('update:visible',false)" title="借入借出单" width="990px">
    <template slot="button" v-if="detail">
      <el-button
        @click="$submission('seePsiWmsService.wmsborrowloanorderSubmitAudit',[null,detail.id],'提交审核')"
        size="mini"
        type="primary"
      >提交审核</el-button>
      <el-button
        @click="$submission('seePsiPurchaseService.purchasealterationUnsubmission',[null,detail.id],'撤销审核')"
        size="mini"
        type="danger"
      >撤销审核</el-button>
      <el-button @click="$submission('seePsiPurchaseService.purchasealterationExamine',{ isAgree:0 },'通过')" size="mini" type="primary">通过</el-button>
      <el-button
        @click="$submission('seePsiPurchaseService.purchasealterationExamine',{ isAgree:1 },'驳回',true)"
        size="mini"
        type="danger"
      >驳回</el-button>
      <el-button size="mini" type="primary">编辑</el-button>
      <el-button @click="del" size="mini" type="primary">删除</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view">
      <el-tab-pane label="详情">
        <el-form :model="detail" size="mini" v-if="detail">
          <borrow-in :data="detail" disabled />
          <borrow-goods :data="detail" disabled />
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="销售单">销售单</el-tab-pane>
    </el-tabs>
  </sideDetail>
</template>
<script>
import VisibleMixin from '@/utils/visibleMixin';

export default {
  mixins: [VisibleMixin],
  components: {},
  props: {},
  data() {
    return {
      stateText: {
        '0': '新建',
        '1': '审核中',
        '2': '待借入',
        '3': '待借出',
        '4': '部分借入',
        '5': '部分借出',
        '6': '待归还',
        '7': '待返还',
        '8': '部分返还',
        '9': '部分归还',
        '10': '完成返还',
        '11': '完成归还',
        '12': '已驳回',
        '-1': '终止'
      }
    };
  },
  methods: {
    async getDetail() {
      if (this.code) {
        let {
          data
        } = await this.$api.seePsiWmsService.wmsborrowloanorderGetCommodityByBorrowLoanCode(
          {
            borrowLoanCode: this.code
          }
        );
        data.commodityList = data.commodityList || [];
        return data;
      } else if (this.rowData) {
        console.log(this.rowData);
        let { data } = await this.$api.seePsiWmsService.wmsborrowloanorderInfo(
          null,
          this.rowData.id
        );
        return data;
      }
    },
    del() {}
  }
};
</script>
<style lang="scss" scoped>
</style>