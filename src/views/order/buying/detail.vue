/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-26 18:17:32
 * @Description: 采购单详情
*/
<template>
    <side-popup :visible.sync="showPop">
        <el-form>
            <SideStatusbar />
            <CustomerInfo />
            <ApprovePanel />
            <CustomInfo />
            <CompanyInfo />
            <PayExpire />
            <ExtrasInfo />
        </el-form>
    </side-popup>
</template>
<script>
import SideStatusbar from '@/components/form-components/side-statusbar';
import ApprovePanel from '@/components/form-components/approve-panel';
import CustomInfo from '@/components/form-components/custom-info';
import CustomerInfo from '@/components/form-components/customer-info';
import CompanyInfo from '@/components/form-components/company-info';
import PayExpire from '@/components/form-components/pay-expire';
import ExtrasInfo from '@/components/form-components/extras-info';

export default {
    components: {
        SideStatusbar,
        ApprovePanel,
        CustomInfo,
        CompanyInfo,
        PayExpire,
        ExtrasInfo,
        CustomerInfo
    },
    data() {
        return {
            showPop: true
        };
    }
};
</script>
<style lang="scss" scoped>
</style>