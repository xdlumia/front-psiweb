/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-20 17:31:54
 * @Description: 采购单详情
*/
<template>
  <sideDetail
    :status="status"
    :title="`请购单 ${detail?detail.purchaseApplyCode:''}`"
    :visible.sync="showDetailPage"
    @close="$emit('update:visible',false)"
    v-loading="loading"
    width="990px"
  >
    <template slot="button">
      <el-button @click="orderStorageVisible=true" size="mini" type="primary">采购</el-button>
      <el-button @click="addBorrowInVisible=true" size="mini" type="primary">借入</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view">
      <el-tab-pane label="详情">
        <el-form label-position="top" size="mini" v-if="detail">
          <form-card title="到货信息">
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="销售要求到货时间" v-if="detail.saleArrivalTime">
                  <div class="wfull">{{detail.saleArrivalTime|timeToStr('YYYY-MM-DD')}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="采购预计到货时间" v-if="detail.purchaseArrivalTime">
                  <div class="wfull">{{detail.purchaseArrivalTime|timeToStr('YYYY-MM-DD')}}</div>
                </el-form-item>
              </el-col>
            </el-row>
          </form-card>
          <buying-goods-edit
            :data="detail"
            :show="[
              'commodityCode','goodsPic','goodsName','categoryCode','className','specOne','configName','noteText','waitPurchaseNumber','inventoryNumber'
            ]"
            disabled
          />
          <customInfo :data="detail" disabled :busType="27" />
          <extrasInfo :data="detail" disabled />
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="采购入库单">
        <FullscreenWrap v-if="showDetailPage&&!loading&&detail">
          <OrderStorage :button="false" :params="{page:1,limit:15,joinCode:code}" />
        </FullscreenWrap>
      </el-tab-pane>
      <el-tab-pane label="报价单">
        <FullscreenWrap v-if="showDetailPage&&!loading&&detail">
          <salesQuote :button="false" :params="{page:1,limit:15,quotationCode:detail.quotationCode}" />
        </FullscreenWrap>
      </el-tab-pane>
    </el-tabs>
    <OrderStorageAdd :joinCode="code" :visible.sync="orderStorageVisible" @reload="setEdit" from="请购单" />
    <addBorrowIn :visible.sync="addBorrowInVisible" @reload="setEdit" />
  </sideDetail>
</template>
<script>
import OrderStorageAdd from '../storage/edit';
import AddBorrowIn from '@/views/order/borrow/addIn';
import VisibleMixin from '@/utils/visibleMixin';

export default {
  mixins: [VisibleMixin],
  components: {
    OrderStorageAdd,
    AddBorrowIn
  },
  data() {
    return {
      orderStorageVisible: false,
      addBorrowInVisible: false,
      stateText: {
        // 单据状态0待完成 1部分完成 2完成3终止
        0: '待完成',
        1: '部分完成',
        2: '完成',
        3: '终止'
      }
    };
  },
  methods: {
    async getDetail() {
      if (this.code) {
        let {
          data
        } = await this.$api.seePsiPurchaseService.purchaseapplyorderGetByCode(
          null,
          this.code
        );
        return data;
      } else if (this.rowData) {
        return this.rowData;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>