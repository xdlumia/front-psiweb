/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-14 11:26:16
 * @Description: 直发单详情
*/
<template>
  <sideDetail
    :status="status"
    :title="`直发单 ${detail?(detail.directCode||code||''):''}`"
    :visible.sync="showDetailPage"
    @close="close"
    v-loading="loading"
    width="990px"
  >
    <template slot="button">
      <el-button
        @click="showDeliverGoods=true"
        size="mini"
        type="primary"
        v-if="detail&&[0,1].includes(detail.state)&&authorityButtons.includes('psi_purchase_direct_03')"
      >发货</el-button>
      <el-button
        :disabled="waitBuyingNumber>0?false:true"
        @click="showAddOrderStorage=true"
        size="mini"
        type="primary"
        v-if="detail&&[0,1].includes(detail.state)&&authorityButtons.includes('psi_purchase_direct_04')"
      >采购</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view" v-model="activeTab">
      <el-tab-pane label="详情">
        <el-form size="mini" v-if="detail">
          <deliverInfo
            :data="detail"
            :hide="[
                'salesRequireArrivalTime','procurementExpectedArrivalTime','note'
            ]"
            disabled
          ></deliverInfo>
          <buying-goods-edit
            :data="detail"
            :show="[
              'commodityCode','goodsPic','goodsName','categoryCode','className','specOne','configName','noteText','waitPurchaseNumber','inventoryNumber'
            ]"
            :sort="['expanded']"
            disabled
            fkey="commodityEntityList"
          />
          <customInfo :data="detail" busType="15" disabled></customInfo>
          <extrasInfo :data="detail" disabled></extrasInfo>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="采购入库单" name="putin">
        <FullscreenWrap v-if="isDataReady&&tabStatus.putin">
          <OrderStorage :button="false" :params="{page:1,limit:15,joinCode:detail.directCode,relationCode:detail.directCode}" />
        </FullscreenWrap>
      </el-tab-pane>
      <el-tab-pane label="报价单" name="quotion">
        <FullscreenWrap v-if="isDataReady&&tabStatus.quotion">
          <salesQuote :button="false" :params="{page:1,limit:15,quotationCode:detail.quotationCode,relationCode:detail.directCode}" />
        </FullscreenWrap>
      </el-tab-pane>
    </el-tabs>
    <addOrderStorage
      :joinCode="detail.directCode||code"
      :visible.sync="showAddOrderStorage"
      @reload="setEdit(),$reload()"
      from="直发单"
      v-if="showAddOrderStorage"
    />
    <editDirect :rowData="detail" :visible.sync="showEdit" @reload="setEdit(),$reload()" v-if="showEdit" />
    <deliverEdit
      :code="detail.directCode||code"
      :rowData="detail"
      :visible.sync="showDeliverGoods"
      @reload="setEdit(),$reload()"
      v-if="showDeliverGoods"
    />
  </sideDetail>
</template>
<script>
import AddOrderStorage from '../storage/edit'; // 采购入库单
import EditDirect from './edit'; // 编辑直发单
import DeliverEdit from './deliverEdit'; // 编辑直发单
import VisibleMixin from '@/utils/visibleMixin';

export default {
  mixins: [VisibleMixin],
  components: {
    AddOrderStorage,
    EditDirect,
    DeliverEdit
  },
  data() {
    return {
      showEdit: false,
      showAddOrderStorage: false,
      showDeliverGoods: false,
      stateText: {
        '0': '待完成',
        '1': '部分完成',
        '2': '已完成',
        '3': '已终止'
      }
    };
  },
  computed: {
    waitBuyingNumber() {
      if (this.detail) {
        return []
          .concat(this.detail.commodityEntityList || [])
          .reduce((data, item) => {
            data += Number(item.waitPurchaseNumber) || 0;
            return data;
          }, 0);
      } else return 0;
    }
  },
  mounted() {},
  methods: {
    async getDetail() {
      if (this.code) {
        let {
          data
        } = await this.$api.seePsiPurchaseService.purchasedirectGetByCode(
          null,
          this.code
        );
        return data;
      } else if (this.rowData) {
        return this.rowData;
      }
    },
    async del() {
      await this.$confirm('是否确定删除该直发单？');
      this.loading = true;
      try {
        await this.$api.seePsiPurchaseService.purchasedirectLogicDelete({
          id: this.detail.id
        });
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