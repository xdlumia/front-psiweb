/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-26 18:14:30
 * @Description: 报价单有效期
*/
<template>
    <form-card title="报价单有效期">
        <el-row>
            <el-col :span="8">
                <el-form-item label="报价单有效期" size="mini">
                    <el-input placeholder="请输入天数">
                        <template slot="append">天</template>
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </form-card>
</template>
<script>
export default {
    props: {
        form: {
            type: Object,
            default: () => ({})
        }
    }
};
</script>
<style lang="scss" scoped>
</style>