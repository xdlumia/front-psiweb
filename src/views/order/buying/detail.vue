/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-26 13:20:23
 * @Description: 采购单详情
*/
<template>
  <side-popup :visible.sync="showPop">
    <SideStatusbar />
    <ApprovePanel />
    <CustomInfo />
    <CompanyInfo />
    <PayExpire />
    <ExtrasInfo />
  </side-popup>
</template>
<script>
import SideStatusbar from '@/views/common/side-statusbar';
import ApprovePanel from '@/views/common/approve-panel';
import CustomInfo from '@/views/common/custom-info'; 
import CompanyInfo from '@/views/common/company-info'; 
import PayExpire from '@/views/common/pay-expire'; 
import ExtrasInfo from '@/views/common/extras-info'; 

export default {
  components: {
    SideStatusbar,
    ApprovePanel,
    CustomInfo,
    CompanyInfo,
    PayExpire,
    ExtrasInfo
  },
  data(){
    return {
      showPop: true,
    }
  }
};
</script>
<style lang="scss" scoped>
</style>