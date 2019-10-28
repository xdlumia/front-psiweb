/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-26 18:10:53
 * @Description: 附加发票
*/
<template>
    <form-card title="附加发票">
        <el-row>
            <el-col :span="8" class="pl5 pr5 pb5">
                <el-form-item label="发票金额" size="mini">
                    <el-input disabled placeholder="请输入发票金额" type="number" />
                </el-form-item>
            </el-col>
            <el-col :span="8" class="pl5 pr5 pb5">
                <el-form-item label="税率" prop size="mini">
                    <el-select placeholder="请选择" v-model="form.taxrate">
                        <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in options"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8" class="pl5 pr5 pb5">
                <el-form-item label="税后金额" size="mini">
                    <el-input disabled placeholder="请输入税后金额" type="number" />
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
    },
    data() {
        return {
            options: []
        };
    }
};
</script>
<style lang="scss" scoped>
</style>