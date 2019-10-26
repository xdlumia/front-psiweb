/*
 * @Author: 赵伦 
 * @Date: 2019-10-25 18:31:35 
 * @Last Modified by: 赵伦
 * @Last Modified time: 2019-10-25 18:39:59
 */
<template>
  <side-popup :visible="true">
    <SideStatusbar />
    <ApprovePanel />
    <CustomInfo />
  </side-popup>
</template>
<script>
import SideStatusbar from '@/views/common/side-statusbar';
import ApprovePanel from '@/views/common/approve-panel';
import CustomInfo from '@/views/common/custom-info';

export default {
  components: {
    SideStatusbar,
    ApprovePanel,
    CustomInfo
  }
};
</script>
<style lang="scss" scoped>
</style>