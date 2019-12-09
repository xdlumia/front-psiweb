/*
 * @Author: 赵伦
 * @Date: 2019-10-28 15:57:28
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-09 15:53:52
 * @Description: 账单调整记录 已绑定 1
*/
<template>
  <form-card title="账单调整记录">
    <el-table :data="list" size="mini">
      <el-table-column label="账单调整单编号" min-width="80" prop="adjustCode" show-overflow-tooltip></el-table-column>
      <el-table-column label="调整前金额" min-width="80" prop="adjustBeforAmount" show-overflow-tooltip></el-table-column>
      <el-table-column label="调整金额" min-width="80" prop="adjustAmount" show-overflow-tooltip></el-table-column>
      <el-table-column label="调整后金额" min-width="80" prop="adjustAfterAmount" show-overflow-tooltip></el-table-column>
      <el-table-column label="状态" min-width="80" prop="state" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{stateText[row.state]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="调整时间" min-width="80" prop="adjustDate" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{(row.adjustDate||row.createTime)|timeToStr('YYYY-MM-DD HH:mm:ss')}}</span>
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
      list: [],
      stateText: {
        '0': '审核中',
        '1': '已通过',
        '2': '已驳回',
        '-1': '新建'
      }
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