/*
 * @Author: 赵伦
 * @Date: 2019-10-28 15:57:28
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-02 16:46:36
 * @Description: 收支流水 已绑定 1
*/
<template>
  <form-card title="收支流水">
    <div slot="title">
      <span>收支流水</span>
      <span class="fr">
        <el-link :underline="false" @click="showAdd=true,addIncoming()" class="mr10" type="primary" v-if="!hide.includes('addIncoming')">+新建</el-link>
        <el-link :underline="false" @click="showChooseIncoming=true" type="primary" v-if="!hide.includes('matchIncoming')">匹配</el-link>
      </span>
    </div>
    <el-table :data="recList" size="mini" v-loading="loading">
      <el-table-column label="流水号" min-width="80" prop="fbillId" show-overflow-tooltip></el-table-column>
      <el-table-column label="对方名称" min-width="80" prop="oppositeAccount" show-overflow-tooltip></el-table-column>
      <el-table-column label="提交时间" min-width="100" prop="createTime" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{row.createTime|timeToStr('YYYY-MM-DD HH:mm:ss')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="收支状态" min-width="80" prop="incomeType" show-overflow-tooltip></el-table-column>
      <el-table-column label="流水金额" min-width="80" prop="incomeAmount" show-overflow-tooltip></el-table-column>
      <el-table-column label="该账单匹配金额" min-width="80" prop="matchAmount" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" min-width="80" prop="matchAmount" show-overflow-tooltip>
        <template slot-scope="{row}">
          <el-button @click="del(row)" size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 收款0 付款1 -->
    <Add :incomeType="`${type}`" :visible.sync="showAdd" code ref="addIncoming" v-if="showAdd" />
    <chooseIncoming
      :params="{
        page: 1,
        limit: 15,
        matchState: '',
        incomeType: type
      }"
      :visible.sync="showChooseIncoming"
      @change="chooseIncoming"
      code
      ref="chooseIncoming"
      v-if="showChooseIncoming"
    />
    <payment-match
      :bill="{
        billAmount:billAmount,
        unmatch:unmatchData
      }"
      :visible.sync="showMatchDialog"
      @change="submitMatch"
      @reload="getRecList"
      v-if="showMatchDialog"
    />
  </form-card>
</template>
<script>
import Add from '@/views/finance/income/add';

export default {
  components: {
    Add
  },
  props: {
    hide: {
      type: Array,
      default: () => []
    },
    billId: [Number, String],
    billCode: [Number, String],
    api: {
      type: String,
      default: 'seePsiFinanceService.todaybillDelRoutedMatching'
    },
    addApi: {
      type: String,
      required: true
    },
    matchApi: {
      type: String,
      required: true
    },
    params: Object,
    billAmount: Number,
    type: [Number, String]
  },
  data() {
    return {
      recList: [],
      loading: false,
      showAdd: false,
      showChooseIncoming: false,
      showMatchDialog: false,
      unmatchData: 0,
      matchIncomingId: ''
    };
  },
  watch: {
    billId() {
      this.getRecList();
    }
  },
  mounted() {
    this.getRecList();
  },
  methods: {
    async getRecList() {
      if (!this.billId) return;
      let {
        data
      } = await this.$api.seePsiFinanceService.fincomerecordmatchQueryList(
        Object.assign(
          {
            fbillId: this.billId,
            page: 1,
            limit: 15
          },
          this.params
        )
      );
      this.recList = data;
    },
    async del(row) {
      await this.$confirm(`是否删除该流水？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        type: 'warning',
        center: true
      });
      this.loading = true;
      await this.$getApi(this.api)({
        id: row.id
      });
      this.loading = false;
    },
    addIncoming() {
      this.$nextTick(() => {
        this.$refs.addIncoming.saveHandle = () => this.saveIncoming();
      });
    },
    async saveIncoming() {
      this.loading = true;
      this.$refs.addIncoming.loading = true;
      try {
        await this.$refs.addIncoming.$refs.form.validate();
        await this.$getApi(this.addApi)({
          ...this.$refs.addIncoming.form,
          fbiiCode: this.billCode
        });
        this.$refs.addIncoming.setEdit();
        this.$refs.addIncoming.close();
      } catch (error) {}
      this.loading = false;
      this.$refs.addIncoming.loading = false;
    },
    async chooseIncoming(data) {
      this.unmatchData = data.unmatchAmount;
      this.showChooseIncoming = false;
      this.matchIncomingId = data.id;
      this.$nextTick(() => (this.showMatchDialog = true));
    },
    async submitMatch(e) {
      this.loading = true;
      try {
        await this.$getApi(this.matchApi)({
          fbillId: this.billId,
          incomeRecordId: this.matchIncomingId,
          matchAmount: e
        });
        this.showMatchDialog = false;
        this.getRecList();
      } catch (error) {
        console.error(error);
      }
      this.loading = false;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>