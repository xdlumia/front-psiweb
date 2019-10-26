/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-26 13:10:11
 * @Description: 报价单有效期
*/
<template>
    <form-card title="报价单有效期">
        <el-row>
            <el-col :span="8">
                <div class="mt5">报价单有效期</div>
                <div class="d-text-gray mt10 mb10 d-elip">
                    <el-input placeholder="请输入天数">
                        <template slot="append">天</template>
                    </el-input>
                </div>
            </el-col>
        </el-row>
    </form-card>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
</style>