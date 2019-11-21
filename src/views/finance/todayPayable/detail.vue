/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-21 18:05:18
 * @Description: 今日应付账单
*/
<template>
  <sideDetail :status="status" :title="pageConfig.title" :visible="showDetailPage" @close="close" v-loading="loading" width="990px">
    <template slot="button">
      <el-button @click="showLateAmount=true" size="mini" type="primary">滞纳金</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view">
      <el-tab-pane label="详情">
        <el-form size="mini" v-if="detail&&showDetailPage">
          <!-- <approve-panel></approve-panel> -->
          <paybill-detail :data="detail" disabled />
          <payer-info :data="detail" disabled />
          <payment-log
            :addApi="pageConfig.api.addIncoming"
            :api="pageConfig.api.delIncoming"
            :billCode="detail.billCode"
            :billId="detail.id"
            :data="detail"
            :matchApi="pageConfig.api.matchIncoming"
          />
          <invoice-log :busCode="detail.busCode" :type="pageConfig.type" />
          <paybill-log :billId="detail.id" v-if="pageConfig.show.includes('paybillLog')" />
          <extras-info :data="detail" @change="saveExtras" can-modify disabled />
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="采购单">采购单</el-tab-pane>
      <el-tab-pane label="换货单">换货单</el-tab-pane>
      <el-tab-pane label="费用单">费用单</el-tab-pane>
      <el-tab-pane label="销售退货单">销售退货单</el-tab-pane>
      <el-tab-pane label="采购入库单">采购入库单</el-tab-pane>
    </el-tabs>
    <Late :rowData="detail" :visible.sync="showLateAmount" @reload="setEdit(),$reload()" v-if="showLateAmount" />
  </sideDetail>
</template>
<script>
import VisibleMixin from '@/utils/visibleMixin';
import Late from './late';

export default {
  mixins: [VisibleMixin],
  components: {
    Late
  },
  props: {
    pageConfig: Object
  },
  data() {
    return {
      showApply: false,
      showLateAmount: false
    };
  },
  mounted() {},
  watch: {},
  methods: {
    async getDetail() {
      if (this.code) {
        let { data } = await this.$getApi(this.pageConfig.api.detail)({
          code: this.code
        });
        return data;
      } else if (this.rowData) {
        return this.rowData;
      }
    },
    async saveExtras({ attachList, note }) {
      this.loading = true;
      try {
        await this.$getApi(this.pageConfig.api.update)({
          id: this.detail.id,
          billCode: this.detail.billCode,
          attachList,
          note
        });
        this.setEdit();
      } catch (error) {}
      this.loading = false;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>