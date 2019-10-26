/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-26 13:21:24
 * @Description: 备注信息
*/
<template>
    <form-card title="备注信息">
        <el-row>
            <el-col :span="24">
                <div class="mt5">备注</div>
                <div class="d-text-gray mt10 mb10 d-elip">2019-9-25</div>
            </el-col>
            <el-col :span="24">
                <div class="mt5">
                    <span>上传文件: </span>
                    <span class="d-text-blue ml20">附件1.jpg</span>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="mt5">附件文件名称清单:</div>
                <div class="d-text-gray d-elip ml20">1.合同</div>
            </el-col>
        </el-row>
    </form-card>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
</style>