/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-20 16:48:05
 * @Description: 销售合同
*/
<template>
  <sideDetail :status="status" :visible.sync="showDetailPage" @close="$emit('update:visible',false)" title="销售合同" width="990px">
    <el-tabs class="wfull hfull tabs-view">
      <el-tab-pane label="详情">
        <el-form :model="detail" label-position="top" size="small" v-if="visible&&detail&&!loading">
          <!-- 客户信息 -->
          <customerInfo :data="detail" :defaultData="detail.clientInfo" disabled />
          <!-- 公司信息 -->
          <companyInfo :data="detail" :defaultData="getCompanyInfo()" disabled />
          <!-- 报价单信息 -->
          <quote-info :options="(detail.quotationList || []).map(item=>item.quotationCode)" :quotationMap="getQuotationMap()" />
          <!-- 账期信息 -->
          <order-storage-bill :data="detail" :hide="['isBillFee']" disabled />
        </el-form>
        <el-form :model="detail" label-position="top" ref="form" size="small" v-if="visible&&detail&&!loading">
          <!-- 自定义信息 -->
          <customInfo :data="detail" disabled />
          <!-- 备注信息 -->
          <extrasInfo :data="detail" disabled />
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="销售出库单">
        <FullscreenWrap v-if="showDetailPage&&!loading&&detail">
          <SalesOutLibrary :button="false" :params="{page:1,limit:15,shipmentCode:detail.shipmentCode}" />
        </FullscreenWrap>
      </el-tab-pane>
    </el-tabs>
  </sideDetail>
</template>
<script>
import quoteInfo from '@/views/sales/outLibrary/quote-info';
import VisibleMixin from '@/utils/visibleMixin';

export default {
  mixins: [VisibleMixin],
  components: {
    quoteInfo
  },
  props: {},
  data() {
    return {
      // status: [
      //   { label: '合同创建人', value: '张收纳' },
      //   { label: '创建部门', value: '销售部' },
      //   { label: '创建时间', value: +new Date(), isTime: true }
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
        } = await this.$api.seePsiContractService.contractsalesGetByCode(
          null,
          this.code
        );
        data.clientId = data.clientInfo.id;
        data.companyAccountId = data.corporation.id;
        if (data.corporationAccount) {
          data.companySettlementId = data.corporationAccount.id;
        }
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
    },
    getQuotationMap() {
      return (this.detail.quotationList || []).reduce((data, item) => {
        data[item.quotationCode] = item;
        return data;
      }, {});
    }
  }
};
</script>
<style lang="scss" scoped>
</style>