<template>
  <side-popup :visible="true">
    <SideStatusbar />
    <ApprovePanel />
  </side-popup>
</template>
<script>
import SideStatusbar from '@/views/common/side-statusbar';
import ApprovePanel from '@/views/common/approve-panel';

export default {
  components: {
    SideStatusbar,
    ApprovePanel
  }
};
</script>
<style lang="scss" scoped>
</style>