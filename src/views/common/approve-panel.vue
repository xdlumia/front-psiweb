/*
 * @Author: 赵伦 
 * @Date: 2019-10-25 18:34:19 
 * @Last Modified by:   赵伦 
 * @Last Modified time: 2019-10-25 18:34:19 
 */
<template>
  <form-card title="审核信息">
    <div class="h20">
      <el-link :underline="false" @click="showHis=!showHis" class="fr" type="primary">{{showHis?'返回':'历史记录'}}</el-link>
    </div>
    <div class="pl20 pr20" v-if="!showHis">
      <ApproveCard />
    </div>
    <div class="pl20 pr20" v-else>
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