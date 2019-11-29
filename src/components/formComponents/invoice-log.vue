/*
 * @Author: 赵伦
 * @Date: 2019-10-28 15:57:28
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-29 14:10:13
 * @Description: 开票/收票 记录 已绑定 1
*/
<template>
  <form-card :title="`${type==0?'收票':'开票'}记录`">
    <div slot="title">
      <span>{{`${type==0?'收票':'开票'}记录`}}</span>
      <span class="fr">
        <el-link :underline="false" @click="add()" class="mr10" type="primary">+新增</el-link>
      </span>
    </div>
    <el-table :data="list" size="mini">
      <el-table-column label="购买方名称" min-width="80" prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column label="发票号码" min-width="80" prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column label="开票金额" min-width="80" prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column label="开票时间" min-width="80" prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column label="状态" min-width="80" prop="name" show-overflow-tooltip></el-table-column>
    </el-table>
    <!-- 票据类型(0收票，1开票) -->
    <CollectInvoiceDialog :invoiceType="type" :rowData="collectInvoiceData" :visible.sync="showCollectInvoice" v-if="showCollectInvoice" />
  </form-card>
</template>
<script>
import CollectInvoiceDialog from '@/views/finance/receipt/collect-invoice';

export default {
  components: {
    CollectInvoiceDialog
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    type: [Number, String],
    busCode: String
  },
  data() {
    return {
      list: [],
      collectInvoiceData: null,
      showCollectInvoice: false
    };
  },
  watch: {
    busCode() {
      this.getRecList();
    }
  },
  mounted() {
    this.getRecList();
  },
  methods: {
    async getRecList() {
      if (!this.busCode) return;
      let { data } = await this.$api.seePsiFinanceService[
        this.type == 0 ? 'finvoicereceivableList' : 'finvoicebillingList'
      ]({
        page: 1,
        limit: 999,
        busCode: this.busCode,
        dataType: this.type
      });
      this.list = data;
    },
    add() {
      let data = {};
      // 票据类型(0收票，1开票)
      if (this.type == 0) {
        data.purchaseId = this.data.clientId;
        data.purchaseType = this.data.clientType;
        data.marketType = 3;
        data.marketId = this.data.companySettlementId;
      } else {
        data.marketId = this.data.clientId;
        data.marketType = this.data.clientType;
        data.purchaseType = 3;
        data.purchaseId = this.data.companySettlementId;
      }
      data.type = this.type;
      data.busCode = this.data.busCode;
      data.busType = this.data.busType;
      this.collectInvoiceData = data;
      this.showCollectInvoice = true;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>