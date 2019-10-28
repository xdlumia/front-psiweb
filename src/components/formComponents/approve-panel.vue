/*
 * @Author: 赵伦
 * @Date: 2019-10-28 10:05:00
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-28 11:06:55
 * @Description: 审核信息
*/
<template>
  <form-card title="审核信息">
    <div class="h20">
      <el-link :underline="false" @click="showHis=!showHis" class="fr" type="primary">{{showHis?'返回':'历史记录'}}</el-link>
    </div>
    <div class v-if="!showHis">
      <ApproveCard />
    </div>
    <div class v-else>
      <ApproveCard />
      <ApproveCard />
    </div>
  </form-card>
</template>
<script>
import ApproveCard from './approve-card';

export default {
  components: {
    ApproveCard
  },
  data() {
    return {
      showHis: false
    };
  }
};
</script>
<style lang="scss" scoped>
</style>