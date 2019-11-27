/*
 * @Author: 赵伦
 * @Date: 2019-10-28 15:57:28
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-22 09:31:29
 * @Description: 开票/收票 记录 已绑定 1
*/
<template>
  <form-card :title="`${type==0?'收票':'开票'}记录`">
    <el-table :data="list" size="mini">
      <el-table-column label="购买方名称" min-width="80" prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column label="发票号码" min-width="80" prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column label="开票金额" min-width="80" prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column label="开票时间" min-width="80" prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column label="状态" min-width="80" prop="name" show-overflow-tooltip></el-table-column>
    </el-table>
  </form-card>
</template>
<script>
export default {
  props: {
    type: [Number, String],
    busCode: String,
  },
  data() {
    return {
      list: []
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
    }
  }
};
</script>
<style lang="scss" scoped>
</style>