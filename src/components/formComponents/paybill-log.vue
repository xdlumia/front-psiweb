/*
 * @Author: 赵伦
 * @Date: 2019-10-28 15:57:28
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-22 09:30:57
 * @Description: 账单调整记录 已绑定 1
*/
<template>
  <form-card title="账单调整记录">
    <el-table :data="list" size="mini">
      <el-table-column label="账单调整单编号" min-width="80" prop="adjustCode" show-overflow-tooltip></el-table-column>
      <el-table-column label="调整前金额" min-width="80" prop="adjustBeforAmount" show-overflow-tooltip></el-table-column>
      <el-table-column label="调整金额" min-width="80" prop="adjustAmount" show-overflow-tooltip></el-table-column>
      <el-table-column label="调整后金额" min-width="80" prop="adjustAfterAmount" show-overflow-tooltip></el-table-column>
      <el-table-column label="调整时间" min-width="80" prop="adjustDate" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{row.adjustDate|timeToStr('YYYY-MM-DD HH:mm:ss')}}</span>
        </template>
      </el-table-column>
    </el-table>
  </form-card>
</template>
<script>
export default {
  props: {
    billId: [Number, String]
  },
  data() {
    return {
      list: []
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
      let { data } = await this.$api.seePsiFinanceService.fbilladjustList({
        page: 1,
        limit: 999,
        fbillId: this.billId
      });
      this.list = data;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>