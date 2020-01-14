/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2020-01-14 15:08:17
 * @Description: 采购单详情
*/
<template>
  <sideDetail
    :status="status"
    :title="`请购单 ${detail?(codeSlice(detail.purchaseApplyCode)||''):''}`"
    :visible.sync="showDetailPage"
    @close="close"
    v-loading="loading"
    width="990px"
  >
    <template slot="button">
      <el-button
        :disabled="!(waitBuyingNumber>0)"
        @click="orderStorageVisible=true"
        size="mini"
        type="primary"
        v-if="authorityButtons.includes('psi_purchase_apply_04')"
      >采购</el-button>
      <el-button
        :disabled="!(waitBuyingNumber>0)"
        @click="addBorrowInVisible=true"
        size="mini"
        type="primary"
        v-if="authorityButtons.includes('psi_purchase_apply_05')"
      >借入</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view" v-model="activeTab">
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
            :customColumns="customColumns"
            :data="detail"
            :show="[
              'commodityCode','goodsPic','goodsName','categoryCode','className','specOne','configName','noteText','waitPurchaseNumber','inventoryNumber'
            ]"
            :sort="['expanded','isSelect']"
            disabled
          >
            <template slot="addition-buttons">
              <el-link :underline="false" @click="makeOrderStorage" type="primary" v-if="waitBuyingNumber>0">采购选中商品</el-link>
            </template>
          </buying-goods-edit>
          <customInfo :busType="27" :data="detail" disabled />
          <extrasInfo :data="detail" disabled />
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="采购入库单" name="putin">
        <FullscreenWrap v-if="isDataReady&&tabStatus.putin">
          <OrderStorage :button="false" :params="{page:1,limit:15,joinCode:code,relationCode:detail.purchaseApplyCode}" />
        </FullscreenWrap>
      </el-tab-pane>
      <el-tab-pane label="报价单" name="quote">
        <FullscreenWrap v-if="isDataReady&&tabStatus.quote">
          <salesQuote :button="false" :params="{page:1,limit:15,quotationCode:detail.quotationCode,relationCode:detail.purchaseApplyCode}" />
        </FullscreenWrap>
      </el-tab-pane>
      <el-tab-pane label="借入单" name="borrow">
        <FullscreenWrap v-if="isDataReady&&tabStatus.borrow">
          <orderBorrow
            :button="false"
            :params="{page:1,limit:15,businessCode:detail.purchaseApplyCode,businessType:1,relationCode:detail.purchaseApplyCode}"
          />
        </FullscreenWrap>
      </el-tab-pane>
    </el-tabs>
    <OrderStorageAdd :joinCode="code" :joinGoods="joinGoods" :visible.sync="orderStorageVisible" @reload="setEdit(),$reload()" from="请购单" />
    <!-- borrowLoanNum: '',
          commodityCode: '',
    costUnivalence: ''-->
    <addBorrowIn
      :rowData="{
        commodityList:detail.commodityList.filter(a=>a.waitPurchaseNumber>0).map(a=>({
          ...a,
          borrowLoanNum:a.waitPurchaseNumber,
          maxborrowLoanNum:a.waitPurchaseNumber,
          costUnivalence:a.costAmount,
        })),
        borrowLoanType:0,
        businessCode :detail.purchaseApplyCode,
        businessType:1
      }"
      :visible.sync="addBorrowInVisible"
      @reload="setEdit(),$reload()"
      from="请购单"
      v-if="addBorrowInVisible"
    />
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
      },
      customColumns: [
        {
          label: '',
          key: 'isSelect',
          align: 'center',
          width: 80,
          prop: 'isSelect',
          type: 'selection',
          selected: 0,
          fixed: true,
          forceShow: true,
          canShowSelection: (row, info) => ((row.waitPurchaseNumber>0&&!info.isChild) ? true : false)
        }
      ],
      joinGoods: []
    };
  },
  computed: {
    waitBuyingNumber() {
      if (this.detail) {
        return []
          .concat(this.detail.commodityList || [])
          .reduce((data, item) => {
            data += Number(item.waitPurchaseNumber) || 0;
            return data;
          }, 0);
      } else return 0;
    }
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
        data.commodityList.map(item => {
          item.isSelect = 0;
        });
        return data;
      } else if (this.rowData) {
        return this.rowData;
      }
    },
    makeOrderStorage() {
      this.joinGoods = this.detail.commodityList
        .filter(item => item.isSelect == 1)
        .map(item => item.commodityCode);
      if (this.joinGoods.length) {
        this.orderStorageVisible = true;
      } else {
        this.$message({
          message: '请选择商品',
          type: 'warning',
          showClose: true
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>