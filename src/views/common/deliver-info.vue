/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-26 13:10:56
 * @Description: 发货信息
*/
<template>
    <form-card title="发货信息">
        <el-row>
            <el-col :span="8">
                <div class="mt5 d-required">销售预计发货时间</div>
                <div class="d-text-gray mt10 mb10 d-elip">2019-9-25</div>
            </el-col>
            <el-col :span="8">
                <div class="mt5 d-required">客户联系人</div>
                <div class="d-text-gray mt10 mb10 d-elip">麻仁</div>
            </el-col>
            <el-col :span="8">
                <div class="mt5 d-required">客户联系电话</div>
                <div class="d-text-gray mt10 mb10 d-elip">18888888</div>
            </el-col>
            <el-col :span="8">
                <div class="mt5 d-required">客户收货地址</div>
                <div class="d-text-gray mt10 mb10 d-elip">北京崇文</div>
            </el-col>
            <el-col :span="8">
                <div class="mt5">销售要求发货时间</div>
                <div class="d-text-gray mt10 mb10 d-elip">2019-9-25</div>
            </el-col>
            <el-col :span="8">
                <div class="mt5">采购预计到货时间</div>
                <div class="d-text-gray mt10 mb10 d-elip">2019-9-25</div>
            </el-col>
        </el-row>
    </form-card>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
</style>