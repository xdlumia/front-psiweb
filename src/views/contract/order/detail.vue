/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-27 11:45:05
 * @Description: 采购合同
*/
<template>
  <sideDetail :status="status" :title="`采购合同 ${code||''}`" :visible="showDetailPage" @close="close" v-loading="loading" width="990px">
    <el-tabs class="wfull hfull tabs-view" v-model="activeTab">
      <el-tab-pane label="详情">
        <el-form :model="detail" class="p10" ref="form" size="mini" v-if="detail&&showDetailPage&&!loading">
          <supplierInfo :data="detail" :defaultData="detail.supplierInfo" disabled />
          <companyInfo :data="detail" :defaultData="getCompanyInfo()" disabled />
          <arrivalInfo :data="detail" :hide="['saleTime']" disabled />
          <!-- <buyingDeliverInfo :data="detail" :defaultClientData="detail.shipmentsLogistics" disabled ref="deliverInfo" v-else :hide="['saleTime']" /> -->
          <buying-goods-edit
            :data="detail"
            :show="[
              'commodityCode','goodsPic','goodsName','categoryCode','className','specOne','configName','noteText','costAmount','commodityNumber','taxRate','preTaxAmount','inventoryNumber'
            ]"
            :sort="['expanded']"
            disabled
            priceKey="costAmount"
          />
          <buyingPaymentLate :data="detail" disabled />
          <order-storage-bill :data="detail" :hide="['isBillFee']" disabled />
        </el-form>
        <el-form :model="detail" class="p10" ref="form" size="mini" v-if="detail&&showDetailPage&&!loading">
          <contract-extras :data="detail" type="2" />
          <extrasInfo :data="detail" disabled />
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="采购入库单" name="putin">
        <FullscreenWrap v-if="showDetailPage&&!loading&&detail&&tabStatus.putin">
          <OrderStorage :button="false" :params="{page:1,limit:15,putinCode:detail.purchasePutinCode}" />
        </FullscreenWrap>
      </el-tab-pane>
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
      // status: [
      //   { label: '合同创建人', value: '张收纳' },
      //   { label: '创建部门', value: '销售部' },
      //   { label: '创建时间', value: +new Date(), isTime: true },
      // ]
    };
  },
  computed: {
    status() {
      if (!this.detail) return [];
      else {
        return [
          { label: '创建人', value: this.detail.creatorName },
          { label: '创建部门', value: this.detail.deptName },
          { label: '创建时间', value: this.detail.createTime, isTime: true }
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
        } = await this.$api.seePsiContractService.contractpurchaseGetByCode(
          null,
          this.code
        );
        data.companyAccountId = data.corporation.id;
        if (data.corporationAccount) {
          data.companySettlementId = data.corporationAccount.id;
        }
        data.logistics = data.shipmentsLogistics;
        if (data.shipmentsLogistics.purchaseTime) {
          data.purchaseTime = data.shipmentsLogistics.purchaseTime;
        }
        if (data.shipmentsLogistics.saleTime) {
          data.saleTime = data.shipmentsLogistics.saleTime;
        }
        data.supplierId = data.supplierInfo.id;
        return data;
      } else if (this.rowData) {
        return this.rowData;
      }
    },
    getCompanyInfo() {
      return {
        ...this.detail.corporation,
        commonCorporationAccountEntities: this.detail.corporationAccount
          ? [this.detail.corporationAccount]
          : []
      };
    }
  }
};
</script>
<style lang="scss" scoped>
</style>