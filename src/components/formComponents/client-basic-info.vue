/*
 * @Author: web.王晓冬
 * @Date: 2019-10-28 17:05:01
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-01 15:33:41
 * @Description: 客户基本数据
*/  
<template>
  <form-card title="基本数据">
    <el-row>
      <el-col :span="6">
        <b>应收欠款</b>
        <p class="d-elip d-text-gray mt20">99999</p>
      </el-col>
      <el-col :span="6">
        <b>预收款</b>
        <p class="d-elip d-text-gray mt20">99999</p>
      </el-col>
      <el-col :span="6">
        <b>平均回款周期</b>
        <p class="d-elip d-text-gray mt20">99999</p>
      </el-col>
      <el-col :span="6">
        <b>逾期次数</b>
        <p class="d-elip d-text-gray mt20">99999</p>
      </el-col>

    </el-row>
  </form-card>
</template>
<script>
export default {
  components: {},
  data() {
    return {

    };
  },
  methods: {

  }
};
</script>
<style lang="scss" scoped>
</style>
