/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-12 11:49:22
 * @Description: 供应商编号
*/
<template>
  <sideDetail
    :status="status"
    :title="`${detail?detail.supplierName:'供应商编号'} ${detail?(detail.code||''):''}`"
    :visible="showDetailPage"
    @close="close"
    v-loading="loading"
    width="990px"
  >
    <template slot="button">
      <el-button
        @click="changeState(0)"
        size="mini"
        type="primary"
        v-if="detail&&detail.state!=0&&authorityButtons.includes('psi_supplier_05')"
      >启用</el-button>
      <el-button @click="changeState(1)" size="mini" type="danger" v-else-if="authorityButtons.includes('psi_supplier_04')">停用</el-button>
      <el-button @click="showEdit=true" size="mini" type="primary" v-if="authorityButtons.includes('psi_supplier_08')">编辑</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view" v-model="activeTab">
      <el-tab-pane label="详情">
        <el-form :model="detail" size="mini" v-if="detail">
          <form-card title="往来账款">
            <el-row>
              <el-col :span="8">
                <span class="b mr10">应付欠款</span>
                <span>{{statistic.totalArrearsAmount||0}}元</span>
              </el-col>
              <el-col :span="8">
                <span class="b mr10">预付款</span>
                <span>{{statistic.totalPredictAmount||0}}元</span>
              </el-col>
            </el-row>
          </form-card>
          <supplier-base-edit :data="detail" disabled></supplier-base-edit>
          <invoice-info :data="detail" disabled></invoice-info>
          <extras-info :data="detail" disabled></extras-info>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="可供商品" name="supplierGoods">
        <el-form class="supplier-goods" v-if="detail&&tabStatus.supplierGoods">
          <supplier-goods :supplierId="detail.id" show-cat />
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="采购入库单" name="putin">
        <FullscreenWrap v-if="isDataReady&&tabStatus.putin">
          <OrderStorage :button="false" :params="{page:1,limit:15,supplierId:detail.id}" />
        </FullscreenWrap>
      </el-tab-pane>
      <el-tab-pane label="采购合同" name="orderContract">
        <FullscreenWrap v-if="isDataReady&&tabStatus.orderContract">
          <ContractOrder :button="false" :params="{page:1,limit:15,supplierId:detail.id,supplierName:detail.supplierName}" />
        </FullscreenWrap>
      </el-tab-pane>
      <el-tab-pane label="采购单" name="purchaseOrder">
        <FullscreenWrap v-if="isDataReady&&tabStatus.purchaseOrder">
          <StoragePurchase :button="false" :params="{page:1,limit:15,supplierId:detail.id}" />
        </FullscreenWrap>
      </el-tab-pane>
      <el-tab-pane label="采购退货单" name="reject">
        <FullscreenWrap v-if="isDataReady&&tabStatus.reject">
          <OrderReject :button="false" :params="{page:1,limit:15,supplierId:detail.id}" />
        </FullscreenWrap>
      </el-tab-pane>
      <el-tab-pane label="应付账单" name="payable">
        <FullscreenWrap v-if="isDataReady&&tabStatus.payable">
          <FinancePayable :button="false" :params="{page:1,limit:15,clientId:detail.id,clientType:1}" />
        </FullscreenWrap>
      </el-tab-pane>
      <el-tab-pane label="发票记录" name="invoice">
        <FullscreenWrap v-if="isDataReady&&tabStatus.invoice">
          <FinanceReceipt :button="false" :params="{page:1,limit:15,marketId:detail.id}" />
        </FullscreenWrap>
      </el-tab-pane>
    </el-tabs>
    <Edit :code="detail.code" :visible.sync="showEdit" @reload="setEdit(),$reload()" v-if="detail" />
  </sideDetail>
</template>
<script>
import Edit from './edit';
import VisibleMixin from '@/utils/visibleMixin';

export default {
  mixins: [VisibleMixin],
  components: {
    Edit
  },
  props: {},
  data() {
    return {
      showEdit: false,
      statistic: {}
    };
  },
  computed: {
    status() {
      if (!this.detail) return [];
      return [
        {
          label: '状态',
          value: this.detail.state,
          options: [{ label: '启用中', value: 0 }, { label: '停用中', value: 1 }]
        },
        { label: '供应商创建人', value: this.detail.creatorName },
        { label: '创建部门', value: this.detail.deptName },
        { label: '创建时间', value: this.detail.createTime, isTime: true },
        {
          label: '来源',
          value: this.detail.tenementSource,
          dictName: 'PSI_KHGL_LY'
        }
      ];
    }
  },
  methods: {
    async getDetail() {
      this.loading = true;
      try {
        let {
          data
        } = await this.$api.seePsiCommonService.commonsupplierinfoInfoBycode(
          null,
          this.code
        );
        data.productRange = data.productRange
          ? data.productRange.split(',')
          : [];
        this.detail = data;
        this.getStatistics();
      } catch (error) {}
      this.loading = false;
    },
    async getStatistics() {
      let {
        data
      } = await this.$api.seePsiFinanceService.fbillGetClientFbillStatistics({
        clientType: 1,
        clientId: this.detail.id,
        billType: 1
      });
      this.statistic = data;
    },
    async update(data) {
      this.loading = true;
      try {
        await this.$api.seePsiCommonService.commonsupplierinfoUpdate(
          Object.assign(
            {
              id: this.detail.id,
              code: this.detail.code
            },
            data
          )
        );
        this.setEdit();
        Object.assign(this.detail, data);
      } catch (error) {}
      this.loading = false;
    },
    async changeState(state) {
      await this.$confirm(
        `是否要${state == 0 ? '启用' : '停用'}该供应商？`,
        '提示'
      );
      this.update({ state });
    }
  }
};
</script>
<style lang="scss" scoped>
.supplier-goods /deep/ .supplier-goods-form-card {
  height: calc(100vh - 250px);
}
</style>