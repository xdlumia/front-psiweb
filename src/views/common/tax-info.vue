/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-26 13:12:46
 * @Description: 附加发票
*/
<template>
    <form-card title="附加发票">
        <el-row>
            <el-col :span="8">
                <div class="mt5">发票金额</div>
                <div class="d-text-gray mt10 mb10 d-elip">1000</div>
            </el-col>
            <el-col :span="8">
                <div class="mt5">税率</div>
                <div class="d-text-gray mt10 mb10 d-elip">13%</div>
            </el-col>
            <el-col :span="8">
                <div class="mt5">发票成本</div>
                <div class="d-text-gray mt10 mb10 d-elip">1130</div>
            </el-col>
        </el-row>
    </form-card>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
</style>