/*
 * @Author: 赵伦
 * @Date: 2019-10-28 15:57:28
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-21 18:34:45
 * @Description: 收支流水
*/
<template>
  <form-card title="收支流水">
    <div slot="title">
      <span>收支流水</span>
      <span class="fr">
        <el-link :underline="false" @click="showAdd=true,addIncoming()" class="mr10" type="primary">+新建</el-link>
        <el-link :underline="false" @click="showChooseIncoming=true" type="primary">匹配</el-link>
      </span>
    </div>
    <el-table :data="recList" size="mini" v-loading="loading">
      <el-table-column label="流水号" min-width="80" prop="fbillId" show-overflow-tooltip></el-table-column>
      <el-table-column label="对方名称" min-width="80" prop="oppositeAccount" show-overflow-tooltip></el-table-column>
      <el-table-column label="提交时间" min-width="80" prop="createTime" show-overflow-tooltip></el-table-column>
      <el-table-column label="收支状态" min-width="80" prop="incomeType" show-overflow-tooltip></el-table-column>
      <el-table-column label="流水金额" min-width="80" prop="incomeAmount" show-overflow-tooltip></el-table-column>
      <el-table-column label="该账单匹配金额" min-width="80" prop="matchAmount" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" min-width="80" prop="matchAmount" show-overflow-tooltip>
        <template slot-scope="{row}">
          <el-button @click="del(row)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Add :visible.sync="showAdd" code ref="addIncoming" v-if="showAdd" />
    <chooseIncoming :visible.sync="showChooseIncoming" @change="chooseIncoming" code ref="chooseIncoming" v-if="showChooseIncoming" />
  </form-card>
</template>
<script>
import Add from '@/views/finance/income/add';

export default {
  components: {
    Add
  },
  props: {
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
    }
  },
  data() {
    return {
      recList: [],
      loading: false,
      showAdd: false,
      showChooseIncoming: false
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
      try {
        await this.$refs.addIncoming.$refs.form.validate();
        await this.$getApi(this.addApi)(
          Object.assign(
            {
              fbiiCode: this.billCode
            },
            this.$refs.addIncoming.form
          )
        );
      } catch (error) {}
      this.loading = false;
    },
    async chooseIncoming(data) {
      this.loading = true;
      try {
        await this.$getApi(this.matchApi)({
          fbillId: this.billId,
          incomeRecordId: data.id,
          matchAmount: ''
        });
      } catch (error) {}
      this.loading = false;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>