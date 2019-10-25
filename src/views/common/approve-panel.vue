<template>
  <form-card title="审核信息">
    <div></div>
    <div class="pl20 pr20">
      <ApproveCard />
    </div>
  </form-card>
</template>
<script>
import ApproveCard from './approve-card';

export default {
  components: {
    ApproveCard
  }
};
</script>
<style lang="scss" scoped>
</style>